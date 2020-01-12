
import React, { Component } from 'react';
import { Icon } from 'antd';
import '../common/scss/classify.scss';
import { good } from '../api';
import Selegood from '../components/select ';
class classify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIdx: 0,//高亮索引值
            activeKey: '',
            isok: false,
            // dis: false,
            menu: [
                {
                    name: '经典',
                    isActive: true
                },
                {
                    name: '女神',
                    isActive: false
                },
                {
                    name: '西点',
                    isActive: false
                },
                {
                    name: '全球购',
                    isActive: false
                },
                {
                    name: '零食',
                    isActive: false
                },
                {
                    name: '其他',
                    isActive: false
                }
            ],
            datalist: [],
            list: []


        }
        this.chanck = this.chanck.bind(this);
        this.goto = this.goto.bind(this);
        this.open = this.open.bind(this);
        this.choice = this.choice.bind(this);
        this.gotoRag = this.gotoRag.bind(this);

    }

    //点击切换相对应的内容
    async chanck(name) {
        let arr = this.state.menu.map((item) => {
            if (item.name === name) {
                item.isActive = true;

            } else {
                item.isActive = false;
            }
            return item
        })
        let newdata = await good.get({
            classify: name
        });


        this.setState({
            menu: arr,
            datalist: newdata.data
        })
    }
    //获取最新的经典内容
    async componentDidMount() {
        let { data } = await good.get({
            classify: "经典"
        });
        this.setState({
            datalist: data

        });
    }
    //点击相应的内容跳到详情页
    goto(gid, adr) {
        this.props.history.push(adr + gid)

    }
    gotoRag() {
        this.props.history.push('/rag')

    }
    // 点击出现数量的加减
    choice(str) {
        let strnew = null;
        if (this.state.isok === str) {
            strnew = true;
        } else {
            strnew = false;
        }
        this.setState({
            isok: strnew
        })
    }


    async open(str, gid, ev) {
        ev.stopPropagation();
        // console.log(str, gid)
        let { data } = await good.get({
            gid
        });
        let strnew = null;
        if (this.state.isok === str) {
            strnew = true;
        } else {
            strnew = false;
        }

        // console.log(data)
        this.setState({
            isok: strnew,
            list: data[0]
        })
    }
    render() {
        let { menu, datalist, isok, list } = this.state;
        // console.log(list)
        return <div className="classify">
            <div className="deheader">
                <h2 className="title" onClick={this.gotoRag.bind(this)}>分类</h2>
                {/* 导航分类 */}
                <ul className="sort_list clearfix">
                    {
                        menu.map((item, index) => {
                            return <li
                                className={item.isActive ? 'goodlist fl active' : 'goodlist fl'}
                                onClick={this.chanck.bind(this, item.name)}
                                key={index}
                            >{item.name}</li>

                        })
                    }
                </ul>
            </div>

            <div className="classCon">
                <ul className="clearfix">
                    {
                        datalist.map((item, index) => {
                            return <li className="fl goods"
                                key={item.gid}
                                onClick={this.goto.bind(this, item.gid, '/detail/')}
                            >
                                <img src={item.src} alt={item.title}></img>
                                <h4>{item.title}</h4>
                                <p className="clearfix">
                                    <span className="fl price"><i>￥</i>{item.price}
                                        <i className="ge">/个</i>
                                    </span>
                                    <span className="fr icon"
                                        onClick={this.open.bind(this, false, item.gid)}
                                    >
                                        <Icon type="shopping-cart"></Icon>
                                    </span>
                                </p>
                            </li>
                        })
                    }

                </ul>
            </div>
            <div className="goodchoce">
                {
                    isok ? <Selegood
                        goodData={list}
                        choice={this.choice.bind(this)}
                    ></Selegood> : ''
                }

            </div>
        </div >
    }
}

export default classify;