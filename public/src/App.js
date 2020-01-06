
import React, { Component } from 'react';
// import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import Home from './pages/Home';
import Classify from './pages/Classify';
import Cart from './pages/Cart';
import Mine from './pages/Mine';
import './scss/app.scss'
import 'antd/dist/antd.css';

class App extends Component {
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

  }


  render() {
    let { menu, selectedKeys } = this.state;
    return (
      <div className="App">
        <Menu
          mode="horizontal"
          // onSelect={this.changeMenu}
          selectedKeys={selectedKeys}
          className="menu"
        >
          {
            menu.map(item => {
              return <Menu.Item key={item.path} className="menu">
                {
                  <>
                    <span className="icon">
                      <Icon type={item.icon} />
                    </span>
                    <span className="text">
                      {item.text}
                    </span>

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
    );

  }
}
// function App() {



//   return (
//     <div className="App">

//       <Home />

//     </div>
//   );
// }

export default App;