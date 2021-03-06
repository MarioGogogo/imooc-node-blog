const {loginCheck} = require('../controller/user')

const {SuccessModal,ErrorModal}   =  require('../modal/resModal')

const  handleUserRouter = (req,res)=>{
    const method =req.method

    if (method === "POST" && req.path === "/api/user/login") {
       const {username,password} = req.body
       const result = loginCheck(username,password)

        const promise = result.then(loginData => {
          
          if(loginData.length > 0 && loginData[0].username ){
            return new SuccessModal("登录成功");
          }else{
            return new ErrorModal("登录失败");
          }
        });

        return promise
    }
}

module.exports = handleUserRouter