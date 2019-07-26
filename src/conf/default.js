const env = process.env.NODE_ENV   //环境变量
let config={}
//开发环境
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
	};
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
	};

}





module.exports = config;