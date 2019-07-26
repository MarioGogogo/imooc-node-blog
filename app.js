const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
// const handleUserRouter = require('./src/router/user')

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

    if (req.headers["Content-type"] !== "application/json") {
      resolve({});
      return;
    }

    let postData = "";
    //小水管一点点的流
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      console.log(postData);
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
  req.query = querystring.parse(url.split("?")[0]);

  //异步处理
  getPostData(req).then(postData => {
    req.body = postData;
    console.log('req.body',req.body);
    const blogDataPromise = handleBlogRouter(req, res);
    console.log('blogDataPromise',blogDataPromise);
  
    if (blogDataPromise) {
      blogDataPromise.then(blogData => {
        console.log('blogData',blogData);
        res.end(JSON.stringify(blogData));
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
