/**
 * @Author: lovewcc
 * @Date:   2019-07-31T16:49:39+08:00
 * @Last modified by:   lovewcc
 * @Last modified time: 2019-08-01T18:07:32+08:00
 */

const http = require("http");
const slice = Array.prototype.slice;

// app.use('/api',(req,res,next)=>{})
// app.use((req,res,next)=>{})

class LikeExpress {
  constructor() {
    //存放中间件的数组
    this.routes = {
      all: [],
      get: [],
      post: []
    };
  }

  /*
  path 路径
  */
  register(path) {
    let info = {};
    if (typeof path === "string") {
      info.path = path;
      info.stack = slice(argument, 1); //数组
    } else {
      info.path = "/";
      info.stack = slice(argument, 0); //数组
    }
    return info;
  }

  use() {
    const info = this.register.apply(this, arguments);

    this.routes.all.push(info);
  }

  get() {
    const info = this.register.apply(this, arguments);

    this.routes.get.push(info);
  }

  post() {
    const info = this.register.apply(this, arguments);

    this.routes.post.push(info);
  }

  match(method, url) {
    let stack = [];

    if (url === "/favicon.ico") {
      return stack;
    }

    // 获取routes
    let curRouters = [];

    curRouters = curRouters.concat(this.routes.all);
    curRouters = curRouters.concat(this.routes[method]);

    curRouters.forEach(item => {
      if (url.indexOf(item.path) === 0) {
        // url === "/api/user" && item.path === "/"
        stack = stack.concat(item.stack);
      }
    });

    return stack;
  }

  //核心
  handle(req, res, resultList) {
    const next = () => {
      //每次执行获取第一个中间件
      const middleware = resultList.shift();
      if (middleware) {
        //执行中间件
        middleware(req, res, next);
      }
    };

    //立即执行
    next();
  }

  // json函数定义
  callback() {
    return (req, res) => {
      res.json = data => {
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify(data));
      };
      const url = req.url;
      const method = req.method.toLowerCase();

      //区分匹配的路径
      const resultList = this.match(method, url);
      //核心
      this.handle(req, res, resultList);
    };
  }
  

  //监听
  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
}

module.exports = () => {
  return new LikeExpress();
};
