/*
 * @Author: Fairy·yue 
 * @Date: 2019-05-22 17:19:44 
 * @Last Modified by: Fairy·yue
 * @Last Modified time: 2019-05-23 08:35:53
 */

/***
 *  获取当地经销商列表 
 */

import React, { Component } from 'react';
import dealerScss from './dealer.module.scss'
import { inject, observer} from 'mobx-react'
@inject('question')
@observer
class index extends Component {
    constructor(props){
        super(props)
        this.state = {
            dealerList:this.props.dealerList,
            choosenList : [],
        }
    }
    render() {
        const { dealerList }  = this.props
        return (
        <ul className={dealerScss.dealer}>
            {console.log(dealerList,'...dealerList')}
            {dealerList.map((item,i)=>(
                <li 
                key={item.dealerId  }
                className={dealerScss.dealerItem}>
                    <p 
                    onClick={()=>this.isChoosen(item,i)}
                    className={dealerScss.radio}>
                        <span className={item.isChoosen?dealerScss.yes:null}></span>
                    </p>
                    <div>
                        <p className={dealerScss.dealerName}>
                            <span>
                            {item.dealerShortName}
                            </span>
                            <span className={dealerScss.price}>
                                {item.promotePrice}万
                            </span>
                        </p>
                        <p className={dealerScss.dealerRange}>
                            <span>{item.address}</span>
                            <span>售{item.saleRange}</span>
                        </p>
                    </div>
                </li>  
            ))}
           
        </ul>
            
        );
    }
    //当前经销商是否被选中
    isChoosen(curDealer,ind){
        // console.log(curDealer,'ppp')

      this.props.question.isChoosenDealer(ind)
      let repeatInd = this.state.choosenList.findIndex(item=>item.dealerId===curDealer.dealerId)
        if(repeatInd===-1){
            this.state.choosenList.push(curDealer)
        }else{
            this.state.choosenList.splice(repeatInd,1)
        }
    }
}

export default index;