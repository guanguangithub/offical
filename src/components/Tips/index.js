/*
 * @Author: Fairy·yue 
 * @Date: 2019-05-21 20:34:59 
 * @Last Modified by: Fairy·yue
 * @Last Modified time: 2019-05-21 20:35:23
 */
/**
 * 小提示组件  
 */
import React, { Component } from 'react';
import tipScss from './tip.module.scss'
class index extends Component {
    render() {
        const { isTipsShow,closeTip }  = this.props
        console.log(this.props)
        return (
            <div 
            onClick = {()=>closeTip()}
            className={isTipsShow?`${tipScss.wrap} ${tipScss.tipsShow}`:tipScss.wrap}>
                <div className={isTipsShow?`${tipScss.tipsShow} ${tipScss.tips}`:`${tipScss.tips}`}>
                    <div className={tipScss.tipImg}>
                        <dl>
                            <dt><img src="https://h5.chelun.com/2017/official/img/q-l.png" alt=""/></dt>
                            <dd>高效安全</dd>
                        </dl>
                        <dl>
                            <dt><img src="https://h5.chelun.com/2017/official/img/q-m.png" alt=""/></dt>
                            <dd>省心省力</dd>
                        </dl>
                        <dl>
                            <dt><img src="https://h5.chelun.com/2017/official/img/q-r.png" alt=""/></dt>
                            <dd>贴心服务</dd>
                        </dl>
                    </div>
                    <ul>
                        <li>私人信息严格保密,最新报价立等可取</li>
                        <li>足不出户,提交即可获得更多经销商的最低价格</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default index;