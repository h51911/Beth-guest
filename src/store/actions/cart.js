import { ADD_TO_CART, CHANGE_QTY, REMOVE_FROM_CART, CLEAR_CART, ADD_TO_Good, TOGGLE_SHOP, ADD_SHOP, SUB_SHOP, ADD_TO_Price } from '../reducer/cart';


export function add2cart(goods) {
    return {
        type: ADD_TO_CART,
        payload: goods
    }
}

export function addgood(goods) {
    return {
        type: ADD_TO_Good,
        payload: goods
    }
}

export function addprice(goods) {
    return {
        type: ADD_TO_Price,
        payload: goods
    }
}

export function changeQty(gid, num) {
    return {
        type: CHANGE_QTY,
        payload: {
            gid,
            num
        }
    }
}

export function remove(gid) {
    return {
        type: REMOVE_FROM_CART,
        payload: gid
    }
}

export function clear() {
    return {
        type: CLEAR_CART
    }
}

// 购物车加商品
export function userAddShop(gid, num) {
    return {
        type: ADD_SHOP,
        payload: {
            gid,
            num
        }
    }

}

// 购物车减商品
export function userSubShop(gid, num) {
    return {
        type: SUB_SHOP,
        payload: {
            gid,
            num
        }
    }

}


// 购物车选中或不选中
export function checkShopNumber(gid, choose) {
    return {
        type: TOGGLE_SHOP,
        payload: {
            gid,
            choose
        }
    };

}

export default {
    add2cart,
    changeQty,
    remove,
    clear
}