import React, { Component } from 'react';
import { Input, Button,Icon } from 'antd';
import '../common/css/cs/classify.css'
const { Search } = Input;
class classify extends Component {
    render() {
        return <div className='classify'>
            <div className="box">
                <div className="tex">
                    <Search
                        placeholder="请输入你需要查找的内容"
                        onSearch={value => console.log(value)}
                        style={{ width: 280 }}
                    />
                    <Button type="link">取消</Button>
                </div>

            </div>
            <div className="hot-list">
                <h4>热门搜索</h4>
                <ul>
                    <li>芝士</li>
                    <li>草莓</li>
                    <li>双果小确幸</li>
                    <li>牛乳</li>
                    <li>情</li>
                    <li>生巧</li>
                    <li>泡芙</li>
                    <li>巧克力</li>
                    <li>红丝绒</li>
                </ul>
            </div>
            <div className="hot">
                <h4>最近搜索</h4>
                <p>暂无最近搜索哦</p>
            </div>
            <div className="recommend-list">
                <div className="order">
                    <span className="line"></span>
                    <div className="liner">
                        <span className="icon-star">
                            <Icon type="heart" />
                        </span>
                        <span className="spa">猜你喜欢</span>
                    </div>
                    <span className="line"></span>
                </div>
                <ul>
                    <li>
                        <a href="###"><img src="https://m.21cake.com/upload/images/02c7a2b6b2fbb84c835fe037f3d84b47.jpg" alt="米道" />
                            <h4>米道</h4>
                            <p>￥298<span>/个</span></p>
                        </a>
                    </li>
                    <li>
                        <a href="###"><img src="https://m.21cake.com/goods/1459337079137.jpg" alt="百利甜情人" />
                            <h4>百利甜情人</h4>
                            <p>￥298<span>/盒</span></p>
                        </a>
                    </li>
                    <li>
                        <a href="###"><img src="https://m.21cake.com/upload/images/58c4227141bbcf6efe30b5940267a1a9.jpg" alt="榴莲飘飘" />
                            <h4>榴莲飘飘</h4>
                            <p>￥298<span>/盒</span></p>
                        </a>
                    </li>
                    <li>
                        <a href="###"><img src="https://m.21cake.com/upload/images/22209c54953376c0478b4ac98490f95c.jpg" alt="芒果奶油蛋糕" />
                            <h4>芒果奶油蛋糕</h4>
                            <p>￥198<span>/个</span></p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    }
}

export default classify;