import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../common/scss/login.scss'
import { my } from '../api';
import { Input, Form, Checkbox, Button, message } from 'antd'
import Qs from "qs";
import { adduserphone, addtoken } from '../store/actions/user';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            phone: '',
            password: ''
        }
        this.Pass = this.Pass.bind(this);
        this.Phoncheck = this.Phoncheck.bind(this);
        this.check = this.check.bind(this);
        this.Login = this.Login.bind(this);
        this.gotoforpass = this.gotoforpass.bind(this);
        this.gotorag = this.gotorag.bind(this)
    }

    componentDidMount() {
        let number = this.props.number;
        if (number) {
            this.setState({
                phone: number
            })
        }
    }
    gotorag() {
        this.props.history.push('/rag');
    }
    Pass(e) {
        this.setState({
            password: e.target.value.trim()
        })
    }
    async Phoncheck(e) {
        let phone = e.target.value.trim();
        let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(phone)) {
            let { data } = await my.get('/LoginPhone', { phone: phone })
            if (data.code) {
                this.setState({
                    phone: phone
                })

            } else {
                message.error('手机号码没有注册')
            }
        } else {
            message.error('请输入正确的手机号')
        }

    }
    check(e) {
        let newcheck = e.target.checked
        if (newcheck) {
            this.setState({
                checked: newcheck
            })
        } else {
            this.setState({
                checked: newcheck
            })
        }
    }
    gotoforpass() {
        this.props.history.push('/forpass');
    }
    async Login() {
        let { password, phone, checked } = this.state;
        if (password && phone) {
            let logindata = {
                phone: phone,
                password: password,
                keep: checked
            }
            let { data } = await my.post('/login', Qs.stringify(logindata));
            if (data.code) {
                localStorage.setItem("author", data.authorization);
                sessionStorage.setItem('phone', phone)
                this.props.dispatch(adduserphone(phone));
                this.props.dispatch(addtoken(data.authorization));
                this.props.history.push('/home');

            } else {
                message.error('登录失败')
            }
        } else {
            message.error('请输入手机号和密码！')
        }
    }


    render() {
        return <div className="Login">
            <h1>用户登录</h1>
            <div className="loginImg">
                <img src="http://www.boncake.com.cn/public/images/64/e9/92/27248b5b77f7de2a20d0b3f22f85d488bb42005a.jpg?1577448313#w" alt="" />
            </div>
            <div className="inputLogin">
                <Input placeholder="请输入手机号" onBlur={this.Phoncheck.bind(this)} />
                <Input.Password placeholder="请输入密码" onBlur={this.Pass.bind(this)} />
            </div>
            <div className="LoginBut">
                <Form.Item>
                    <Checkbox onChange={this.check.bind(this)}>记住密码</Checkbox>
                    <span className="login-form-forgot" onClick={this.gotoforpass.bind(this)}>
                        忘记密码
                    </span>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                        onClick={this.Login.bind(this)}
                    >
                        登录
                     </Button>

                </Form.Item>
                <span className="login-form-forgot" onClick={this.gotorag.bind(this)}>
                    点击注册
                    </span>
            </div>

        </div >
    }
}
const mapStateToProps = function (state) {
    console.log('state:', state)
    // 需要传递什么数据到组件的props就返回什么
    return {
        number: state.user.userphone,
        token: state.user.token
    }
}
const mapDispatchToProps = dispatch => ({
    dispatch
})

Login = connect(mapStateToProps, mapDispatchToProps)(Login);


export default withRouter(Login)