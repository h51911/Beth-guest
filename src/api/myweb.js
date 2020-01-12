
// import axios from 'axios';

// const My = axios.create({
//     baseURL: 'http://localhost:3000'
// });

// export const get = async (url, params, config = {}) => {
//     let { data } = await My.get(url, {
//         ...config,
//         params
//     })

//     return data;
// }

// export default {
//     get
// }


import axios from 'axios';

// 创建axios实例
const my = axios.create({
    baseURL: 'http://localhost:6688/users'
});

//注册
function get(path, params, config = {}) {
    return my.get(path, {
        ...config,
        params
    })
}

//登录时手机验证是否注册过
function gets(path, params, config = {}) {
    return my.get(path, {
        ...config,
        params
    })
}

function post(path, data = {}, config = {}) {
    return my.post(path, data, config)
}

//登录
function postLogin(path, data = {}, config = {}) {
    return my.post(path, data, config)
}
//修改密码
function puts(path, data = {}, config = {}) {
    return my.post(path, data, config)
}


function chagename(path, data = {}, config = {}) {
    return my.post(path, data, config)
}


export default {
    get,
    post,
    postLogin,
    gets,
    puts,
    chagename
}