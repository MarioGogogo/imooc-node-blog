const { exec } = require("../lib/mysql")

const loginCheck = (username,password) => {

      const sql = `select username from users where username='${username}' and password = '${password}'; `

     return exec(sql)
      
}


module.exports ={
   loginCheck
}