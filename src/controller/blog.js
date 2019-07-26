const { exec } = require("../lib/mysql");

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '${keyword}' `;
  }

  sql += `order by createtime desc;`;
  //返回promise

  return exec(sql);
};

const getDetail = id => {
  const sql = `select * from blogs where id '${id}'`;

  //返回promise
  return exec(sql);
  //     //返回假数据
  //     return {
  //       id:1,
  //       title:'标题C',
  //       content:'内容C',
  //       createTime:1564065988099,
  //       author:'周杰伦'
  //   }
};

const createNewBlog = (data = {}) => {
  return {
    msg: "创建成功"
  };
};

module.exports = {
  getList,
  getDetail,
  createNewBlog
};
