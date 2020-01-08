import React, { Component } from 'react';
import { Icon } from 'antd';
import '../common/css/cart.css'


class Cart extends Component {
    state = {
        goodslist: [{
            goods_id: '1',
            goods_name: 'Deep Bailey s Lovers',
            goods_images: 'https://m.21cake.com/goods/1459337079137.jpg',
            goods_price: 268.00,
            goods_qty: 10
        }, {
            goods_id: '2',
            goods_name: 'Deep Bailey s Lovers',
            goods_images: 'https://m.21cake.com/upload/images/22209c54953376c0478b4ac98490f95c.jpg',
            goods_price: 269.00,
            goods_qty: 12
        }]

    }


    changeQty = (id, qty) => {
        let { goodslist } = this.state;
        goodslist = goodslist.map(item => {
            console.log(item)
            if (item.goods_id === id) {
                item.goods_qty = qty;
            }
            return item
        })
        this.setState({
            goodslist
        })
    }

    //删除商品
    removeItem = (id) => {
        let { goodslist } = this.state;
        goodslist = goodslist.filter(item => item.goods_id !== id);
        this.setState({
            goodslist
        })
    }

    //清空购物车
    clearCart = () => {
        this.setState({
            goodslist: []
        })
    }

    // //按钮数量加
    // calcAdd=(qty)=>{
    //     let {goodslist} = this.state;
    //     goodslist = goodslist.goods_qty +=1;

    // 	//更新state属性值
    // 	this.setState({
    // 		goodslist
    //     })
    //     this.changeQty()
    // }


    render() {
        let { goodslist } = this.state;
        let totalPrice = goodslist.reduce((prev, item) => prev + item.goods_price * item.goods_qty, 0)
        let totalQty = goodslist.reduce((prev, item) => prev + item.goods_qty, 0)
        return <div>
            <div className="cart">
                <header className="title-bar">
                    <h1 className="nav-title"> 购物车 </h1>
                    <span className="tiele">编辑</span>
                </header>
                <main>
                    {/* 商品渲染 */}
                    <ul className="goods-list">
                        {
                            goodslist.map(item => {
                                return <li className="goods-item" key={item.goods_id}>
                                    <span className="left psoi" onClick={this.removeItem.bind(this, item.goods_id)}> <Icon type="poweroff" /></span>
                                    <div className="cart-pro-box">
                                        <a href="###">
                                            <img src={item.goods_images} alt="" />
                                        </a>
                                        <div className="cart-pro-title">
                                            <div>
                                                <h2>
                                                    <span>{item.goods_name}</span>
                                                    <p className="txt">物流</p>
                                                </h2>
                                            </div>
                                            <span className="cart-select-pound" data-product-id="7687" data-literpound="1">
                                                454g(1.0磅)
                                                        <i></i>
                                            </span>
                                            <span className="cart-price" data-amount="268">￥{item.goods_price}<strong>/个</strong> </span>
                                        </div>
                                    </div>
                                    <div className="cart-pro-number">
                                        <a className="action-quantity-minus" href="###">
                                            <img onClick={this.changeQty.bind(this, item.goods_qty)} src="https://static.21cake.com//themes/wap/img/-.png" alt="" />
                                        </a>
                                        <input
                                            min={1}
                                            max={10}
                                            value={item.goods_qty}
                                            onChange={this.changeQty.bind(this, item.goods_id)}
                                        // onChange={changeQtyAsync.bind(this,item.goods_id)}
                                        />
                                        <a className="action-quantity-plus" href="###">
                                            <img onClick={this.changeQty.bind(this, item.goods_qty)} src="https://static.21cake.com/themes/wap/img/+.png" alt="+" />
                                        </a>
                                    </div>
                                </li>
                            })
                        }

                    </ul>
                    {/* 购物车 */}
                    <div className="emptycart">
                        <img className="img" src="https://img02.hua.com/m/Shopping/m_shopping_empty_cart.png?v2" alt="" />
                        <p className="text">购物车内暂时没有商品</p>
                        <a className="home" href="###">随便逛逛</a>
                    </div>
                    {/* 猜你喜欢 */}
                    <div className="recommend-list">
                        <div className="order">
                            <span className="line"></span>
                            <div className="liner">
                                <span className="icon-star">
                                    <Icon type="heart" />
                                </span>
                                <span className="spa">猜你喜欢</span>
                            </div>
                            <span className="line"></span>
                        </div>
                        <ul>
                            <li>
                                <a href="###"><img src="https://m.21cake.com/upload/images/02c7a2b6b2fbb84c835fe037f3d84b47.jpg" alt="米道" />
                                    <h4>米道</h4>
                                    <p>￥298.00<span>/个</span></p>
                                </a>
                            </li>
                            <li>
                                <a href="###"><img src="https://m.21cake.com/goods/1459337079137.jpg" alt="百利甜情人" />
                                    <h4>百利甜情人</h4>
                                    <p>￥298.00<span>/盒</span></p>
                                </a>
                            </li>
                            <li>
                                <a href="###"><img src="https://m.21cake.com/upload/images/58c4227141bbcf6efe30b5940267a1a9.jpg" alt="榴莲飘飘" />
                                    <h4>榴莲飘飘</h4>
                                    <p>￥298.00<span>/盒</span></p>
                                </a>
                            </li>
                            <li>
                                <a href="###"><img src="https://m.21cake.com/upload/images/22209c54953376c0478b4ac98490f95c.jpg" alt="芒果奶油蛋糕" />
                                    <h4>芒果奶油蛋糕</h4>
                                    <p>￥198.00<span>/个</span></p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </main>
                {/* <!-- 下单按钮 --> */}
                {/* style={{display:'none'}} */}
                <footer className="footer">
                    <div className="nen">
                        <span className="left" onClick={this.clearCart}> <Icon type="poweroff" /><em>全选</em></span>
                        <span className="footer-left"><em>合计</em>:<em className="total">{totalPrice.toFixed(2)}</em></span>
                    </div>
                    <button className="footer-right" type="button" id="jieSuan">去结算
                            <em className="total-num">{totalQty}</em>
                    </button>
                </footer>
            </div>
        </div>
    }
}

export default Cart;