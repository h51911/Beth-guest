import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import { Icon, Button, Input, message } from 'antd';
import '../common/scss/enterpass.scss';
import { my } from '../api';
import Qs from "qs";
class Nick extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nick: ''
        }
        this.goback = this.goback.bind(this);
        this.save = this.save.bind(this);
    }
    goback() {
        this.props.history.goBack();
    }
    async save() {
        let { nick } = this.state;
        let phone = sessionStorage.getItem('phone');
        let str = {
            phone: phone,
            newName: nick
        }
        if (nick && phone) {
            let { data } = await my.chagename('/upname', Qs.stringify(str));
            // console.log(data)
            if(data.code){
                message.success('修改成功');
                this.props.history.goBack();
            }
        } else {

            message.error('昵称不能为空')
        }
    }
    change(e) {
        // console.log(e.target.value)
        let nick = e.target.value.trim()
        this.setState({
            nick
        })

    }
    render() {
        return <div className="nick">
            <div className="enterheader">
                <span className="spaniconss"
                    onClick={this.goback.bind(this)}
                >
                    <Icon type="arrow-left" />
                </span>
                <h1>
                    修改昵称
                </h1>
            </div>
            <div className="nickname">
                <Input placeholder="输入昵称" maxLength={16}
                    onBlur={this.change.bind(this)}
                />
                <p>昵称不超过8个汉字活16个英文字符，支持中阴闻、数字和字符</p>
            </div>
            <div className="save">
                <Button type="primary" block onClick={this.save.bind(this)}>
                    修改
                </Button>
            </div>
        </div>
    }
}
export default Nick;