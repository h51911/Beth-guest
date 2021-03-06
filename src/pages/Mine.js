import React, { Component } from 'react';
import { Icon } from 'antd';
import '../common/css/mine.css';
import 'antd/dist/antd.css';
import { my } from '../api';
class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datalist: {}
        }
        this.goInfor = this.goInfor.bind(this);
        this.goLogin = this.goLogin.bind(this)
    }
    goInfor() {
        let phone = sessionStorage.getItem('phone');
        if (phone) {
            this.props.history.push('/informat');
        } else {
            this.props.history.push('/login');
        }

    }
    async componentDidMount() {
        let phone = sessionStorage.getItem('phone');
        if (phone) {
            let { data } = await my.get('/LoginPhone', { phone: phone })
            this.setState({
                datalist: data.data[0]
            })
        }

    }
    goLogin() {
        this.props.history.push('./login')
    }

    render() {
        let phone = sessionStorage.getItem('phone');
        let { datalist } = this.state;
        return <div>
            <section className="main">
                <div className="userinformation">
                    <div>
                        <div className="headerbar-center">
                            <h4 className="headerbar-content">我的账户</h4>
                        </div>
                        <div className="arrow">
                            <div className="arrow-right-icon box-userinfo"> </div>
                            <div className="avatar" onClick={this.goInfor.bind(this)}>
                                <img src="https://img02.hua.com/m/images/wxguanjia-kf.png" alt="" />

                                {
                                    phone ? <div className="pan fr" >
                                        <p className="na">{datalist.username}</p>
                                        <p style={{ color: '#a9a9a9' }}>手机号：{datalist.phone}</p>
                                    </div> : <p className="ru" onClick={this.goLogin.bind(this)}>未登入</p>
                                }

                            </div>
                        </div>
                        <div className="linkbox">
                            <div className="linkbox-item">
                                <a href="###" className="navi">
                                    <p className="iconfont">0.00</p>
                                    <p className="linkbox-item-txt">余额</p>
                                </a>
                            </div>
                            <div className="linkbox-item">
                                <a href="###" className="navi">
                                    <p className="iconfont ">0</p>
                                    <p className="linkbox-item-txt">吉致币</p>
                                </a>
                            </div>
                            <div className="linkbox-item">
                                <a href="###" className="navi">
                                    <p className="iconfont">0</p>
                                    <p className="linkbox-item-txt">优惠券</p>
                                </a>
                            </div>
                            <div className="linkbox-item">
                                <a href="###" className="navi">
                                    <p className="iconfont">0</p>
                                    <p className="linkbox-item-txt">兑换卷</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrapper page-for-center">
                    <ul className="common-box menu-list-vertical">
                        <li className="arrow-right-icon">
                            <Icon className="iconfont-smile" type='solution' />
                            <a target="_self" href="###">我的订单</a>
                        </li>
                        <li className="arrow-right-icon">
                            <Icon className="iconfont-smile" type='environment' />
                            <a target="_self" href="###">我的地址</a>
                        </li>
                    </ul>

                    <ul className="common-box menu-list-vertical list1">
                        <li className="arrow-right-icon">
                            <Icon className="iconfont-smile" type='customer-service' />
                            <a target="_self" href="###">客户热线</a>
                        </li>
                        <li className="arrow-right-icon">
                            <Icon className="iconfont-smile" type='credit-card' />
                            <a target="_self" href="###">关于我们</a>
                        </li>
                    </ul>

                    <ul className="common-box menu-list-vertical">
                        <li className="arrow-right-icon">
                            <Icon className="iconfont-smile" type='message' />
                            <a target="_self" href="###">我的消息</a>
                        </li>
                        <li className="arrow-right-icon">
                            <Icon className="iconfont-smile" type='setting' />
                            <a target="_self" href="###">设置</a>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    }
}

export default Mine;