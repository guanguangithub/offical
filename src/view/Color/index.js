import React, { Component } from 'react';
import colorScss from './color.module.scss';
import { inject, observer } from 'mobx-react'
@inject('color')
@observer
class index extends Component {
    state = { 
        curInd :0,
        yearList:[]
    }
    async componentDidMount(){
        this.back2Img = this.back2Img.bind(this)
         //获取 图片列表
         this.SerialID = window.sessionStorage.getItem('2019.official.carInfo')?JSON.parse(window.sessionStorage.getItem('2019.official.carInfo')).carId:'';
         await this.props.color.getColor({SerialID:this.SerialID}) 
         this.setState({
             yearList:Object.keys(this.props.color.colorList).sort((a,b)=>b-a)
         })
         
    }
    render() {
        const { colorList }  = this.props.color
        console.log(colorList)
        const curList = colorList[this.state.yearList[this.state.curInd]]
        return (
            <div className={colorScss.colorWrap}>
                {console.log(this.props.color.colorList)}
                <h4 className={colorScss.title}>全部颜色</h4>
                <h6 className={colorScss.yearList}>
                    {
                        this.state.yearList.map((item,i)=>(
                            <span 
                            className={this.state.curInd===i?colorScss.active:null}
                            onClick={()=>this.setState({curInd:i})}
                            key={i}>{item}</span>
                        ))
                    }
                </h6>
                <ul className={colorScss.colorList}>
                    {   curList?
                        curList.map((item,i)=>{
                            return <li key={i}
                                    onClick ={()=>this.back2Img(item)}
                                        >
                                        <p className={colorScss.colorItem}>
                                            <b style={{background:`${item.Value}`}}></b>
                                            <span>{item.Name}</span>
                                        </p>
                                    </li>
                        }):null
                    }
                  
                </ul>
            </div>
        );
    }
    back2Img(info){
        console.log(info)
      let carInfo =   window.sessionStorage.getItem('2019.official.carInfo')? JSON.parse(window.sessionStorage.getItem('2019.official.carInfo')):[];
      carInfo.ColorId=info.ColorId
      carInfo.ColorValue=info.Value
      carInfo.ColorName = info.Name
      window.sessionStorage.setItem('2019.official.carInfo',JSON.stringify(carInfo))
      this.props.history.push('/picture')

    }
}

export default index;