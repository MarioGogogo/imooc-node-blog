const fs = require("fs");
const path = require("path");

//路径
const fullFilname = path.resolve(__dirname, "./", 'a.txt');
console.log("fullFilname", fullFilname);

//如果日志文件很大1G 用data读取很大问题 I/O 太慢
fs.readFile(fullFilname, (err, data) => {
    return data.toString()
});


//写入文件  如果写入3G 4G 的大内容  content就会阻塞  进程的内容吃不消
const content = `这是写入的内容: ${Date.now()}\n`

const opt = {
  flag:"a"   //追加写入 覆盖用'w'
}

fs.writeFile(fullFilname,content,opt,(err)=>{
   if(err){
      console.error(err);
   }
})


//判断内容是否存在

fs.exists(fullFilname,(exist)=>{
    console.log('文件是否存在',exist);
})
