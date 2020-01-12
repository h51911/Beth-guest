
import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import { cart } from './api'

import './common/scss/base.css';
import './common/scss/app.scss';
import { connect } from 'react-redux';
import { addgood } from './store/actions/cart';


const Home = lazy(() => import("./pages/Home"));
const Classify = lazy(() => import("./pages/Classify"));
const Cart = lazy(() => import("./pages/Cart"));
const Mine = lazy(() => import("./pages/Mine"));
const Detail = lazy(() => import("./pages/Detail"));
const Suosuo = lazy(() => import("./pages/sousuo"));
const Rag = lazy(() => import("./pages/Rag"));
const Login = lazy(() => import("./pages/Login"));
const Forpass = lazy(() => import("./pages/Forpass"));
const Information = lazy(() => import("./pages/Information"));
const Enterpass = lazy(() => import("./pages/Enterpass"));
const Nick = lazy(() => import("./pages/Nickname "));



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
        this.goto = this.goto.bind(this);
    }


    async componentDidMount() {
        let { history } = this.props;
        let list = this.state.menu.map((item) => {
            if (item.path === history.location.pathname) {
                item.isActive = true
            }
            return item
        })
        this.setState({
            menu: list
        })

        //查询相对应的id大的数据，存入store中
        let uid = sessionStorage.getItem('phone');
        if (uid) {
            let data = await cart.gets({
                uid
            });
            this.props.dispatch(addgood(data.data))
        }

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
        let { cartlist, location } = this.props;
        let { pathname } = location
        return (
            <div className="App">
                {
                    pathname === '/rag' ||
                        pathname === '/login' ||
                        pathname === '/rag' ||
                        pathname === '/forpass' ||
                        pathname === '/enterpass' ||
                        pathname === '/informat' ||
                        pathname === '/nick'
                        ?
                        '' :
                        <div>
                            <div className="navBoos">
                                <ul className="navlistoos "
                                >
                                    {
                                        menu.map((item, index) => {
                                            return <li
                                                className="listboos"
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
                        </div>

                }
                <Suspense fallback={<div>loading...</div>}>
                <Switch>
                        <Route path='/home' component={Home} />
                        <Route path='/classify' component={Classify} />
                        <Route path='/cart' component={Cart} />
                        <Route path='/mine' component={Mine} />
                        <Route path='/sousuo' component={Suosuo} />
                        <Route path='/detail/:gid' component={Detail} />
                        <Route path='/rag' component={Rag} />
                        <Route path='/login' component={Login} />
                        <Route path='/forpass' component={Forpass} />
                        <Route path='/enterpass' component={Enterpass} />
                        <Route path='/informat' component={Information} />
                        <Route path='/nick' component={Nick} />
                        <Redirect from="/" to="/home" exact />

                    </Switch>
                </Suspense>

            </div >
        );

    }
}

const mapStateToProps = function (state) {
    // console.log('state:', state)
    // 需要传递什么数据到组件的props就返回什么
    return {
        cartlist: state.cart.cartlist,
        phone: state.user.phone,
        userphone: state.user.userphone
    }
}
const mapDispatchToProps = dispatch => ({
    dispatch
})
// 函数柯里化
App = connect(mapStateToProps, mapDispatchToProps)(App);//
export default withRouter(App);