const fs = require("fs");
const path = require("path");

//生成 writeStrem
function createStrem(fileName){
   const fullFileName = path.resolve(__dirname,"./",fileName)
   const opt = {
    flag:"a"   //追加写入 覆盖用'w'
  }
   const writeStrem = fs.createWriteStream(fullFileName,opt)
    
   return writeStrem
}

const accessWriteStream = createStrem('access.log')

const eventWriteStream = createStrem('event.log')

const errorWriteStream = createStrem('error.log')


/**
 * 写日志
 * @param {要写文件} writeStrem 
 * @param {要提交的日志内容} log 
 */
function writeLog(writeStrem,log){
     writeStrem.write(log+"\n")
}


function access(log){
  writeLog(accessWriteStream,log)
}


module.exports = {
   access
}


