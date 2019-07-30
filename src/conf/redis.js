const redis = require("redis");
const { redis_config } = require("./default");

//创建客户端
const redisClient = redis.createClient(redis_config.PORT, redis_config.HOST);
redisClient.on("error", err => {
  console.error(err);
});



// key val必须转化是字符串
function set(key, val) {
  if (typeof key === "object") {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val, redis.print);
}




function set(key, val) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get("myname", (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if(val == null){
        resolve(null)
        return
      }
      try {
        //字符串转对象
        resolve(JSON.parse(val))
      } catch (error) {
        //如果不是json对象就返回原始值
        reject(val);
      }
    
    });
    return promise;
  });
}



module.exports = { set, get };
