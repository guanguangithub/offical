/*
 * @Author: Fairy·yue 
 * @Date: 2019-05-21 20:31:44 
 * @Last Modified by: Fairy·yue
 * @Last Modified time: 2019-05-21 20:33:51
 */
/**
 * 车型列表单个组件
 */
import React, { Component } from 'react';
import patternScss from './pattern.module.scss'
class index extends Component {
    state = {  }
    render() {
        const { item, ind } = this.props
        return (
            <div 
            onClick = {()=>this.props.handleGoQuestion(ind)}
            className={patternScss.pattern}>
                {item.hide?null:
                    <h6>{item.exhaust_str}/{item.max_power_str} {item.inhale_type}</h6>
                }
                <dl>
                    <dt>
                        <p className={patternScss.patternYear}>{item.market_attribute.year}款 {item.car_name}</p>
                        <span className={patternScss.horsepower}>{item.horse_power}马力{item.gear_num}档{item.trans_type}</span>
                        <p className={patternScss.lowPrice}><span>指导价 {item.market_attribute.official_refer_price}</span> <b>{item.market_attribute.dealer_price_min}</b></p>
                    </dt>
                    <dd>询问底价</dd>
                </dl>
            </div>
        );
    }
}

export default index;