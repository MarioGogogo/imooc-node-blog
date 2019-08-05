const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = async (username, password) => {
    username = escape(username)
   
    // 生成加密密码
    password = genPassword(password)
    password = escape(password)
    console.log(username, password);
    const sql = `
        select username from users where username=${username} and password=${password}
    `
    const rows = await exec(sql)
    console.log('rows',rows);
    
    return rows[0] || {}
}

module.exports = {
    login
}