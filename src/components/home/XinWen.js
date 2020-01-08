import React from 'react';
import { Button   } from 'antd';
import '../../common/css/cs/xinwen.css'
function XinWen() {
    return (
        <div className="xinwen">
            <div className='tongzhi'>
                <Button type="primary">通知</Button>
                <p>贝思客官方申明：我司近期发现有客户通过非正常渠道售卖的代金卡无法正常使用，目前我司正通过法律途径解决此问题。我司在此郑重申明，从未授权过任何渠道售卖我司代金卡，请客户通过正常渠道（如：官网、公司销售）进行购买消费。？</p>
            </div>
        </div>
    )
}

export default XinWen;