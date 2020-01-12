import React, { Component } from 'react';
import { Checkbox, Icon, message } from 'antd';
import '../common/css/cart.css'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { cart } from '../api';
import Qs from "qs";

import { remove, clear, userAddShop, userSubShop, checkShopNumber, addgood } from '../store/actions/cart';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAll: true,
            liked: true,
            cartlist: [],
            totalPrice: 0

        }
        this.removeItem = this.removeItem.bind(this);
        this.clearCart = this.clearCart.bind(this);
        // this.changeQty = this.changeQty.bind(this);
        this.addShopNum = this.addShopNum.bind(this);
        this.subShopNum = this.subShopNum.bind(this);
        this.selecteItem = this.selecteItem.bind(this);
        this.changenum = this.changenum.bind(this);
        this.remove = this.remove.bind(this)//点击删除

    }

    handleClick = () => {
        //更新状态值
        this.setState({
            liked: !this.state.liked,

        })
        this.selecALL()
    }
    //全选和反选
    selecALL = () => {
        this.setState({//全选方式、:覆盖
            selectedAll: !this.state.selectedAll
        })
        let list = this.props.cartlist.map(item => {
            item.choose = !item.choose;
            return item;
        })
        this.props.dispatch(addgood(list));

        this.setState({
            totalPrice: 0
        })
    }

    async removeItem(gid) {
        let { uid } = this.props.cartlist[0];
        let str = {
            uid,
            gid
        }
        let data = await cart.post('/del', Qs.stringify(str));
        if (data.code) {
            this.props.dispatch(remove(gid));
            message.success('删除成功')
        } else {
            message.success('删除失败')
        }

    }
    clearCart() {
        this.props.dispatch(clear())
    }

    async addShopNum(gid) {
        this.props.dispatch(userAddShop(gid));
        let { num, uid } = this.props.cartlist[0];
        let str = {
            uid,
            gid,
            num
        }
        await cart.post('/updataNum', Qs.stringify(str));
    }

    async subShopNum(gid) {
        this.props.dispatch(userSubShop(gid));
        let { num, uid } = this.props.cartlist[0];
        let str = {
            uid,
            gid,
            num
        }
        await cart.post('/updataNum', Qs.stringify(str));
    }

    //取消选中、或者选中
    selecteItem(gid) {
        this.props.dispatch(checkShopNumber(gid));
        let checknum = this.props.cartlist.filter(item => item.choose !== false);
        let le1 = this.props.cartlist.length;
        let le2 = checknum.length;
        if (le1 === le2) {
            this.setState({//全选方式、:覆盖
                selectedAll: true
            })

        } else {
            this.setState({//全选方式、:覆盖
                selectedAll: false
            })
        }


    }
    async remove() {
        let cartold = this.props.cartlist.filter(item => item.choose === true);
        let order1 = [];
        let goodstr1 = {};
        cartold.forEach(item => {
            goodstr1.uid = item.uid;
            goodstr1.gid = item.gid;
            order1.push(goodstr1);
        });
        // console.log(order1)
        order1.forEach(async item1 => {
            await cart.post('/del', Qs.stringify({ uid: item1.uid, gid: item1.gid }))
        });

        let cartnew = this.props.cartlist.filter(item => item.choose !== true);
        this.props.dispatch(addgood(cartnew));

    }
    changenum(e) {
        // console.log(e.target.value)

    }
    render() {
        let { cartlist, totalPrice } = this.props;
        let { selectedAll } = this.state;
        return <div>
            <div className="cart">
                <header className="title-bar">
                    <h1 className="nav-title"> 购物车 </h1>
                    {
                        this.state.liked ? <span className="tiele" onClick={this.handleClick}>编辑</span> : <span className="tiele" onClick={this.handleClick}>完成</span>
                    }



                </header>
                <main>
                    {/* 商品渲染 */}
                    <ul className="goods-list">
                        {
                            cartlist.map(item => {
                                return <li className="goods-item" key={item.gid}>
                                    <span className="left psoi">
                                        <Checkbox
                                            onChange={this.selecteItem.bind(this, item.gid, item.choose)}
                                            value={item.choose}
                                            checked={item.choose}
                                        ></Checkbox>
                                    </span>
                                    <div className="cart-pro-box">
                                        <a>
                                            <img src={item.src} alt=""
                                                onClick={
                                                    () => {
                                                        this.props.history.push('/detail/' + item.gid)
                                                    }}
                                            />
                                        </a>
                                        <div className="cart-pro-title">
                                            <div>
                                                <h2>
                                                    <span>{item.title}</span>
                                                    <p className="txt">物流</p>
                                                </h2>
                                            </div>
                                            <span className="cart-select-pound" data-product-id="7687" data-literpound="1">
                                                454g(1.0磅)
                                                        <i></i>
                                            </span>
                                            <span className="cart-price" data-amount="268">￥{item.price}<strong>/个</strong> </span>
                                        </div>
                                    </div>
                                    <div className="cart-pro-number">
                                        <a className="action-quantity-minus" onClick={this.subShopNum.bind(this, item.gid)}>
                                            <Icon type="minus" />
                                        </a>
                                        <input
                                            type="num"
                                            value={item.num}
                                            onChange={this.changenum.bind(this)}
                                        />
                                        <a className="action-quantity-plus" onClick={this.addShopNum.bind(this, item.gid)}>
                                            <Icon type="plus" />
                                        </a>
                                    </div>
                                    <span className="dele" onClick={this.removeItem.bind(this, item.gid)}>删除</span>
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
                <footer className="footer clearfix">
                    <div className="nen fl" >
                        <span className="left">
                            {/* onClick={clearCart} */}
                            <Checkbox
                                onChange={this.selecALL}
                                checked={this.state.selectedAll}
                                defaultValue=""
                            ></Checkbox>
                            <em>全选</em></span>
                        {
                            this.state.liked ? <span className="footer-left"><em>合计:</em>
                                {
                                    selectedAll ? <em className="total">
                                        {totalPrice}
                                    </em> : <em className="total">
                                            0
                                        </em>
                                }
                            </span> : ''
                        }


                    </div>
                    <div className="fr">
                        {
                            this.state.liked ? <button className="footer-right" type="button" id="jieSuan">去结算
                             <em className="total-num">{cartlist.length}</em>
                            </button> : <button className="footer-right" type="button" id="jieSuan" onClick={this.remove.bind(this)}>删除
                        </button>
                        }


                    </div>

                </footer>
            </div>
        </div>
    }
}


const mapStateToProps = state => {
    return {
        cartlist: state.cart.cartlist,
        totalPrice: state.cart.cartlist.reduce((prev, item) => prev + item.price * item.num, 0),
        totalQty: state.cart.cartlist.reduce((prev, item) => prev + item.num * 1, 0)
    }
}
const mapDispatchToProps = dispatch => ({
    dispatch
})
// // 函数柯里化
Cart = connect(mapStateToProps, mapDispatchToProps)(Cart);
export default withRouter(Cart);