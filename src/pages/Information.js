import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Button } from 'antd';
import '../common/scss/enterpass.scss';
import { my } from '../api';
class Infor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datalist: {}
        }
        this.goback = this.goback.bind(this);
        this.amend = this.amend.bind(this);
        this.loginout = this.loginout.bind(this);
        this.nick = this.nick.bind(this);
    }
    goback() {
        this.props.history.push('/mine')
    }
    amend() {
        this.props.history.push('/enterpass');
    }
    nick() {
        this.props.history.push('/nick');
    }
    loginout() {
        sessionStorage.removeItem('phone');
        this.props.history.push('/login');
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

    render() {
        let { datalist } = this.state;
        return (
            <div className="infort">
                <div className="enterheader">
                    <span className="spaniconss"
                        onClick={this.goback.bind(this)}
                    >
                        <Icon type="arrow-left" />
                    </span>
                    <h1>
                        个人信息
                </h1>
                </div>
                <div className="coninfor">
                    <p className="clearfix"
                        onClick={this.nick.bind(this)}
                    ><span className="fl">昵称</span>
                        <span className="fr icon"><Icon type="right" /></span><span className="fr nicheng">{datalist.username}</span>

                    </p>
                    <p className="clearfix" onClick={this.amend.bind(this)}><span className="fl">修改密码</span>
                        <span className="fr icon"><Icon type="right" /></span>
                    </p>

                </div>
                <div className="loginout" onClick={this.loginout.bind(this)}>
                    <Button type="danger" block>
                        退出登录
                     </Button>
                </div>

            </div>
        )
    }
}

export default withRouter(Infor)