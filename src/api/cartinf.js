
import axios from 'axios';

//插入数据购物车的数据
const Good = axios.create({
    baseURL: 'http://localhost:6688/goods'
});

//查询购物车的商品是否存在
const CartGoods = axios.create({
    baseURL: 'http://localhost:6688/goods/findCart'
});


export const post = async (path, str = {}, config = {}) => {
    let { data } = await Good.post(path, str, config)
    return data;
}


export const gets = async (params, config = {}) => {
    let { data } = await CartGoods.get('', {
        ...config,
        params
    })

    return data;
}



export default {
    post,
    gets
}

// axios.post('http://localhost:6688/goods/insert', {
//     params: {
//         str,
//     }
// }).then(item => {
//     console.log(item)
// });