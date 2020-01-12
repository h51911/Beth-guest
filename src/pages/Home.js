
import React, { Component } from 'react';
import { Icon, Input } from 'antd';

import Lunbo from '../components/home/Luobo';
import FenLei from '../components/home/FenLei';
import XinWen from '../components/home/XinWen';
import Tu from '../components/home/Tu';
import Sq from '../components/home/Sq';
import Xiao from '../components/home/Xiao';
import Bing from '../components/home/Bing';

import '../common/css/cs/home.css'
const { Search } = Input;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.gosuo = this.gosuo.bind(this)
    }
    gosuo() {
        this.props.history.push('/sousuo')
    }

    render() {
        return (
            <div className="home">
                <div className="head">
                    <div className="head-left">
                        <a href="###">
                            <Icon type="star" />
                            <span>上海</span>
                        </a>
                    </div>
                    <div className="box-search" onClick={this.gosuo.bind(this)}>
                        <Search
                            placeholder="请输入你需要查找的内容"
                            onSearch={value => console.log(value)}
                            style={{ width: 220 }}
                        />
                    </div>
                    <div className="head-right">
                        <p>
                            <Icon type="customer-service" />
                        </p>
                    </div>
                </div>
                <Lunbo />
                <FenLei />
                <XinWen />
                <Tu />
                <Sq />
                <Xiao />
                <Bing />
            </div>
        );
    }
}

export default Home;