import React from 'react';
import Loading from '../../components/Loading'
import HomeScss from '../../scss/home.module.scss'
import { inject, observer } from 'mobx-react'
import TypeList from '../../components/TypeList'
@inject('brandList',)
@observer
class Home extends React.Component{
  constructor(){
    super()
    this.touchStart = this.touchStart.bind(this)
    this.touchMove = this.touchMove.bind(this)
    this.cancel = this.cancel.bind(this)
    // this.touchEnd = this.touchEnd.bind(this)
    this.touchTo = this.touchTo.bind(this)
    this.showCarType = this.showCarType.bind(this)
    this.getTypeList = this.getTypeList.bind(this)
    this.startY = 0;
    this.moveY = 0;
    this.endY = 0;
    this.toTop=[0]
    this.WordsTop=[]
    // console.log(this.height)
    // this.
  }
  componentDidMount = async()=>{
    await this.props.brandList.getBrandList()
    for(let j=0;j<this.section.children.length;j++){
      this.toTop.push(this.section.children[j].offsetTop);
    }
    let len = this.props.brandList.brandList.length+1
    let every = this.navHeight.offsetHeight/len
    this.WordsTop.push(this.navHeight.offsetTop)
    for(let k = 0;k<this.props.brandList.brandList.length;k++){
      this.WordsTop.push(this.navHeight.offsetTop+(k+1)*every)
    }
console.log(this.WordsTop,'wordsTop')
  }
  render(){
    return (
      <>     
        <section 
         ref={section=>this.section=section}
        >
          {console.log(this.props,'...props')}
         { this.props.brandList.brandList.map(item=>(
            <div className={HomeScss.listGroup} key={item.title}>
              <h5>{item.title}</h5>
              <ul>
                {
                  item.list.map(val=>(
                    <li key={val.MasterID}
                    onTouchStart={()=>this.getTypeList(val.MasterID)}
                    >
                      <img className={HomeScss.brandlogo} src={val.CoverPhoto} alt=""/>
                      <span className={HomeScss.brandName}>{val.Name}</span> 
                    </li>
                  ))
                }
              </ul>
            </div>
           ))
         }
        </section>
        <div className={HomeScss.nav}
          onTouchStart={this.touchStart}
          onTouchMove={this.touchMove}
          // onTouchEnd={()=>this.touchEnd()}
          ref={navHeight=>this.navHeight=navHeight}
        >
          <span>#</span>
          {this.props.brandList.brandList.map((item,i)=>(
            <span key={item.title} onTouchEnd={()=>this.touchTo(item.title,i)}>{item.title}</span>
          ))}
         </div>
        {this.props.brandList.homeLoad?null:<Loading></Loading>}  
        {/* 车型列表 */}
       <TypeList 
        isShow={this.props.brandList.isShow}
        carTypes = {this.props.brandList.carTypes}
        cancel = {this.cancel}
        showCarType = {this.showCarType}
        />
      </>
    )
  }
  //收起侧边栏
  cancel(){
    this.props.brandList.cancel()
  }
  //展出侧边栏
  showCarType(){
    this.props.brandList.showType()
  }
  //弹出车型列表
  getTypeList(val){
    console.log(this.props.brandList.carTypes,'list')
    this.props.brandList.getCarType({MasterID:val})
    
  }
  //楼层点击事件
  touchTo(title,i){
    // console.log(this.moveY,'888888')
    // for(let k=0;i<this.toTop.length;k++){ 
    //   if(this.moveY<=this.toTop[k+1]&&this.moveY>=this.toTop[k]){
          this.section.scrollTop=this.toTop[i+1];
    //     }
   
    // } 
  }
  touchStart(e){
    console.log(this)
    this.startY = e.touches[0].pageY
    console.log(this.startY*2,'startY')  
  } 
  touchMove(e){
    this.touchMoveY = e.touches[0].pageY
    console.log(this.touchMoveY,'moveY')  
    this.WordsTop.forEach((item,i)=>{
      if(this.touchMoveY>item){}
    })
  } 
  
  //控制侧边栏
 
}
export default Home
