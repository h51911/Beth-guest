
const express = require("express"); //模块访问：缓存
let {
  formatdata
} = require("../utils/formatdata"); //自定义模块

const Router = express.Router();

let {
  mongo
} = require("../db"); //引入操作数据库的模块
let {
  create,
  verify,
  createNew
} = require("../utils/token");
/*
 * 用户管理
 * 查询是否存在
 * 注册
 * 登陆
 * 修改密码
 * 查询所有用户
 */

// Router.use('/', (req, res) => {
//     console.log('进入了users子路由');
//     res.send('进入了users子路由');
// })

//查询所有用户 /users进入这里
Router.get("/", async (req, res) => {
  let result = await mongo.find("userinf", req.query); //调用封装好的find方法，查询数据并返回给前端 [{},{},{}]
  if (result.length) {
    //成功
    res.send(formatdata({
      data: result
    }));
  } else {
    //失败
    res.send(formatdata({
      code: 0
    }));
  }
});
//http://localhost:6688/users/LoginPhone
//查询所有用户 /users进入这里
Router.get('/LoginPhone', async (req, res) => {
  let result = await mongo.find("userinf", req.query); //调用封装好的find方法，查询数据并返回给前端 [{},{},{}]
  if (result.length) {
    //成功
    res.send(formatdata({
      data: result
    }));
  } else {
    //失败
    res.send(formatdata({
      code: 0
    }));
  }
});

//注册 /users/reg
Router.post('/reg', async (req, res) => {
  console.log(req.body);
  let result = await mongo.create("userinf", [req.body]); //调用封装好的find方法，查询数据并返回给前端
  // console.log(result);
  if (result.insertedCount) {
    //插入成功
    res.send(formatdata());
  } else {
    //插入失败
    res.send(formatdata({
      code: 0
    }));
  }
});

//验证用户名是否存在 /users/check
Router.get("/check", async (req, res) => {
  let result = await mongo.find("userinf", req.query); //调用封装好的find方法，查询数据并返回给前端
  // console.log(result);
  if (result.length) {
    //找到，不给注册
    res.send(formatdata({
      code: 0
    }));
  } else {
    //没有找到，可以注册
    res.send(formatdata());
  }
});

//插入数据http://localhost:6688/users/insert 
Router.post('/insert', async (req, res) => {
  // console.log(req.body);
  let result = await mongo.create('userinf', [req.body]); //调用封装好的create方法，查询数据并返回给前端
  // console.log(result);
  if (result.insertedCount) {
    //插入成功
    res.send(formatdata());
  } else {
    //插入失败
    res.send(formatdata({
      code: 0
    }));
  }
})

//登陆 http://localhost:6688/users/login
Router.post('/login', async (req, res) => {
  let {
    phone,
    password,
    keep
  } = req.body;
  let result = await mongo.find('userinf', {
    phone,
    password
  }); //调用封装好的find方法，查询数据并返回给前端 [{},{},{}]
  // console.log(result);
  if (result.length) {
    //成功
    //判断是否要生成token：前端想保留7天免登陆的时候
    let token = "";
    if (keep == "true") {
      //生成token
      token = create(phone);
    }
    res.send(formatdata({
      authorization: token,
      data: result
    })); //把token生成后发给前端
    // res.send('登陆成功');
  } else {
    //失败
    res.send(formatdata({
      code: 0
    }));
  }
});

//token验证 users/verify
Router.post("/verify", async (req, res) => {
  let {
    Authorization,
    phone
  } = req.body;
  let flag = verify(Authorization);
  let data = [];
  if (flag) {
    data = await mongo.find("userinf", {
      phone
    });
  }
  res.send(formatdata({
    result: flag,
    data
  }));
});

//修改昵称 users/upname
Router.post('/upname', async (req, res) => {
  let {
    phone,
    newName
  } = req.body;
  try {
    let result = await mongo.updateUser(
      'userinf', {
      phone: phone
    }, {
      username: newName
    }
    );
    let flag = false;
    if (result.modifiedCount) {
      flag = true;
    }
    res.send(formatdata({
      result: flag
    }));
  } catch {
    res.send(formatdata({
      code: 0
    }));
  }
});

//修改密码 http://localhost:6688/users/change
Router.post('/change', async (req, res) => {
  let {
    phone,
    password
  } = req.body;
  // console.log(req.body);
  try {
    let result = await mongo.updateUser(
      'userinf', {
      phone: phone
    }, {
      password: password
    }
    );
    let flag = false;
    if (result.modifiedCount) {
      flag = true;
    }
    res.send(formatdata({
      result: flag
    }));
  } catch {
    res.send(formatdata({
      code: 0
    }));
  }
});

module.exports = Router;