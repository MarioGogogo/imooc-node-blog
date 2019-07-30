const fs = require("fs");
const path = require("path");


const fileName1 = path.resolve(__dirname, "./", '10M.txt');
const fileName2 = path.resolve(__dirname, "./", 'b.txt');

let readStrem = fs.createReadStream(fileName1)

let writeStrem = fs.createWriteStream(fileName2)

// 大水桶资源 流向 小水桶资源
readStrem.pipe(writeStrem)

//如何知道文件是一点一点流过去的
readStrem.on('data',thunk=>{
    console.log('文件流：',thunk.toString());
})

//资源流完了之后的回调
readStrem.on('end',()=>{
   console.log('拷贝完成');
   
})