
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { Form, Icon, Input, Button, Checkbox } from 'antd';
import '../common/scss/rag.scss'
import { my } from '../api';
import { Form, Input, Icon,Checkbox, Button, message } from 'antd';
import Qs from "qs";
import { addphone } from '../store/actions/user';

class Rag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            phone: null,
            password: null,
            phhe: false,
            pache: false,
            sucess: false,
            fai: true,
            check: false
        }
        this.gotoLogin = this.gotoLogin.bind(this);
        this.InputPhone = this.InputPhone.bind(this);
        this.onchage = this.onchage.bind(this);
        this.inputpass = this.inputpass.bind(this)
        this.submited = this.submited.bind(this)


    }
    gotoLogin() {
        this.props.history.push('/login')

    }

    InputPhone = async (event) => {
        let phone = event.target.value.trim();
        let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (!reg.test(phone)) {
            // console.log('请输入正确的手机号')
            message.error('请输入正确的手机号');
            this.setState({
                sucess: false,
                phone
            })
        } else {
            let { data } = await my.get('/check', { phone: phone })
            // console.log(data)
            if (data.code) {
                // message.success('正确');
                this.setState({
                    sucess: true,
                    phone
                })
            } else {
                message.error('手机号码已经注册');
            }

        }
    }
    //同意协议
    onchage(e) {
        if (e.target.checked) {
            this.setState({
                check: true
            })
        } else {
            this.setState({
                check: false
            })
        }
    }
    //密码失去焦点校验
    inputpass(e) {
        let password = e.target.value.trim();
        if (password) {
            // console.log(777)
            this.setState({
                password,
                pache: true
            })

        } else {
            message.error('请输入密码');
            this.setState({
                password,
                pache: false
            })
        }

    }
    //点击注册
    async submited() {
        let { password, phone, check, pache, sucess } = this.state
        // console.log(pache, sucess, check)

        if (!sucess && !pache && !check) {
            return message.error('请输入手机号码密码和统一协议');
        } else if (!sucess && !pache) {
            return message.error('请输入手机号码密码');

        } else if (!pache && !check) {
            return message.error('请输入密码和勾选协议');

        } else if (!sucess) {
            return message.error('请输入正确的手机号');
        } else if (!pache) {
            return message.error('请输入密码');

        } else if (!check) {
            return message.error('请勾选协议');
        } else if (password && phone && check) {
            // console.log(555)
            let str = {
                phone,
                username: phone,
                password,
                src: ''
            }
            let { data } = await my.post('/insert', Qs.stringify(str));
            if (data.code) {
                this.setState({
                    sucess: false,
                    pache: false,
                    check: false
                })
                // console.log(this.props)
                //把注册的号码存在共享里
                this.props.dispatch(addphone(phone));
                // console.log(this.props)
                this.props.history.push('/login');
            } else {
                message.error('注册失败');
                this.setState({
                    phone: '',
                    password: ''
                })
            }

    

        }

    }


    render() {
        let { phone } = this.state
        return (
            <>
                <div className="rag">
                    <div className="ragheader">
                        <span className="spanicon" onClick={this.gotoLogin.bind(this)}>
                            <Icon type="left" />
                        </span>
                        <h1>
                            用户注册
                </h1>

                    </div>
                    <div className="deimg">
                        <img src="http://www.boncake.com.cn/public/images/64/e9/92/27248b5b77f7de2a20d0b3f22f85d488bb42005a.jpg?1577448313#w" alt="" />
                    </div>
                    <Form className="defrom">
                        <Form.Item
                        >
                            <Input prefix={<Icon type="user" className="user" style={{ color: 'rgba(0,0,0,.25)' }} value={phone} />}
                                placeholder="请输入手机号"
                                onBlur={this.InputPhone.bind(this)}
                            // value={phone}

                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请输入密码"
                                onBlur={this.inputpass.bind(this)}
                            />,
                </Form.Item>
                        <Checkbox onClick={this.onchage.bind(this)}>已阅读并同意注册协议</Checkbox>
                        <a className="login-form-forgot" href="">
                            前往登录
                   </a>
                        <Button type="primary" htmlType="submit" className="login-form-button"
                            onClick={this.submited.bind(this)}
                        >
                            注册  </Button>

                    </Form>
                </div >
            </>
        );



    }

}



const mapStateToProps = function (state) {
    // console.log('state:', state)
    // 需要传递什么数据到组件的props就返回什么
    return {
        number: state.user.phone
    }
}
const mapDispatchToProps = dispatch => ({
    dispatch
})
Rag = connect(mapStateToProps, mapDispatchToProps)(Rag);

export default withRouter(Rag);