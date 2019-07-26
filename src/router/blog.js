const { getList, getDetail, createNewBlog } = require("../controller/blog");
const { SuccessModal, ErrorModal } = require("../modal/resModal");

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
    const createResult = createNewBlog(req.body);
    return new SuccessModal(createResult);
  }
  //更新一篇博客
  if (method === "POST" && req.path === "/api/blog/update") {
    return {
      msg: "更新博客api"
    };
  }
};

module.exports = handleBlogRouter;
