export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CHANGE_QTY = 'CHANGE_QTY';
export const CLEAR_CART = 'CLEAR_CART';
export const ADD_TO_Good = 'ADD_TO_Good';
export const ADD_SHOP = 'ADD_SHOP';  // + 商品
export const SUB_SHOP = 'SUB_SHOP';  // — 商品
export const TOGGLE_SHOP = 'TOGGLE_SHOP';  // 是否选中
export const ADD_TO_Price = 'ADD_TO_Price';


// State：初始数据
let initState = {
    totalPrice: 0,
    cartlist: [],
    newlist: []
}

// Reducer：修改state的方法（重要：在redux中修改state方式：重写并覆盖）
const reducer = function (state = initState, { type, payload }) {
    // 修改state的代码
    switch (type) {

        // 添加商品
        case ADD_TO_CART:
            return {
                ...state,
                cartlist: [payload, ...state.cartlist]
            }

        case ADD_TO_Good:
            return {
                ...state,
                cartlist: payload
            }
        case ADD_TO_Price:
            return {
                ...state,
                totalPrice: payload
            }


        // 删除商品：{type:'remove_from_cart',payload:id}
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartlist: state.cartlist.filter(item => item.gid !== payload)
            }

        // 修改数量：{type:'change_qty',payload:{goods_id,goods_qty}}
        case CHANGE_QTY:
            return {
                ...state,
                cartlist: state.cartlist.map(item => {
                    if (item.gid === payload.gid) {
                        item.num = payload.num
                    }
                    return item;
                })
            }


        // case CHANGE_PRICE:
        //     return {
        //         ...state,
        //         newlist: state.cartlist.map(item => {
        //             let total = 0;
        //             if (item.choose === true) {
        //                 total = item.num * item.price;
        //             }
        //             return total;
        //         })

        //     }


        // 清空购物车
        case CLEAR_CART:
            return {
                ...state,
                cartlist: []
            }


        case ADD_SHOP: // 商品 ++
            return {
                ...state,
                cartlist: state.cartlist.map(item => {
                    if (item.gid === payload.gid) {
                        item.num++
                    }
                    return item;
                })
            }

        case SUB_SHOP: // 商品 --
            return {
                ...state,
                cartlist: state.cartlist.map(item => {
                    if (item.gid === payload.gid) {
                        if (item.num <= 1) {
                            item.num = 1
                            // 代码不继续往下执行
                        } else {
                            item.num--
                        }

                    }
                    return item;
                })
            }

        case TOGGLE_SHOP:  // 选中或取消选中商品
            return {
                ...state,
                cartlist: state.cartlist.map(item => {
                    if (item.gid === payload.gid) {
                        item.choose = !item.choose;
                    }
                    return item;
                })
            }
        default:
            return state;
    }
}

export default reducer;