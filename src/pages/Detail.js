
import React, { Component } from 'react';
import { Icon } from 'antd';
import '../common/scss/detail.scss'
import { good } from '../api';
import Select from '../components/select ';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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



    render() {
        let { goodData, dis } = this.state;
        let { cartlist } = this.props;
        return <div className="detail">
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
            <div className="deimg">
                <img src="https://res.bestcake.com/images-2/classical-detail-new/detail-img/沃尔夫斯堡之春1.jpg?v=8" alt="" />
                <img src="https://res.bestcake.com/images-2/classical-detail-new/detail-img/沃尔夫斯堡之春2.jpg?v=8 " alt="" />
                <img src="https://res.bestcake.com/images-2/classical-detail-new/detail-img/沃尔夫斯堡之春3.jpg?v=8" alt="" />
                <img src="https://res.bestcake.com/images-2/classical-detail-new/detail-img/芒GO1.jpg?v=12" alt="" />
                <img src="https://res.bestcake.com/images-2/classical-detail-new/detail-img/芒GO2.jpg?v=12" alt="" />
                <img src="https://res.bestcake.com/images-2/classical-detail-new/detail-img/芒GO3.jpg?v=12" alt="" />

            </div>
            <div className="defooter clearfix">
                <div className="decart fl" onClick={() => {
                    this.props.history.push('/cart');
                }}>
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
                cartlist.length ? <div className="yuanss">
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
export default withRouter(Detail);