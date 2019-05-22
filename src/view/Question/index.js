import React, { Component } from 'react';
import quesScss from './question.module.scss'
import '../../assets/fonts/iconfont.css'
import Tips from '../../components/Tips'
import CityPosition from '../../components/CityPosition'
class index extends Component {
    constructor(){
        super()
        this.state = {
            carInfo:{},
            isTipsShow:false
        }
        this.wrapOn = this.wrapOn.bind(this);
        this.closeTip = this.closeTip.bind(this);
        this.handleGoQuestion = this.handleGoQuestion.bind(this);
    }
    componentDidMount = async ()=>{
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
            iptPhone:''
        })
    }
    render() {
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
                <section className={quesScss.section}>
                    {/* 车型信息 */}
                    <div className={quesScss.carInfo}>
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
                            <li>
                                <span
                                onClick={this.showCity}
                                >城市</span>
                               <p className={quesScss.chooseCity}><i className="iconfont icon-xiangyou"></i></p>
                            </li>
                        </ul>
                        <div className={quesScss.formBtn}>
                            <button>询最低价</button>
                        </div>
                        <h6 
                        onClick = {()=>this.handleSubmit()}
                        className={quesScss.infoTitle}>选择报价经销商</h6>
                    </div>
                </section>
                {/* 小提示 */}
                <Tips 
                closeTip = {this.closeTip}
                isTipsShow ={this.state.isTipsShow}></Tips>
                {/* 城市定位 */}
                {/* <CityPosition></CityPosition> */}
            </div>
        );
    }
    //显示定位城市列表
    showCity(){
        console.log(111)
    }
    wrapOn(){
        console.log(888)
        this.setState({
            isTipsShow:true
        })
    }
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
        console.log(e.target.value)
        this.setState({
            [type]:e.target.value
        })
        console.log(this.state)
    }
}

export default index;