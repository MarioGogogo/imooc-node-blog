const http = require('http')
const serverHandle = require('./app')
const PORT = 8080

const server = http.createServer(serverHandle)

server.listen(PORT,()=>{
    console.log('链接上了'+PORT);
})