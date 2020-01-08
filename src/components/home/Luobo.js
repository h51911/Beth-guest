import React from 'react';
import { Carousel, Icon } from 'antd';
import '../../common/css/cs/lunbo.css'
function Lunbo() {
    return (
        <div className="lunbo">
            <Carousel autoplay>
                <div>
                    <img src="https://res.bestcake.com/m-images/banner_new/dalibaoPc.jpg?v=2" alt="" />
                </div>

                <div>
                    <img src="https://res.bestcake.com/m-images/banner_list/366895504692554800.jpg" alt="" />
                </div>

                <div>
                    <img src="https://res.bestcake.com/m-images/banner_list/774523726234970200.jpg" alt="" />
                </div>

                <div>
                    <img src="https://res.bestcake.com/m-images/banner_list/176760544596537440.jpg" alt="" />
                </div>

            </Carousel>
            <div className="jj">
                <ul>
                    <li>
                        <Icon type="check" /> 严选新鲜优质源料
                    </li>
                    <li>
                        <Icon type="check" /> 自有冷链配送
                    </li>
                    <li>
                        <Icon type="check" />甄选全球好货
                    </li>
                </ul>
            </div>
            <div className="tu">
                <img src="https://res.bestcake.com/m-images/banner_list/176760544596537440.jpg" alt="" />
            </div>
        </div>

    );
}

export default Lunbo;