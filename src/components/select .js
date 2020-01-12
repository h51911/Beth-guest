import React, { Component } from 'react';
import { Icon, message } from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../common/scss/select.scss';
import Qs from "qs";
import { cart } from '../api';
import 'axios';
import { connect } from 'react-redux';
import { changeQty, add2cart } from '../store/actions/cart';
class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 1,
            msg: {},
            uid: '',
            // 提示
            success: false,
            fail: false,
            deposit: false,

        }
        this.close = this.close.bind(this);
        this.cut = this.cut.bind(this);
        this.add = this.add.bind(this);
        this.goubuynow = this.goubuynow.bind(this);


    }

    close() {
        //获取父组件传来的方法关闭，选择
        this.props.choice(false);

    }


    // 数量减
    cut() {
        let num = this.state.num;
        if (num <= 1) {
            num = 1;
        } else {
            num--
        }
        this.setState({
            num
        })

    }

    // 数量加
    add() {
        let num = this.state.num;
        if (num >= 1) {
            num++;
        }
        this.setState({
            num
        })

    }

    async  goubuynow(gid) {
        let { cartlist, dispatch } = this.props;
        let has = cartlist.filter(item => item.gid === gid);
        if (has.length) {
            // console.log('has', has.length)
            let num = this.state.num + has[0].num * 1;
            let uid = has[0].uid;
            // console.log(num)
            dispatch(changeQty(gid, num));
            let newstr = {
                uid,
                num,
                gid
            }
            let data = await cart.post('/updataNum', Qs.stringify(newstr));

            if (data.code) {
                message.success('添加成功');
            } else {
                message.error('添加失败');
            }

        } else {
            let { goodData } = this.props;
            let uid = sessionStorage.getItem('phone')
            let str1 = {
                uid,
                gid: goodData.gid,
                src: goodData.src,
                title: goodData.title,
                price: goodData.price,
                num: this.state.num,
                choose: true
            }
            dispatch(add2cart(str1));
            let data = await cart.post("/insert", Qs.stringify(str1));
            if (data.code) {
                message.success('添加成功');
            } else {
                message.error('添加失败');
            }

        }
    }
    //加入购物车
    gocart = (gid) => {
        this.goubuynow(gid)
    }
    //立即购买
    buyNow = (gid) => {
        this.goubuynow(gid)
        let path = '/cart';
        this.props.history.push(path);
    }

    render() {
        let { goodData } = this.props;
        let { num } = this.state;
        let totalprice = goodData.price * num;
        return <div className="selecom">
            {/* 遮罩层 */}
            <div className="divBG"
                onClick={this.close.bind(this)}
            ></div>
            {/* 关闭 */}
            <div className="close"
                onClick={this.close.bind(this)}
            >X</div>
            <div className="seCon">
                <div className="seheader clearfix">
                    <div className="fl seimg">
                        <img src={goodData.src} alt={goodData.title} />
                    </div>
                    <div className="fl hearight">
                        <h2>{goodData.title}</h2>
                        <p className="sortsnum">月销：{goodData.sales}</p>
                        <p className="price">￥{goodData.price}<i className="tame">/个</i></p>
                    </div>
                </div>
                <div className="guige">
                    <p>规格：</p>
                    <div className="ke">545克（1.2磅）</div>
                </div>
                <div className="clearfix lei">
                    <span className="fl">
                        <Icon type="instagram" />
                        13.5*13.5cm
            </span>
                    <span className="fl">
                        <Icon type="usergroup-delete" />
                        适合4-5人分享
            </span>
                    <span className="fl">
                        <Icon type="slack" />
                        含五人份餐具
            </span>
                    <span className="fl">
                        <Icon type="clock-circle" />
                        最早明天开始配送
            </span>
                </div>
                <div className="buynum clearfix">
                    <div className="fl numtext">购买数量</div>
                    <div className="senum fr" >
                        <span className="seleft"
                            onClick={this.cut.bind(this)}
                        >
                            <Icon type="minus-circle" />
                        </span>
                        <span className="senums">{num}</span>
                        <span className="seright" onClick={this.add.bind(this)}>
                            <Icon type="plus-circle" className="jia" />
                        </span>
                    </div>
                </div>
            </div>
            <div className="sefooter clearfix">
                <div className="decart fl">
                    {totalprice.toFixed(1)}
                </div>
                <div className="fr gobuy" onClick={this.buyNow.bind(this, goodData.gid)}>立即购买</div>
                <div className="fr gocar" onClick={this.gocart.bind(this, goodData.gid)}>加入购物车</div>
            </div>
        </div>

    }
}

Select.propTypes = {
    goodData: PropTypes.object.isRequired
}


const mapStateToProps = function (state) {
    // console.log('state:', state)
    // 需要传递什么数据到组件的props就返回什么
    return {
        cartlist: state.cart.cartlist
    }
}
const mapDispatchToProps = dispatch => ({
    dispatch
})
Select = connect(mapStateToProps, mapDispatchToProps)(Select);//
export default withRouter(Select);