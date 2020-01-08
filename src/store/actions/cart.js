import { ADD_TO_CART, CHANGE_QTY, REMOVE_FROM_CART, CLEAR_CART, ADD_TO_Good } from '../reducer/cart';

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

export default {
    add2cart,
    changeQty,
    remove,
    clear
}