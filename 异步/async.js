const fs = require('fs')
const path = require('path')

function getFileContent(fileName){
    return new Promise((resolve, reject) => {
      const fullFilname = path.resolve(__dirname,"./",fileName)
      console.log('fullFilname',fullFilname);
          fs.readFile(fullFilname,(err,data)=>{
              if(err){
                reject(err)
                return
              }
              if(data){
                 resolve(data)
                 return
              }
          })

          
    });
}


async function readFileData(){
    const aData = await getFileContent('a.json')
    console.log('aData',aData.toString());
    const bData = await getFileContent('b.js')
    console.log('bData',bData.toString());
    console.log(typeof bData.toString());
}

readFileData()

/*
async await 要点：
1.await 后面可以带 promise对象，获取resolve的值
2.await 必须和 async 一起用
3.async函数执行返回的也是一个promise对象
4.try-catch 截取promise的 reject对象
*/
