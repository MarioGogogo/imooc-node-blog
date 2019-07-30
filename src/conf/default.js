const env = process.env.NODE_ENV   //环境变量
let config={}
let redis_config={}


//开发环境  本地
if(env === "dev"){
	 config = {
		// 启动端口
		port: 3000,
		// 数据库配置
		database: {
			DATABASE: 'node_blog',
			USERNAME: 'root',
			PASSWORD: '123456',
			PORT: '3306',
			HOST: 'localhost',
		},
	}
	redis_config={
		HOST: '127.0.0.1',
		PORT: '6379',
	}
}

//线上环境
if(env === "production"){
	 config = {
		// 启动端口
		port: 3000,
		// 数据库配置
		database: {
			DATABASE: 'node_blog',
			USERNAME: 'root',
			PASSWORD: '123456',
			PORT: '3306',
			HOST: 'localhost',
		},
	}
	redis_config={
		HOST: 'localhost',
		PORT: '6379',
	}

}





module.exports = {config,redis_config};