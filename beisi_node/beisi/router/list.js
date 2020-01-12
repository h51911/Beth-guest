const express = require('express'); //模块访问：缓存
let {
    formatdata
} = require('../utils/formatdata'); //自定义模块


const Router = express.Router();

let {
    mongo
} = require('../db'); //引入操作数据库的模块



Router.get('/', async (req, res) => {
    let result = await mongo.find('list', req.query); //调用封装好的find方法，查询数据并返回给前端 [{},{},{}]
    // window.console.log(result);
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

module.exports = Router;