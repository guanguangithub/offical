/*
 * @Author: Fairy·yue 
 * @Date: 2019-05-21 20:37:46 
 * @Last Modified by: Fairy·yue
 * @Last Modified time: 2019-05-23 16:16:49
 */
/**
 * 城市定位组件 
 * */
import React, { Component } from 'react';
import cityScss from './city.module.scss'
import { inject, observer} from 'mobx-react' 
import '../../assets/fonts/iconfont.css'
@inject('question')
@observer
class index extends Component {
    constructor(props){
        super(props)
        this.isShowProvince = this.isShowProvince.bind(this)
    }
    render() {
        const { cityList, isShowProvince, provinceList,curCity } = this.props.question
        return (
          <div 
            onClick = {(e)=>this.props.isShowCity(e,'hide')}
            className={this.props.isShow?`${cityScss.city} ${cityScss.show}` : `${cityScss.city}`}>
            <h6 className={cityScss.autoPosition}>自动定位</h6>
            <p 
            className={cityScss.autoCity}>{curCity ? curCity :''}</p>
            <h6 className={cityScss.autoPosition}>省市</h6>
            <ul className={cityScss.cityItem}>
                {
                    cityList.map(item=>{
                        return <li 
                        key={item.CityID}
                        onClick={()=>this.isShowProvince(item.CityID,'show')}
                        >
                            <span>{item.CityName}</span>   
                            <i className="iconfont icon-xiangyou"></i>
                        </li>
                    })
                }
            </ul>
            {/* 省份列表 */}
            <div 
            className={isShowProvince?`${cityScss.provinceMask} ${cityScss.provinceShow}`:cityScss.provinceMask}>
               <p 
               onClick={()=>this.isShowProvince(null,'hide')}
               className={cityScss.left}>
               </p>
               <ul className={cityScss.right}>
                {
                    provinceList.map(item=><li 
                        onClick = {()=>this.isShowProvince(null,'hide',item)}
                        key={item.CityID}>{item.CityName}</li>)
                }
               </ul>
            </div>
        </div>
        );
    }
    isShowProvince(provinceid,type,curCityName){
        this.props.question.toggleProvince({provinceid},type,curCityName)
    }
}

export default index;
