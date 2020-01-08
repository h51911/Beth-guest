
import axios from 'axios';

//查询购物车是否有该商品
// const CartGood = axios.create({
//     baseURL: 'http://localhost:6688/goods/findCart'
// });

// export const find = async (params, config = {}) => {
//     let { data } = await CartGood.get('', params, ...config)
//     return data;
// }
// export default {
//     find
// }


const CartGoods = axios.create({
    baseURL: 'http://localhost:6688/goods/findCart'
});

export const gets = async (params, config = {}) => {
    let { data } = await CartGoods.get('', {
        ...config,
        params
    })

    return data;
}

export default {
    gets
}
