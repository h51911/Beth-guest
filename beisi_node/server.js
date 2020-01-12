//主入口

const express = require("express");

//文件模块：直接require引入就能用

const { PORT } = require("./beisi/config.json");


//开启服务器
const app = express(); //返回对象app
// let allRouter = require("./router/index"); //这里可以写index。也可以不写，因为index是默认的。导入模块
let allRouter = require("./beisi/router/index"); //这里可以写index。也可以不写，因为index是默认的。导入模块


//开启静态资源服务器
app.use(express.static("./"));

//把这个路由配置放在所有路由的前面，方便调用next操作
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT,PATCH,POST,GET,DELETE,OPTIONS"
  );

  // 跨域请求CORS中的预请求
  if (req.method == "OPTIONS") {
    //特殊请求：发送了请求头的那些请求
    res.sendStatus(200); /*让options请求快速返回*/
  } else {
    next();
  }
});

app.use(allRouter); //引入总的路由，allRouter是一个中间件

//路由的分配

//监听端口
app.listen(PORT, () => {
  console.log("服务器已开启，请访问localhost:6688");
});
