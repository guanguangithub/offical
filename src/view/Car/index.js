import React from 'react'
import CarScss from './car.module.scss'
import { inject, observer } from 'mobx-react'
import Loading from '../../components/Loading'
import Pattern from '../../components/pattern'
@inject('carDetail')
@observer
class Car extends React.Component {
  constructor(){
    super()
    this.state = {
      curInd :0
    }
    this.handleGoQuestion = this.handleGoQuestion.bind(this)
    this.handletabYears = this.handletabYears.bind(this)

  }
  componentDidMount = async()=>{
    let id = this.props.match.params.id
    await this.props.carDetail.getDetailInfo({
      SerialID:id
    })
  }
  render(){
    const { detailInfo } = this.props.carDetail
    return (
      <div className={CarScss.car}>
          <section className={CarScss.carmain}>
              {/* 当前车型信息展示 */}
              <div className={CarScss.curCar}>
                <div className={CarScss.curCarImg}>
                  <img src={detailInfo.CoverPhoto} alt=""/>
                  <span className={CarScss.imgCount}>{detailInfo.pic_group_count}张照片</span>
                </div>  
                <div className={CarScss.curCarInfo}>
                  <p className={CarScss.price}>
                    <span>{this.props.carDetail.isLoaded?null:this.props.carDetail.detailInfo['market_attribute']['dealer_price']}</span>
                    <b>{this.props.carDetail.isLoaded?null:`指导价 ${this.props.carDetail.detailInfo['market_attribute']['official_refer_price']}`}</b>
                  </p>
                  <button className={CarScss.askPrice}>询问底价</button>
                </div>
              </div>
              <div className={CarScss.carType}>
              {/* tab筛选 */}
                <div className={CarScss.filterTab}>
                    {/* <span className={CarScss.active}>全部</span>
                    <span>2019</span> */}
                    {
                      // this.props.
                      // console.log(this.props.carDetail.years.length,'kk')
                      this.props.carDetail.years.map((item,i)=>(
                        <span
                        className = {this.state.curInd===i?CarScss.active:null}
                        onClick = {()=>this.handletabYears(i)}
                        key={i}>{item}</span>
                      ))
                    }
                </div>
                {/* 款型列表 */}
                {
                  this.props.carDetail.isLoaded?
                  null
                  :
                  detailInfo.list.map((item,i)=>{
                    return <Pattern item={item} key={item.car_id} ind={i} handleGoQuestion={this.handleGoQuestion}></Pattern>
                  })
                }
              </div>
              
          </section>
          <footer 
          onClick={()=>this.handleGoQuestion(0)}
          className={CarScss.footer}>
            <p>询问底价</p>
            <span>本地经销商为你报价</span>
          </footer>
        {this.props.carDetail.isLoaded?<Loading></Loading>:null}
      </div>
    )
  }
  //tab切换
  handletabYears(i){
    this.setState({
      curInd:i
    })
    this.props.carDetail.filterByYear(i)
  }
  //跳转到询价页
  handleGoQuestion(ind){
    console.log(this)
    let list = this.props.carDetail.detailInfo.list;
    let Defid = list[ind].car_id
    window.sessionStorage.setItem('2019.offical.curId',JSON.stringify(Defid))
    window.sessionStorage.setItem('2019.offical.typeList',JSON.stringify(list))
    this.props.history.push('/question')
  }
}
export default Car