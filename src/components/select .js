import React, { Component } from 'react';
import { Icon, Alert } from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../common/scss/select.scss';
import Qs from "qs";
import { cart } from '../api';
import 'axios';
import { connect } from 'react-redux';
import { changeQty } from '../store/actions/cart';
class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 1,
            msg: {},
            uid: 123,
            // 提示
            success: false,
            fail: false,
            deposit: false
        }
        this.tishisucc = this.tishisucc.bind(this);
        this.tishifail = this.tishifail.bind(this);
        this.close = this.close.bind(this);
        // this.buygoods = this.buygoods.bind(this);
        this.cut = this.cut.bind(this);
        this.add = this.add.bind(this);

    }

    close() {
        //获取父组件传来的方法关闭，选择
        this.props.choice(false);

    }
    tishisucc(str) {
        let strnew = null;
        if (this.state.success === str) {
            strnew = true;
        } else {
            strnew = false;
        }
        this.setState({
            success: strnew
        })
    }
    tishifail(str) {
        let strnew = null;
        if (this.state.fail === str) {
            strnew = true;
        } else {
            strnew = false;
        }
        this.setState({
            fail: strnew
        })
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

    gocart = async (gid, str) => {
        let { cartlist, dispatch } = this.props;
        let has = cartlist.filter(item => item.gid === gid);

        if (has.length) {
            let num = this.state.num + has[0].num * 1;
            let uid = has[0].uid;
            dispatch(changeQty(gid, num));
            let newstr = {
                uid,
                num,
                gid
            }
            let data = await cart.post("/updata", Qs.stringify(newstr));
            if (data.code) {
                console.log("添加成功");
                this.tishisucc(false);
                // this.props.choice(false);
            } else {
                console.log("添加失败");
            }
            // setTimeout(this.tishisucc(true), 2000)
        } else {
            console.log(66)
            let { goodData } = this.props;
            let str = {
                uid: this.state.uid,
                gid: goodData.gid,
                src: goodData.src,
                title: goodData.title,
                price: goodData.price,
                num: this.state.num,
                choose: true
            }
            let data = await cart.post("/insert", Qs.stringify(str));
            if (data.code) {
                console.log("添加成功");
                this.props.choice(false);
            } else {
                console.log("添加失败")
                this.props.choice(false);
            }


        }

        this.tishisucc(true);

    }



    buyNow = async (gid, str) => {
        let { cartlist, dispatch } = this.props;
        let has = cartlist.filter(item => item.gid === gid);

        if (has.length) {
            let num = this.state.num + has[0].num * 1;
            let uid = has[0].uid;
            dispatch(changeQty(gid, num));
            let newstr = {
                uid,
                num,
                gid
            }
            let data = await cart.post("/updata", Qs.stringify(newstr));
            if (data.code) {
                console.log("添加成功");
                this.props.choice(false);
            } else {
                console.log("添加失败");
            }

        } else {
            console.log(66)
            let { goodData } = this.props;
            let str = {
                uid: this.state.uid,
                gid: goodData.gid,
                src: goodData.src,
                title: goodData.title,
                price: goodData.price,
                num: this.state.num,
                choose: true
            }
            let data = await cart.post("/insert", Qs.stringify(str));
            if (data.code) {
                console.log("添加成功");
                this.props.choice(false);
            } else {
                console.log("添加失败")
                this.props.choice(false);
            }


        }
        let path = '/cart';
        this.props.history.push(path);
    }

    render() {
        let { goodData } = this.props;
        let { num, success, fail } = this.state;
        let totalprice = goodData.price * num;
        // console.log(this.props)
        console.log(this.props)
        return <div className="selecom">
            {/* 遮罩层 */}
            <div className="divBG"
                onClick={this.close.bind(this)}
            ></div>
            <div className="tishi">{
                success ? <Alert message="添加成功" type="success" showIcon closable="true" /> : ''
            }
            </div>
            <div className="tishifail">
                {
                    fail ? <Alert message="添加失败" type="warning" showIcon /> : ''
                }
            </div>

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
export default withRouter(Select)