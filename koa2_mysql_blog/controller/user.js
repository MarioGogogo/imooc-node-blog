const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = async (username, password) => {
    //escape 是防止sql注入 ==> sql语句中不要加单引号了
    username = escape(username)
     
    // 生成加密密码再防止sql攻击
    password = genPassword(password)
    password = escape(password)
    console.log(username, password);
    const sql = `
        select username from users where username=${username} and password=${password}
    `
    console.log('sql',sql);
    const rows = await exec(sql)
    console.log('rows',rows);
    
    return rows[0] || {}
}

module.exports = {
    login
}