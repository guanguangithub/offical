import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import picScss from './picture.module.scss'
import Empty from '../../components/Empty'
import ImgList from '../../components/ImgList'
import BigPhoto from '../../components/BigPhoto'
import isScrollToPageBottom from '../../utils/isScrollToPageBottom'
@inject('picture')
@observer
class index extends Component {
    constructor(props){
        super(props)
        this.state = {
            carColor:'',
            ColorId:'',
            carType:'',
            SerialID:'',
            ImageID:'',
            timer:null,
            Page:1,
            PageSize:30,
            isshowMore:true,
            curIndex:0
        }
        this.page = 1;
        //绑定this
        this.getCategoryImageList = this.getCategoryImageList.bind(this)
        this.watchScroll = this.watchScroll.bind(this)
        this.loadDataDynamic = this.loadDataDynamic.bind(this)
        this.toggleBigPic = this.toggleBigPic.bind(this)
        this.changePageData = this.changePageData.bind(this)
    }
    
    async componentDidMount(){
        //获取 车系信息
        let carInfo =  window.sessionStorage.getItem('2019.official.carInfo') ?
                 JSON.parse(window.sessionStorage.getItem('2019.official.carInfo')) : [];
        //获取车系列表
        let typeList = window.sessionStorage.getItem('2019.offical.typeList') ? 
                JSON.parse(window.sessionStorage.getItem('2019.offical.typeList')) : [];
        //保存当前车型id
        let carId = window.sessionStorage.getItem('2019.offical.curId') ? 
                JSON.parse(window.sessionStorage.getItem('2019.offical.curId')) : '';
        //从车型列表中查询出当前车型信息
        let carTypeItem = typeList ?
                typeList.find(item=>item.car_id===carId):{}
        //车型名称 拼接
        let carType = carTypeItem ?
                 carTypeItem.market_attribute.year+'款'+carTypeItem.car_name : ''
        //保存车系id
        let SerialID =carInfo.carId
        let params = {}
        //查询参数个数 判断
        if(carInfo.ColorId){
            params = {SerialID,ColorId:carInfo.ColorId}
            if(carTypeItem){
                params = {SerialID,ColorId:carInfo.ColorId,CarID:carId}
            }
        }else{
            params = {SerialID}
        }
        //按照id / 车型id /color id 请求图片分类列表
        await this.props.picture.getPicture(params) 
        this.setState({
            carColor:carInfo.ColorName,
            carType,
            SerialID,     
        })
       
        //给图片列表绑定滚动事件
    }
    render() {
        const { picList, isShowCategery, CategoryList, imgList, isShowBigImg } = this.props.picture
        return (
            <div className={picScss.picWrap}>
                <header className={picScss.header}>
                    <p onClick={()=>this.props.history.push('/color')}>
                        <span>{this.state.carColor?this.state.carColor:'全部颜色'}</span>
                        <b className={picScss.icon}><i className="iconfont icon-xiangyou"></i></b>     
                    </p>
                    <p>
                        <span
                        className={picScss.carType}
                        onClick={()=>this.props.history.push('/type')}
                        >{this.state.carType?this.state.carType:'全部车款'}</span>
                        <b className={picScss.icon}><i className="iconfont icon-xiangyou"></i></b>
                    </p>
                </header>
                <section className={picScss.section}>  
                    {
                        picList.length?
                            null
                        :<Empty></Empty>//兜底页面
                    }     
                    <ul className={picScss.imgList}>
                        { picList.map((item,index)=>{
                                return <>
                                    {
                                    item.List.map((val,key)=>{
                                        return (
                                            <>
                                                <ImgList 
                                                    key={key}
                                                    val={val}
                                                    curInd = {key}
                                                    curGroup = {item}
                                                    toggleBigPic={this.toggleBigPic}>
                                                    <div //SerialID=2593&ImageID=6&Page=1&PageSize=30&_1558696277073
                                                        onClick={()=>this.getCategoryImageList(item.Id,1,30)}
                                                        className={key===0?picScss.imgMask:picScss.none}>
                                                        <span>
                                                            {item.Name}
                                                        </span>
                                                        <span>
                                                            {item.Count}张
                                                        </span>
                                                    </div>
                                                </ImgList>              
                                            </>
                                        )
                                    })       
                                    }                                    
                                </>
                            })
                        }
                    </ul>
                    <div 
                    ref={(imgWrap)=>this.imgWrap = imgWrap }
                    className={isShowCategery?`${picScss.categoryWrap} ${picScss.categoryWrapIn}`:picScss.categoryWrap}>
                        <ul 
                    ref={(imgCon)=>this.imgCon = imgCon }

                        className={picScss.imgList}>
                            {/* 当前分类下所有图片列表 */}
                            {  
                                isShowCategery?
                                imgList.map((item,key)=>{
                                    return (
                                        <ImgList 
                                        val={item} 
                                        key={key} 
                                        size={item.LowSize}
                                        curInd = {key}
                                        curGroup = {item}
                                        toggleBigPic={this.toggleBigPic}>
                                        </ImgList>
                                    )
                                }):null
                            }
                            {
                               this.state.isshowMore?
                                <p className={picScss.showMore}>加载更多</p>:null
                            }
                        </ul>
                    </div>
                </section>
                {/* 展示大图 */}
                {  isShowBigImg?
                    <BigPhoto isShowBigImg = {isShowBigImg } toggleBigPic={this.toggleBigPic} changePageData={this.changePageData} curIndex={this.state.curIndex}></BigPhoto>              
                :null}
            </div>
        );
    }
    //展示大图：
    async toggleBigPic(curInd,curGroup,type,e,swiper){
        if(type===false){
            if(e.target.nodeName=='DIV'){
                this.props.picture.toggleBigImg(type)
            }else{
                return 
            }
        }else{
            if(e.target.nodeName==='IMG'||e.target.nodeName==="LI"){
                this.setState({
                    curIndex:curInd
                })
                console.log(curGroup,'curGroup')
                this.changePageData(curGroup,curInd,1)
                this.props.picture.toggleBigImg(type,curInd,curGroup)
                //swiper.update();
            }else{
                return 
            }

        }
    }
    //请求数据
    async changePageData(curGroup,curInd,Page){
       let id = this.state.ImageID?this.state.ImageID:curGroup.Id
       await this.props.picture.collectBigImgInfo({
            getInfo:{SerialID:this.state.SerialID,ImageID:id,Page:this.props.picture.Page,PageSize:30},
            curInd
        })
    }
    //获取 特定车型第某页的30条图片列表
    async getCategoryImageList(ImageID,Page,PageSize){
        this.setState({
            ImageID
        })
       await this.props.picture.getCategoryImageList({SerialID:this.state.SerialID,ImageID,Page:this.props.picture.Page,PageSize:this.state.PageSize})
       let that = this;
       this.imgWrap.addEventListener('scroll',that.watchScroll)
    }
    async loadDataDynamic(){
            if(this.props.picture.Page<this.props.picture.CategoryList.Page){
                await this.props.picture.changePage()
                this.props.picture.getCategoryImageList({SerialID:this.state.SerialID,ImageID:this.state.ImageID,Page:this.props.picture.Page,PageSize:this.state.PageSize})
            }else{
                return 
            }
           
    }
    //如果滚动条滚动到页面底部，需要加载新的数据,并且显示加载提示
    async watchScroll(){
        setTimeout(()=>{
            if(isScrollToPageBottom(this.imgCon,this.imgWrap)){
                this.loadDataDynamic()
             }
        },900)
    }
    //开始检测滚动条
    componentWillUnmount(){
        let that = this
        this.imgWrap.removeEventListener('scroll',that.watchScroll)
    }

}

export default index;