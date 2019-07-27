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

//创建博客
const createNewBlog = (data={}) => {
 
  const title = data.title
  const content = data.content
  const author = data.author
  const createtime = Date.now()

  const sql = `insert into blogs (title,content,createtime,author) values ('${title}','${content}','${createtime}','${author}');`
  
  //返回promise
  return exec(sql)

};

//更新博客
const updateBlog = (data) => {
  const id = data.id
  const title = data.blogData.title
  const content = data.blogData.content
  const author = data.blogData.author
  const createtime = Date.now()

  const sql = `update blogs set title = '${title}',content ='${content}', createtime ='${createtime}', author ='${author}' where id='${id}';`
  
  //返回promise
  return exec(sql)

};

//删除博客
const delBlog = (data) => {
  const id = data.id
  const author = data.author

  const sql = `delete from blogs  where id='${id}' and author='${author}';`
  
  //返回promise
  return exec(sql)

};


module.exports = {
  getList,
  getDetail,
  createNewBlog,
  updateBlog,
  delBlog
};
