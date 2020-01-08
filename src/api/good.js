
import axios from 'axios';

const Good = axios.create({
    baseURL: 'http://localhost:6688/goods/quire'
});


export const get = async (params, config = {}) => {
    let { data } = await Good.get('', {
        ...config,
        params
    })

    return data;
}

export default {
    get
}