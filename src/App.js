
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import { cart } from './api'

import Home from './pages/Home';
import Classify from './pages/classify';
import Cart from './pages/Cart';
import Mine from './pages/Mine';
import Detail from './pages/Detail';
import Suosuo from './pages/sousuo';


import './common/scss/base.css';
import './common/scss/app.scss';
import 'antd/dist/antd.css';

import { connect } from 'react-redux';
// import store from './store';

import { addgood } from './store/actions/cart';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedks: ['/home'],
            isActive: false,
            menu: [{
                name: 'home',
                path: '/home',
                text: '首页',
                icon: 'home',
                active: false
            }, {
                name: 'classify',
                path: '/classify',
                text: '分类',
                icon: 'appstore',
                active: false
            }, {
                name: 'cart',
                path: '/cart',
                text: '购物车',
                icon: 'shopping-cart',
                active: false
            },
            {
                name: 'mine',
                path: '/mine',
                text: '我的',
                icon: 'user',
                active: false
            }
            ]
        }
        this.changeMenu = this.changeMenu.bind(this);
        this.goto = this.goto.bind(this);
    }

    changeMenu(current) {
        let { key } = current;
        console.log(key);

    }
    async componentDidMount() {
        // console.log(this.props);
        let { history } = this.props;
        let list = this.state.menu.map((item, index) => {
            if (item.path === history.location.pathname) {
                item.isActive = true
            }
            return item
        })
        this.setState({
            menu: list
        })

        //查询相对应的id大的数据，存入store中
        let uid = 123
        let data = await cart.gets({
            uid
        });
        // console.log(data)
        this.props.dispatch(addgood(data.data))
    }
    componentDidUpdate(prevProps, nextProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            var list = this.state.menu.map((item) => {
                if (this.props.location.pathname !== item.path) {
                    item.isActive = false
                }
                return item
            })
            this.setState({
                menu: list
            })
        }

    }
    goto(path, idx) {
        this.props.history.push(path)
        let list = this.state.menu.map((item, index) => {
            if (index === idx) {
                item.isActive = true
            }
            return item
        })
        this.setState({
            menu: list
        })
    }

    render() {
        let { menu } = this.state;
        // console.log(this.props);
        let { cartlist } = this.props;
        // console.log(cartlist)
        return (
            <div className="App">

                <div className="nav">
                    <ul className="navlist "
                    >
                        {
                            menu.map((item, index) => {
                                return <li
                                    className="list"
                                    key={item.path}
                                    onClick={this.goto.bind(this, item.path, index)}
                                    style={item.isActive ? { color: '#63c6cb' } : {}}
                                >

                                    <span className="icon">
                                        <Icon type={item.icon} />
                                    </span>

                                    {item.text}</li>
                            })

                        }

                    </ul>
                </div>
                {
                    cartlist.length ? <div className="yuan">
                        {
                            cartlist.length
                        }
                    </div> : ''
                }


                <Switch>
                    <Route path='/home' component={Home} />
                    <Route path='/classify' component={Classify} />
                    <Route path='/cart' component={Cart} />
                    <Route path='/mine' component={Mine} />
                    <Route path='/sousuo' component={Suosuo} />
                    <Route path='/detail/:gid' component={Detail} />
                    <Redirect from="/" to="/home" exact />

                </Switch>
            </div >
        );

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
// 函数柯里化
App = connect(mapStateToProps, mapDispatchToProps)(App);//
// Goods = connect(mapStateToProps, mapDispatchToProps)(Goods);

export default withRouter(App);