const {getList,getDetail,createNewBlog} = require('../controller/blog')
const {SuccessModal,ErrorModal}   =  require('../modal/resModal')

const handleBlogRouter = (req, res) => {
  const method = req.method;
  //获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || ''
    const keyword = req.query.keyword  || ''
    // const listData = getList(author,keyword)
    const reuslt = getList(author,keyword)

    const promise =  reuslt.then(listData=>{
      console.log('listData',listData);
      return new SuccessModal(listData)
    })
    console.log('primise',promise);
    
    return promise
    
  }

  //获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    const id = req.query.id || ''
    const DetailData = getDetail(id)
    return new SuccessModal(DetailData)
  }

  //新建一篇博客
  if (method === "POST" && req.path === "/api/blog/new") {

    const createResult = createNewBlog(req.body)
    return new SuccessModal(createResult)
  }
  //更新一篇博客
  if (method === "POST" && req.path === "/api/blog/update") {
    return {
      msg: "更新博客api"
    };
  }
};


module.exports = handleBlogRouter
