const {exec} = require('../lib/mysql')

const getList = (author,keyword) =>{
     
    console.log('数据库查询开始');
    
    let sql = `select * from blogs where 1=1 `
    if(author){
        sql += `and author='${author}' `
    }
    if(keyword){
        sql += `and title like '%${keyword}%' `
    }

    sql += `order by createtime desc;`
    //返回promise
    return exec(sql)

    //返回假数据
    //TODO: 数据库存储
//     return [{
//         id:1,
//         title:'标题A',
//         content:'内容A',
//         createTime:1564065988079,
//         author:'周杰伦'
//     },
//     {
//       id:2,
//       title:'标题B',
//       content:'内容B',
//       createTime:1564065988089,
//       author:'习近平'
//   }]
}

const getDetail = (id) =>{
    //返回假数据
    return {
      id:1,
      title:'标题C',
      content:'内容C',
      createTime:1564065988099,
      author:'周杰伦'
  }
}

const createNewBlog = (data={})=>{
    return {
        msg:"创建成功"
    }
}




 
module.exports = {
    getList,
    getDetail,
    createNewBlog
}