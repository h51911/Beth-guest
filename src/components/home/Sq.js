import React from 'react';

import '../../common/css/cs/sq.css'
function Sq() {
    return (
        <div className="sq">
            <img src='http://mcake.oss-cn-hangzhou.aliyuncs.com/file/88c030c0ee06810d/c054ea15913084b6.jpg' alt="" />
            <div className="list">
                <ul className="run">
                    <li>
                        <img src='https://res.bestcake.com/images/new-index/p/%E6%B4%9B%E5%8F%AF%E5%8F%AF%E7%94%9C%E5%BF%83.png' alt="" />
                        <span>洛可可甜心</span>
                        <p>￥389<span>/个</span></p>
                    </li>
                    <li>
                        <img src='https://res.bestcake.com/images/new-index/p/%E8%8E%B1%E8%8C%B5%E6%B2%B3%E8%8E%93%E5%A6%96%E7%B2%BE.png' alt="" />
                        <span>莱茵河莓妖精</span>
                        <p>￥218<span>/个</span></p>
                    </li>
                    <li>
                        <img src='https://res.bestcake.com/images/new-index/p/%E8%8D%89%E8%8E%93%E6%8B%BF%E7%A0%B4%E4%BB%91.png' alt="" />
                        <span>草莓拿破仑</span>
                        <p>￥218<span>/个</span></p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Sq;