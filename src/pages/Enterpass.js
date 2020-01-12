import React, { Component } from 'react';
import { Input, Icon, Button, message } from 'antd';
import { my } from '../api';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../common/scss/enterpass.scss';
import Qs from "qs";
class Enterpass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            phone: '',
            password1: '',
            password2: ''
        }
        this.checkpass = this.checkpass.bind(this);
        this.goback = this.goback.bind(this);
        this.checkpasstow = this.checkpasstow.bind(this);
        this.succpass = this.succpass.bind(this)
    }
    checkpass(e) {
        let pass1 = e.target.value.trim();
        this.setState({
            password1: pass1
        })
    }
    checkpasstow(e) {
        let pass2 = e.target.value.trim();
        this.setState({
            password2: pass2
        })
    }
    goback() {
        // let {}
        this.props.history.push('/login');
    }
    async succpass() {
        let { password1, password2 } = this.state;
        let phone = sessionStorage.getItem('phone');
        console.log(this.props)
        if (password1 && password2) {
            if (password2 === password1) {
                let str = {
                    phone: phone,
                    password: password2
                }
                let { data } = await my.puts('/change', Qs.stringify(str));
                // console.log(data)
                if (data.code) {
                    message.success('修改密码成功');
                    this.props.history.goBack();
                }
            } else {
                message.error('密码不相等')
            }
        } else {
            message.error('请输入密码')
        }
    }

    render() {
        console.log(this.props)
        return (

            <div className="enterpass">
                <div className="enterheader">
                    <span className="spaniconss"
                        onClick={this.goback.bind(this)}
                    >
                        <Icon type="arrow-left" />
                    </span>
                    <h1>
                        输入密码
                </h1>

                </div>
                <div className="enterphone">
                    <Input.Password placeholder="输入密码" onBlur={this.checkpass.bind(this)} />
                    <Input.Password placeholder="确认密码" onBlur={this.checkpasstow.bind(this)} />
                </div>
                <div className="entercheck">
                    <Button type="primary" block onClick={this.succpass.bind(this)}>
                        下一步
                </Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    // console.log('state:', state)
    // 需要传递什么数据到组件的props就返回什么
    return {
        number: state.user.userphone,
    }
}

const mapDispatchToProps = dispatch => ({
    dispatch
})
Enterpass = connect(mapStateToProps, mapDispatchToProps)(Enterpass);

export default withRouter(Enterpass)