import React, { Component } from 'react';
import { Input, Icon, Button, message } from 'antd';
import { my } from '../api';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../common/scss/forpass.scss';
import { adduserphone } from '../store/actions/user';


class Forpass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            phone: ''
        }
        this.checkphone = this.checkphone.bind(this);
        this.nextPhone = this.nextPhone.bind(this)
    }
    checkphone(e) {
        let phone = e.target.value.trim();
        let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(phone)) {
            this.setState({
                phone: phone
            })

        } else {
            message.error('请输入正确的手机号')
        }
    }

    async nextPhone() {
        let { phone } = this.state;
        if (phone) {
            let { data } = await my.get('/LoginPhone', { phone: phone })
            if (data.code) {

                sessionStorage.setItem('phone', phone)
                this.props.dispatch(adduserphone(phone));
                this.props.history.push('/enterpass', phone);
            } else {
                message.error('该账号不存在请检查');
            }
        } else {
            message.error('请输入手机号');
        }

    }

    render() {
        return (<div className="fompass">
            <div className="forheader">
                <span className="spanicons"
                >
                    <Icon type="arrow-left" />
                </span>
                <h1>
                    忘记密码
                </h1>

            </div>
            <div className="forphone">
                <Input placeholder="输入手机号码" onBlur={this.checkphone.bind(this)} />
            </div>
            <div className="nextfor">
                <Button type="primary" block onClick={this.nextPhone.bind(this)}>
                    下一步
                </Button>
            </div>
        </div>)
    }

}



const mapStateToProps = function (state) {
    console.log('state:', state)
    // 需要传递什么数据到组件的props就返回什么
    return {
        number: state.user.userphone,
    }
}

const mapDispatchToProps = dispatch => ({
    dispatch
})

Forpass = connect(mapStateToProps, mapDispatchToProps)(Forpass);

export default withRouter(Forpass)