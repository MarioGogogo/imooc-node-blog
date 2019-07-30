const { getList, getDetail, createNewBlog,updateBlog,delBlog } = require("../controller/blog");
const { SuccessModal, ErrorModal } = require("../modal/resModal");

/**
 * 统一一个登录验证的函数
 */
const loginCheck = (req)=>{
    if(!req.session.username){
      return Promise.resolve(
        new ErrorModal('尚未登录')
      )
    }
   
}








const handleBlogRouter = (req, res) => {
  const method = req.method;
  //获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    // const listData = getList(author,keyword)
    console.log("key", keyword);

    const reuslt = getList(author, keyword);

    const promise = reuslt.then(listData => {
      return new SuccessModal(listData);
    });

    return promise;
  }

  //获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    const id = req.query.id || "";
    const result = getDetail(id);

    const promise = result.then(detailData => {
      //返回的是数组取第0个下标
      return new SuccessModal(detailData[0]);
    });

    return promise;
  }

  //新建一篇博客
  if (method === "POST" && req.path === "/api/blog/new") {
    const logloginCheckPromise = loginCheck(req)
    if(logloginCheckPromise){
      //返回登录界面
       return logloginCheckPromise
    }
    //判断是否登录
    const result = createNewBlog(req.body);
    
    const promise = result.then(createResult => {
      console.log('createResult',createResult);
   
      return new SuccessModal({id:createResult.insertId});
    });

    return promise


  }
  //更新一篇博客
  if (method === "POST" && req.path === "/api/blog/update") {
    const logloginCheckPromise = loginCheck(req)
    if(logloginCheckPromise){
      //返回登录界面
       return loginCheck
    }
    const result = updateBlog(req.body);
    
    const promise = result.then(updateResult => {
      console.log('updateResult',updateResult);
      return new SuccessModal(updateResult.changedRows === 1 ? "更新成功" :"更新失败");
    });
    return promise
  }

   //删除一篇博客
   if (method === "POST" && req.path === "/api/blog/delete") {
    const logloginCheckPromise = loginCheck(req)
    if(logloginCheckPromise){
      //返回登录界面
       return logloginCheckPromise
    }

    const result = delBlog(req.body);
    
    const promise = result.then(deleteResult => {
      console.log('deleteResult',deleteResult);
      return new SuccessModal(deleteResult.affectedRows > 0 ? "删除成功" :"删除失败");
    });
    return promise
  }
};

module.exports = handleBlogRouter;
