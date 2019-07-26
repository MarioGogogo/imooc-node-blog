const http = require('http')
const querystring = require('querystring')

/**
 * get请求
 */
const server1 = http.createServer((req,res)=>{
    console.log(req.method);
    const url = req.url;
    console.log(url);
    res.setHeader("Content-type","application/json")
    req.query = querystring.parse(url.split('?')[1])
    console.log(req.query);
    res.end(
      `hello word,${JSON.stringify(req.query)}`
    )
})


/**
 * post请求
 */
const server = http.createServer((req,res)=>{
     if(req.method === "POST"){
       console.log('content-type',req.headers['content-type']);
       let postData = ""
       //小水管一点点的流
       req.on('data',chunk =>{
         postData += chunk.toString()
       }
       )
       req.on('end',()=>{
         console.log(postData);
         req.end('hello word 数据接受完成')
       })

     }
})







server.listen(8080,()=>{
   console.log('开启8080');
});