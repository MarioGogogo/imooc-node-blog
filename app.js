const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require('./src/router/user')

const SESSION_DATA= {}


/**
 * 处理异步请求 post Data
 * @param {参数} req
 */
const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    const method = req.method;
    if (method !== "POST") {
      resolve({});
      return;
    }

    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }

    let postData = "";
    //小水管一点点的流
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      
      if (!postData) {
        resolve({});
      }
      resolve(JSON.parse(postData));
      return;
    });
  });

  return promise;
};

const serverHandle = (req, res) => {
  //设置返回格式
  res.setHeader("Content-type", "application/json");

  const url = req.url;
  req.path = url.split("?")[0];

  //如果get解析query
  req.query = querystring.parse(url.split("?")[1]);

  //解析cookie
  const cookiestr = req.headers.cookie || ""; //k1=v1,k2=v2
  cookiestr.split(";").map(item => {
    if (!item) return;
    const arr = item.split("=");
    const key = arr[0];
    const val = arr[1];
    req.cookie[key] = val;
  });
  console.log("cookie", req.cookie);


  //解析session
  const userId = req.cookie.userId
  if(userId){
    if(!SESSION_DATA[userId]){
      SESSION_DATA[userId] = {}
    }
  }else{
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]

 

  //异步处理
  getPostData(req).then(postData => {
    req.body = postData;
    console.log('postData',postData);

    const blogDataPromise = handleBlogRouter(req, res);

    if (blogDataPromise) {
      blogDataPromise.then(blogData => {
        //设置session
        res.setHeader('set-Cookie','cookie-123')
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    const userDataPromise = handleUserRouter(req, res);

    if (userDataPromise) {
      userDataPromise.then(userData => {
        //设置session
        res.setHeader('set-Cookie','cookie-123')
        res.end(JSON.stringify(userData));
      });
      return;
    }
    //处理404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  });
};

module.exports = serverHandle;

// const userData = handleBlogRouter(req,res)
// if(userData){
//     res.end(
//         JSON.stringify(userData)
//     )
//     return
// }

// const resData = {
//     name:'爽',
//     site:'imooc',
//     env:'process.env.NODE_ENV'
// }
// res.end(JSON.stringify(resData))
