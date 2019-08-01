app.use("use/:username", querystring, cookie, session, function(req, res) {});

var querystring = function(req, res, next) {
  req.querystring = url.parse(req, url, true).query;
  next();
};

var cookie = function(req, res, next) {
  req.cookie = cookie;
  next();
};

//将路由抽离 具体业务逻辑分析 改进use方法
app.use = function(path) {
  var handle = {
    //第一个参数是路径
    path: pathRegexp(path),
    //其他的都是处理单元
    stack: Array.prototype.slice(arguments, 1)
  };

  routes.all.push(handle);

  // use中间件存入stack中

  var match = function(pathname, routes) {
    for (let i = 0; i < routes.length; i++) {
      let route = routes[i];
      let reg = route.path.regexp;
      let matched = reg.exec(pathname);
      //路由匹配成功
      if (matched) {
        //执行其他中间件 递归执行数组中的中间件
        handle(req, res, route.stack);
        return true;
      }
    }
    return false;
  };

  //核心思想
  var handle = function(req, res, next) {
    var next = function() {
      //从stack中取出中间件执行 先取出第一个
      var middleware = stack.shift();
      //如果存在
      if (middleware) {
        middleware(req, res, next);
      }
    };
    //启动执行
    next();
  };
};

// 这里还有一个问题是否每个中间件在每个路由中都要执行

app.use("use/:username", querystring, cookie, session, function(req, res) {});
app.use("api", querystring, cookie, session, function(req, res) {});
app.use("blog", querystring, cookie, session, function(req, res) {});
// ...更多路由

// 是否可以这样设计
app.use(querystring);
app.use(cookie);
app.use(session);
app.use("/use/:username", getUser);

//继续优化

app.use = function(path) {
  var handle;
  //判断是否是字符串
  if (typeof path === "string") {
    handle = {
      //第一个参数是路径
      path: pathRegexp(path),
      //其他的都是处理单元
      stack: Array.prototype.slice(arguments, 1)
    };
  } else {
    handle = {
      //第一个参数是路径 类似===> app.use('/',cookie)
      path: pathRegexp("/"),
      //其他的都是处理单元
      stack: Array.prototype.slice(arguments, 0)
    };
  }

  routes.all.push(handle);
};

//优化匹配规则 ===>

var match = function(req, res, next) {
  var stacks = [];
  for (let i = 0; i < routes.length; i++) {
    let route = routes[i];
    let reg = route.path.regexp;
    let matched = reg.exec(pathname);
    if(matched){
       stacks = stacks.concat(route.stack)
    }
  }

  return stacks

};


//持续改进分发
function (req,res){
  var pathname = url.parse(req.url).pathname
  var method = req.method.toLowerCase()
  var stacks = match(pathname,routes.all)
  if(routes.hasOwnPerperty(method)){
    stacks.concat(match(pathname,routes[method]))
  }

  if(stacks.length){
     handle(req,res,stacks)
  }else{
    //处理错误请求      
    handle404(req,res)
  }
}
