/*
 * @Author: Fairy·yue 
 * @Date: 2019-05-21 20:35:38 
 * @Last Modified by: Fairy·yue
 * @Last Modified time: 2019-05-21 20:36:32
 */
/**
 * 某个牌子的车的车型列表
 */
import React from 'react'
import TypeListScss from './type.module.scss'
class TypeList extends React.Component{
  constructor(){
    super()
    this.carTouchStart = this.carTouchStart.bind(this)
    this.carTouchMove = this.carTouchMove.bind(this)
    this.carTouchEnd = this.carTouchEnd.bind(this)
  }
  render(){
    return (
      <div 
      className={this.props.isShow?`${TypeListScss.list} ${TypeListScss.easeIn}`:TypeListScss.list}
      ref={list=>this.list=list}
      onTouchStart = {this.carTouchStart}
      onTouchMove = {this.carTouchMove}
      onTouchEnd = {this.carTouchEnd}
      >
      
        {/* {console.log(this.props.carTypes)} */}
         { this.props.carTypes.map(item=>(
            <div className={TypeListScss.TypeGroup}
             key={item.GroupId}>
              <h5>{item.GroupName}</h5>
              <ul>
                {  
                  item.GroupList.map(val=>(
                    <li key={val.SerialID}
                    onClick = {()=>this.props.goDetail(val)}
                    className={TypeListScss.typeLi}
                    >
                     <img className={TypeListScss.brandlogo} src={val.Picture} alt=""/>
                     <p className={TypeListScss.brandInfo}>
                      <span>{val.AliasName}</span> 
                      <b>{val.DealerPrice}</b>
                     </p>
                    </li>
                  ))
                }
              </ul>
            </div>
           ))
         }
      </div>
    )
  }
  carTouchStart(e){ 
    // console.log(e ,'eeeee')
    // e.preventDefault()
    let x = e.touches[0].pageX;
    this.startX = x
    // console.log(this.list.offsetLeft)
    this.oL = this.list.offsetLeft;
    this.tL = x - this.oL ;
    // console.log(x,this.startX,this.oL,this.tL,'iiiiii')
  }
  carTouchMove(e){ 
    // console.log(e.touches[0].pageX ,'moveeee')
    // e.preventDefault()
    this.movex = Number(e.touches[0].pageX)
    this.list.style.right=(-(this.movex-this.tL))+'px'
  }
  carTouchEnd(e){
    // this.list.style.right="-80%"
    let width = this.list.offsetWidth
    let endX = this.startX-this.movex
    // console.log(endX,'endX')

    if (Math.abs(endX) > width / 2  ) { //当滑动的距离大于1/3时
      // console.log(endX,'endsss')
      if (endX < 0) {
        this.list.style=""
        this.props.cancel()
       }else{
        this.list.style =""
        this.props.showCarType()
       }

    }else{
      this.list.style =""
      this.props.showCarType()
    }
    
    // console.log(this.props)
 
  }

}
export default TypeList