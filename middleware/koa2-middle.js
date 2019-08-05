const http = require("http");

//组合中间件 --> 通过传入中间件的列表 递归每一个执行中间件实现next的机制
//返回全部promise保证返回的统一
function compose(middlewareList) {
  return function(ctx) {
    function dispatch(i) {
      const fn = middlewareList[i];
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
      } catch (error) {
        return Promise.reject(err);
      }
    }
    //  先从第一个中间件开始，返回不管前面是否加asnyc 都要promise返回
    return dispatch(0);
  };
}

class LikeKoa2 {
  constructor() {
    this.middlewareList = [];
  }

  use(fn) {
    this.middlewareList.push(fn);
    return this; //链式调用
  }

  createContent(req,res){
     const ctx={
       req,res
     }

     return ctx
  }

  handleRequset(ctx,fn){
      // 让每一个中间件传入ctx
      return  fn(ctx)
  }

  callback() {
    const fn = compose(this.middlewareList)

    return (req, res) => {
      const ctx = this.createContent(req,res)
      // 返回promise
      return this.handleRequset(ctx,fn)
    };
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
}

module.exports = LikeKoa2;
