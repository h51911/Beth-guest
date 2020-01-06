import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

// import { connect } from 'react-redux';

import { Menu, Icon, Badge } from 'antd';

import Home from './Home';
import Classify from './Classify';
import Cart from './Cart';
import Mine from './Mine';

import 'antd/dist/antd.css';
class Bekesi extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedKeys: ['/home'],
            menu: [{
                name: 'home',
                path: '/home',
                text: '首页',
                icon: 'home'
            }, {
                name: 'classify',
                path: '/classify',
                text: '分类',
                icon: 'compass'
            }, {
                name: 'cart',
                path: '/cart',
                text: '购物车',
                icon: 'shopping-cart'
            },
            {
                name: 'mine',
                path: '/mine',
                text: '我的',
                icon: 'shopping-cart'
            }
            ]
        }

        // this.changeMenu = this.changeMenu.bind(this);
        // this.goto = this.goto.bind(this);
        // this.goto = this.callback.bind(this);
    }

    // callback(key) {
    //   console.log(key);
    // }
    // changeMenu(current) {
    //     let { key } = current;

    //     this.props.history.push(key);

    //     this.setState({
    //         selectedKeys: [key]
    //     })
    // }

    render() {
        let { menu, selectedKeys } = this.state;
        // let { cartlist } = this.props;
        return <div className="App">
            <Menu
                mode="horizontal"
                // onSelect={this.changeMenu}
                selectedKeys={selectedKeys}
                theme="dark"
            >
                {
                    menu.map(item => {
                        return <Menu.Item key={item.path}>
                            {
                                item.name === 'cart' ?
                                    <Badge>
                                        <Icon type={item.icon} />
                                        {item.text}
                                    </Badge>
                                    :
                                    <>
                                        <Icon type={item.icon} />
                                        {item.text}
                                    </>
                            }
                        </Menu.Item>
                    })
                }
            </Menu>

            <Switch>
                <Route path='/home' component={Home} />
                <Route path='/classify' component={Classify} />
                <Route path='/cart' component={Cart} />
                <Route path='/mine' component={Mine} />
                <Redirect from="/" to="/home" exact />
            </Switch>

        </div >
    }

}

// 高阶组件
// Bekesi = withRouter(Bekesi)
export default Bekesi;