import React, { Component } from 'react';
import quesScss from './question.module.scss'
import '../../assets/fonts/iconfont.css'
import Tips from '../../components/Tips'
import Empty from '../../components/Empty'
import CityPosition from '../../components/CityPosition'
import Dealer from '../../components/Dealer'
import { inject, observer } from 'mobx-react'
@inject('question')
@observer
class index extends Component {
    constructor(props){
        super(props)
        this.state = {
            carInfo:{},
            isTipsShow:false
        }
        this.wrapOn = this.wrapOn.bind(this);
        this.closeTip = this.closeTip.bind(this);
        this.handleGoQuestion = this.handleGoQuestion.bind(this);
        this.isShowCity = this.isShowCity.bind(this);
        this.handleFootor = this.handleFootor.bind(this);
        this.chooseCarType = this.chooseCarType.bind(this);
    }
    async componentDidMount(){
        // 从本地中取车的信息
        let carInfo = await window.sessionStorage.getItem('2019.official.carInfo')?
        JSON.parse(window.sessionStorage.getItem('2019.official.carInfo')):{}
       
        let curId = await window.sessionStorage.getItem('2019.offical.curId')?
        JSON.parse(window.sessionStorage.getItem('2019.offical.curId')):""
        
        let curCarType =await window.sessionStorage.getItem('2019.offical.typeList')?
        JSON.parse(window.sessionStorage.getItem('2019.offical.typeList')):[]
       
        const curtype =await curCarType.find(item=>item.car_id===curId)
        carInfo.type = curtype.market_attribute.year+' ' +curtype.car_name
        
        this.setState({
            carInfo,
            iptName:'',
            iptPhone:'',
            isFooterIn:false,
            isIptFull:false,
        })
        //定位当前城市
        this.carId = curId
        await this.props.question.getCurCity() 
        // 获取当地经销商列表
        console.log()
        await this.getDealer(this.carId,this.props.question.curCityId) //{carId,cityId}
        //给section添加滚动事件
        this.section.addEventListener('scroll', this.handleFootor)
    }
    componentWillUnmount(){
        this.section.removeEventListener('scroll',this.handleFootor)
    }
    render() {
        const { question }  = this.props 
        const { curCity, dealerList } = this.props.question
        return (
            <div className={quesScss.question}>
                <header className={quesScss.header}>
                    <span>
                        可向多个商家咨询最低价，商家及时回复
                    </span>
                    <span 
                    onClick={this.wrapOn}
                    className={quesScss.ques}>
                        <b>?</b>
                    </span>
                </header>
                <section 
                ref={(section)=>this.section=section}
                className={quesScss.section}>
                    {/* 车型信息 */}
                    <div 
                    onClick={this.chooseCarType}
                    className={quesScss.carInfo}>
                        <dl className={quesScss.carInfoCon}>
                            <dt>
                                <img src={this.state.carInfo.CoverPhoto} alt=""/>
                            </dt>
                            <dd>
                                <p className={quesScss.carName}>{this.state.carInfo.AliasName}</p>
                                <p className={quesScss.cartype}>{this.state.carInfo.type}</p>
                            </dd>
                        </dl>
                        <div className={quesScss.rightIcon}>
                            <i className="iconfont icon-xiangyou"></i>
                        </div> 
                    </div>
                    <div className={quesScss.personInfo}>
                        <h6 className={quesScss.infoTitle}>个人信息</h6>
                        <ul className={quesScss.formUl}>
                            <li>
                                <span>姓名</span>
                                <input type="text"
                                value={this.state.iptName}
                                onChange = {(e)=>this.handleChange(e,'iptName')}
                                placeholder="请输入你的真实中文姓名"/>
                            </li>
                            <li>
                                <span>手机</span>
                                <input 
                                value={this.state.iptPhone}
                                onChange = {(e)=>this.handleChange(e,'iptPhone')}
                                type="text" placeholder="请输入你的真实手机号码"/>
                            </li>
                            <li
                             onClick={(e)=>this.isShowCity(e,'show')}
                            >
                                <span>城市</span>
                               <p className={quesScss.chooseCity}>
                                <span>{curCity ? curCity :''}</span>   
                                <i className="iconfont icon-xiangyou"></i></p>
                            </li>
                        </ul>
                        <div 
                        onClick={()=>this.submitForm()}
                        className={quesScss.formBtn}>
                            <button>询最低价</button>
                        </div>
                        <h6 
                        onClick = {()=>this.handleSubmit()}
                        className={quesScss.infoTitle}>选择报价经销商</h6>
                    </div>
                    {/* 经销商列表 */}
                    {
                        dealerList.length?
                        <Dealer dealerList = { dealerList}></Dealer>
                        : <Empty></Empty>
                    }
                    <footer className={this.state.isFooterIn?`${quesScss.footer} ${quesScss.footerIn}`:quesScss.footer}>
                        询最低价
                    </footer>
                </section>
                {/* 小提示 */}
                <Tips 
                closeTip = {this.closeTip}
                isTipsShow ={this.state.isTipsShow}></Tips>
                {/* 城市定位 */}
                <CityPosition 
                isShowCity={this.isShowCity}
                isShow = { question.isShowCity }
                ></CityPosition>
            </div>
        );
    }
    //提交表单
    submitForm(){
        if(this.state.iptName!==''&&this.state.iptPhone!==''){
            alert('可以询价 稍等....')
        }else{
            this.setState({
                isIptFull:true
            })
        }
    }
    //选择车型
    chooseCarType(){
        this.props.history.push('/type')
    }
    //footer显示状态
    handleFootor(event){
        const toTop =event.srcElement.scrollTop
        if(toTop>700){
            this.setState({
                isFooterIn:true
            })
        }else{
            this.setState({
                isFooterIn:false
            })
        }
    }
    //获取本地经销商列表
    getDealer(carId,cityId){
        this.props.question.getCurDealer({carId,cityId})
    }
    //显示定位城市列表
    async isShowCity(e,type){
        console.log(e.target.className)
        const curNode = e.target;
        await this.props.question.toggleCity(curNode,type)   
    }
    //小提示弹出显示 （可优化合并）
    wrapOn(){
        this.setState({
            isTipsShow:true
        })
    }
    //小提示弹窗隐藏（可以优化合并）
    closeTip(){
        this.setState({
            isTipsShow:false
        })
    }
    //提交表单
    handleGoQuestion(){

    }
    //受控组件
    handleChange(e,type){
        this.setState({
            [type]:e.target.value
        })
        if(this.state[type]===''){
            this.setState({
                isIptFull:false
            })
        }else{
            this.setState({
                isIptFull:true
            })
        }
    }
    
}

export default index;