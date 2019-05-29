import React, { Component } from 'react';
import bigScss from './big.module.scss'
import { inject, observer } from 'mobx-react'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
@inject('picture')
@observer
class index extends Component {
    constructor(props){
        super(props)
        this.state ={
            activeIndex:this.props.curIndex,
            SerialID:0
        }
      
    }
   componentDidMount(){
        let carInfo =  window.sessionStorage.getItem('2019.official.carInfo') ?
        JSON.parse(window.sessionStorage.getItem('2019.official.carInfo')) : [];
        console.log(carInfo)
        this.setState({
            SerialID:carInfo.carId
        })
        let that = this
        this.swiper = new Swiper(this.mySwiper,{
            initialSlide :this.props.curIndex,
            preloadImages:true,
            pagination : {
                el: this.myPage,
                type: 'fraction',
            },
            lazy: {
                loadPrevNext: true,
            },
            observer:true,
            lazyLoading: true,
            lazyLoadingInPrevNext : true, 
            // 这个为true时，↓才有用
            lazyLoadingInPrevNextAmount: 2,
            on:{
                transitionEnd: function(){
                    that.setState({
                        activeIndex:this.activeIndex+1
                    })
                    // console.log(this.activeIndex+1)
                    // console.log(that.state.SerialID,'Sid') 
                    // console.log(that.props.picture.curGroup.Id,'Id')
                    // console.log(that.props.picture.Page,'page')
                    // console.log(that.props.picture.Page,'page')
                    // console.log(that.props.picture.Page,'page1')
                    
                    if(this.activeIndex+1===that.props.picture.swiperItems.length){
                        let SerialID = that.state.SerialID;
                        let ImageID = that.props.picture.curGroup.Id;
                        that.props.picture.changePage()
                        let Page = that.props.picture.Page

                        // console.log(this.activeIndex+1)
                        that.props.picture.collectBigImgInfo({
                            getInfo:{SerialID,ImageID,Page,PageSize:30},
                        }) 
                    }
                },
            },
        })        
        }
    componentWillUnmount(){
        if(this.swiper){
            this.swiper.destroy();
        }
    }
    render() {
        const { isShowBigImg,toggleBigPic ,changePageData} = this.props
        const { curBigInd,swiperItems,curCount } = this.props.picture
        return (
            <div 
            data-only='close'
            onClick = {(e)=>toggleBigPic(null,null,false,e)}
            className={isShowBigImg?`${bigScss.imgWrap} ${bigScss.imgWrapIn}`:bigScss.imgWrap }>
                <div className={bigScss.ShowDetais}>
                    <div className={`swiper-container ${bigScss.mySwiper}`} ref={(mySwiper)=>this.mySwiper=mySwiper}>
                        <div className="swiper-wrapper">
                            {
                                swiperItems.length?
                                swiperItems.map((item,i)=>(
                                    <div className="swiper-slide">
                                        <img src={item.image} alt=""/>
                                        {/* <img data-src={item.image} className="swiper-lazy" alt={item.title} />
                                        {console.log(i,curBigInd)}
                                        {
                                           i===curBigInd?
                                           null
                                           :<div className="swiper-lazy-preloader" ></div>
                                        } */}
                                    </div>
                                )):null
                            }
                            
                        </div>
                        <div className='swiper-pagination' ref={myPage=>this.myPage = myPage}></div>
                    </div>
                </div>
                
                <footer className={bigScss.imgfooter}>
                        <p className={bigScss.page}>
                            <span>{this.state.activeIndex}</span>
                            /
                            <span>{curCount}</span>
                        </p>
                        <button className={bigScss.askLowest}>询最低价</button>            
                </footer>
            </div>
        );
    }

}

export default index;