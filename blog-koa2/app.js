const Koa = require('koa')
// Koa的实例
const app = new Koa()
//视图插件
const views = require('koa-views')
//数据json插件
const json = require('koa-json')
//错误集中处理
const onerror = require('koa-onerror')
//get post 数据
const bodyparser = require('koa-bodyparser')
//打印post get信息
const logger = require('koa-logger')
// session
const session = require('koa-generic-session')
//redis
const redisStore = require('koa-redis')
//默认自带路径及写入插件
const path = require('path')
const fs = require('fs')
//日志
const morgan = require('koa-morgan')

const index = require('./routes/index')
const users = require('./routes/users')
const blog = require('./routes/blog')
const user = require('./routes/user')

// redis服务器地址
const { REDIS_CONF } = require('./conf/db')

// 错误检测
onerror(app)

// middlewares 中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
//字符串格式转json格式
app.use(json())
//日志
app.use(logger())
//网页路径
app.use(require('koa-static')(__dirname + '/public'))
//网页模板格式
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger  当前请求的耗时
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`) 
})

//处理日志信息
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发环境 / 测试环境
  app.use(morgan('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(morgan('combined', {
    stream: writeStream
  }));
}

// session 配置
app.keys = ['WJiol#23123_']
app.use(session({
  // 配置 cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  // 配置 redis
  store: redisStore({
    // all: '127.0.0.1:6379'   // 写死本地的 redis
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
