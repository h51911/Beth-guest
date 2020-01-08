
import React, { Component } from 'react';
import { Icon, Alert } from 'antd';
import '../common/scss/detail.scss'
import { good } from '../api';
import Select from '../components/select ';
// import { compose } from 'redux';
import { connect } from 'react-redux';
// import store from './store';

// import { addgood } from './store/actions/cart';
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goodData: [],
            pricechack: false,
            dis: false,
            success: false,
            fail: false

        }
        this.choice = this.choice.bind(this);
        // this.tishisucc = this.tishisucc.bind(this);
        // this.tishifail = this.tishifail.bind(this);

    }
    //获取数据渲染
    async componentDidMount() {
        // console.log(this.props)
        let { gid } = this.props.match.params;
        let { data } = await good.get({
            gid
        });
        this.setState({
            goodData: data[0]

        });
        // console.log(this.props)

    }
    // 点击出现数量的加减
    choice(str) {
        let strnew = null;
        if (this.state.dis === str) {
            strnew = true;
        } else {
            strnew = false;
        }
        this.setState({
            dis: strnew
        })
    }
    // tishisucc(str) {
    //     let strnew = null;
    //     if (this.state.success === str) {
    //         strnew = true;
    //     } else {
    //         strnew = false;
    //     }
    //     this.setState({
    //         dis: strnew
    //     })
    // }
    // tishifail(str) {
    //     let strnew = null;
    //     if (this.state.fail === str) {
    //         strnew = true;
    //     } else {
    //         strnew = false;
    //     }
    //     this.setState({
    //         dis: strnew
    //     })
    // }


    render() {
        let { goodData, dis, success, fail } = this.state;
        let { cartlist } = this.props;
        return <div className="detail">
            <div className="tishi">{
                success ? <Alert message="添加成功" type="success" showIcon /> : ''
            }
            </div>
            <div className="tishifail">
                {
                    fail ? <Alert message="添加失败" type="warning" showIcon /> : ''
                }
            </div>
            <header className="header">
                <span className="fl iconlet"
                    onClick={() => {
                        this.props.history.goBack();
                    }}
                >
                    < Icon type="left" />
                </span>
                <h1 className="detailTitle">{goodData.title}</h1>
            </header>
            <div className="img">
                <img src={goodData.src} alt={goodData.title} />
            </div>
            <div className="detailCon">
                <h2>{goodData.title}</h2>
                <p className="deprice"><i>￥</i>{goodData.price} <i className="tame">/组</i></p>
                <p className="class"><span>已选择：</span>{goodData.title} </p>
                <div className="tiandu">
                    <span>参考甜度</span>
                    <img src="https://res.bestcake.com/images/item-2017/tian3.png?v=112" alt="" />
                </div>

            </div>
            <div className="defooter clearfix">
                <div className="decart fl">
                    <Icon type="shopping-cart" />
                </div>
                <div className="fr gobuy" onClick={this.choice.bind(this, dis)}>立即购买</div>
                <div className="fr gocar" onClick={this.choice.bind(this, dis)}>加入购物车</div>
            </div>
            {/* 选择类型与数量 */}
            {/* 传递方法 */}
            <div className="sele">
                {
                    dis ? <Select
                        goodData={goodData}
                        choice={this.choice.bind(this)}
                    /> : ''
                }

            </div>
            {
                cartlist.length ? <div className="yuans">
                    {
                        cartlist.length
                    }
                </div> : ''
            }
        </div>
    }
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
Detail = connect(mapStateToProps, mapDispatchToProps)(Detail);//
export default Detail;