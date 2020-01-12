const express = require('express'); //模块访问：缓存

let {
    formatdata
} = require('../utils/formatdata'); //自定义模块


const Router = express.Router();

let {
    mongo
} = require('../db'); //引入操作数据库的模块
let {
    create
} = require('../utils/token');
//http://localhost:1912/goods/quire
Router.get('/quire', async (req, res) => {
    let result = await mongo.find('goodlist', req.query); //调用封装好的find方法，查询数据并返回给前端 [{},{},{}]
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
//http://localhost:6688/goods/findCart
Router.get('/findCart', async (req, res) => {
    let result = await mongo.find('cartinf', req.query); //调用封装好的find方法，查询数据并返回给前端 [{},{},{}]
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

//插入数据http://localhost:6688/goods/insert 
Router.post('/insert', async (req, res) => {
    // console.log(req.body);
    let result = await mongo.create('cartinf', [req.body]); //调用封装好的create方法，查询数据并返回给前端
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

Router.post('/insertorder', async (req, res) => {
    // console.log(req.body);
    let result = await mongo.create('order', [req.body]); //调用封装好的create方法，查询数据并返回给前端
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


//删除数据 http://localhost:6688/goods/delMony
Router.post('/delMony', async (req, res) => {
    console.log(req.body)
    let result = await mongo.remove('cartinf', [req.body]); //调用封装好的remove方法，查询数据并返回给前端
    if (result.deletedCount) {
        //删除成功
        res.send(formatdata());

    } else {
        //删除失败
        res.send(formatdata({
            code: 0
        }));
    }

});

//删除数据 http://localhost:6688/goods/del 一条
Router.post('/del', async (req, res) => {
    let {
        uid,
        gid
    } = req.body;
    let result = await mongo.remove('cartinf', {
        uid: uid,
        gid: gid
    }); //调用封装好的remove方法，查询数据并返回给前端
    if (result.deletedCount) {
        //删除成功
        res.send(formatdata());

    } else {
        //删除失败
        res.send(formatdata({
            code: 0
        }));
    }

});

//修改  http://localhost:1912/goods/updata
Router.post('/updataNum', async (req, res) => {
    let {

        uid,
        gid,
        num
    } = req.body;

    let result = await mongo.update('cartinf', {
        gid: gid,
        uid: uid

    }, {
        $set: {
            num: num
        }
    }); //调用封装好的find方法，查询数据并返回给前端 [{},{},{}]
    if (result.modifiedCount) {
        //成功
        res.send(formatdata({
            data: result.modifiedCount
        }));
    } else {
        //失败
        res.send(formatdata({
            code: 0
        }));
    }

});

module.exports = Router;