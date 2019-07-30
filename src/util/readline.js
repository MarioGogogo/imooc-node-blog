const fs = require("fs");
const path = require("path");
const readline = require('readline')

//获取文件名
const fileName = path.join(__dirname,"../","log","access.log")

console.log('fileName',fileName);
//创建 readStream
const readStream = fs.createReadStream(fileName)


const rl = readline.createInterface({
  input:readStream
})

let PostmanRuntime = 0
let sum = 0

//读取

rl.on('line',(lineData)=>{
   if(!lineData) return
    sum++;
    const arr = lineData.split('--')
    if(arr[2] && arr[2].indexOf('PostmanRuntime') > 0){
      PostmanRuntime++
    }
})

//监听完成
rl.on('close',()=>{
   console.log('post',Math.ceil((PostmanRuntime/sum)*100)+"%");
})