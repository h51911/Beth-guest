const {
  MongoClient
} = require("mongodb"); //引入第三方模块
const {
  DBurl,
  DBname
} = require("../config.json");

async function connect() {
  let client = await MongoClient.connect(DBurl);
  let db = client.db(DBname);
  return {
    db,
    client
  };
}

/**
 * @description: 增
 * @param {string} 集合名字 colname
 * @param {array} 数组      data
 * @return: object
 */

async function create(colname, data) {
  //1.连接数据库
  let {
    db,
    client
  } = await connect();
  //2.找到集合
  let col = db.collection(colname); //无则自动创建
  //3.插入数据到集合
  let result = await col.insertMany(data);
  // console.log(result);
  //4.关闭数据库
  client.close();

  return result;
}

//测试接口
// create('song', [{ id: 5, name: '卡路里' }]);

/**
 * @description: 删
 * @param {string} 集合名字 colname
 * @param {object} 条件     query
 * @return: object
 */

async function remove(colname, query) {
  //1.连接数据库
  let {
    db,
    client
  } = await connect();
  //2.找到集合
  let col = db.collection(colname); //无则自动创建
  //3.删除数据
  let result = await col.deleteMany(query);
  // console.log(result);
  //4.关闭数据库
  client.close();
  return result;
}

//测试接口
// remove('song', { name: '月亮代表我的心' });

/**
 * @description: 改
 * @param {string} 集合名字 colname
 * @param {object} 条件     query
 * @param {object} 数据     newdata
 * @return: object
 */

async function updateUser(colname, query, newdata) {
  //1.连接数据库
  let {
    db,
    client
  } = await connect();
  //2.找到集合
  let col = db.collection(colname); //无则自动创建
  //3.删除数据
  // let result = await col.updateMany(query, newdata);
  let result = await col.updateMany(query, {
    $set: newdata
  });

  // console.log(result);
  //4.关闭数据库
  client.close();
  return result;
}

async function update(colname, query, newdata) {
  //1.连接数据库
  let {
    db,
    client
  } = await connect();
  //2.找到集合
  let col = db.collection(colname); //无则自动创建
  //3.修改数据
  let result = await col.updateMany(query, newdata);
  // console.log(result);
  //4.关闭数据库
  client.close();
  return result;
}

/**
 * @description: 查
 * @param {string} 集合名字 colname
 * @param {object} 条件     query
 * @return: object
 */

//查找功能 find()
async function find(colname, qurey) {
  try {
    let {
      db,
      client
    } = await connect(); //await只能接收成功的回调resolve
    // obj.then().catch()
    let col = db.collection(colname); //无则自动创建
    //数据的CRUD操作
    let result = await col.find(qurey).toArray(); //查找数据
    // console.log(result);

    //关闭数据库
    client.close();
    return result; //返回查询结果,返回给入口
  } catch {
    //接收到reject的数据
    console.log(err);
  }
}

//通用性，集合colname，查询条件qurey
//测试接口
// find('song', { name: '涛声依旧' });

//暴露接口，只要导入该模块，就拥有了CRUD功能
module.exports = {
  create,
  remove,
  update,
  find,
  updateUser
};