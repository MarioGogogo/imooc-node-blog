const { exec } = require("../lib/mysql");
const loginCheck = (username,password)=>{
      const sql = `select username,realname from users where username='${username}' and passwoed = '${password}'; `
      exec(sql)
      return true
}


module.exports ={
   loginCheck
}