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
    this.touchEnd = this.touchEnd.bind(this)
    this.showCarType = this.showCarType.bind(this)
    this.getTypeList = this.getTypeList.bind(this)
    this.goDetail = this.goDetail.bind(this)
    this.startY = 0;
    this.moveY = 0;
    this.endY = 0;
    this.toTop=[0]
    this.WordsTop=[]
    this.state={
      ind:0,
      highLight:false
    }
  }
  componentDidMount = async()=>{
    await this.props.brandList.getBrandList()
    for(let j=0;j<this.section.children.length;j++){
      this.toTop.push(this.section.children[j].offsetTop);
    }
    let len = this.props.brandList.brandList.length
    let every = Math.floor(this.navHeight.offsetHeight*2/len)
    this.WordsTop.push(this.navHeight.offsetTop)
    for(let k = 1;k<this.props.brandList.brandList.length;k++){
      this.WordsTop.push(this.navHeight.offsetTop+k*every)
    }
    console.log(this.WordsTop,this.navHeight.offsetTop,'wordsTop')
  }
  render(){
    return (
      <>     
        <section 
         ref={section=>this.section=section}
        >
          {/* {console.log(this.props,'...props')} */}
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
          onTouchEnd={this.touchEnd}
          ref={navHeight=>this.navHeight=navHeight}
        >
          {this.props.brandList.brandList.map((item,i)=>(
            <span key={item.title} >{item.title}</span>
          ))}
         </div>
        {this.props.brandList.homeLoad?null:<Loading></Loading>}  
        {/* 车型列表 */}
        <TypeList 
          isShow={this.props.brandList.isShow}
          carTypes = {this.props.brandList.carTypes}
          cancel = {this.cancel}
          showCarType = {this.showCarType}
          goDetail = { this.goDetail }
          />
          {/* 高亮title */}
         
          <div className={this.state.highLight?`${HomeScss.highLight} ${HomeScss.highLightIn}` :HomeScss.highLight}>
            {
              this.props.brandList.brandList[this.state.ind]?
              this.props.brandList.brandList[this.state.ind].title
              :null
              // console.log(this.props.brandList.brandList[this.ind],this.ind)
            }
          </div>
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
    this.props.brandList.getCarType({MasterID:val})
  }
  touchStart(e){
    this.startY = e.touches[0].pageY
    // console.log(this.startY*2,'startY') 
    this.setState({
      highLight:true
    }) 

  } 
  touchMove(e){
    this.touchMoveY = e.touches[0].pageY
      for(let i=0;i<this.WordsTop.length-1;i++){
        if(this.touchMoveY*2>this.WordsTop[i]&&this.touchMoveY*2<this.WordsTop[i+1]){
            // this.ind = i+1    
            this.setState({
              ind:i+1
            })    
        }
    }
    this.section.scrollTop=this.toTop[this.state.ind];
  } 
  touchEnd(e){
    for(let i=0;i<this.WordsTop.length-1;i++){
      if(this.startY*2>this.WordsTop[i]&&this.startY*2<this.WordsTop[i+1]){
            // this.ind =i+2  
            this.setState({
              ind:i+2
            })    
        }
    }
    this.section.scrollTop=this.toTop[this.state.ind];
    this.setState({
      highLight:false
    })
  }
  //控制侧边栏
  //跳转汽车详情
  goDetail(carInfo){
    console.log(carInfo,'carIndo....')
    let newCarInfo = {
      AliasName:carInfo.AliasName,
      carId:carInfo.SerialID,
      CoverPhoto:carInfo.Picture,
      ColorName:'',
      ColorId:''
    }
    window.sessionStorage.setItem('2019.official.carInfo',JSON.stringify(newCarInfo))
    this.props.history.push(`/car/${carInfo.SerialID}`) 
  }
    
}
export default Home
