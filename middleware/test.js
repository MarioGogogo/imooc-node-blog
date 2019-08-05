function compose(middlewareList) {
  return function(ctx) {
    function dispatch(i) {
      const fn = middlewareList[i];
      try {
        return fn(ctx, dispatch.bind(null, i + 1));
      } catch (error) {
        return Promise.reject(err);
      }
    }
    //  先从第一个中间件开始，返回不管前面是否加asnyc 都要promise返回
    return dispatch(0);
  };
}

const middlewareList=[string,arr,list]
const ctx = "我是ctx"
const fn = compose(middlewareList)

fn(ctx)

function string(){
   console.log('string');
   
}

function arr(){
   console.log('arr');
   
}


function list(){
   console.log('list');
   
}