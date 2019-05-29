import { observable, action} from 'mobx';
import { pictureById, getCategoryImageList } from '../../api/home'
import { async } from 'q';
export default class Picture {
    @observable picList
    @observable CategoryList
    @observable isShowCategery
    @observable Page
    @observable isShowBigImg
    @observable curBigImgInfo
    @observable swiperItems
    @observable allNum
    @observable curCount
    @observable curGroup
    constructor(){
        this.picList = [];
        this.CategoryList = {};
        this.imgList = [];
        this.isShowCategery = false;
        this.Page = 1;
        this.isShowBigImg = false;
        this.curBigInd = 0;
        this.swiperItems=[];
        this.allNum=0;
        this.curCount=1;
        this.curGroup={};
    }
    //获取分组图片列表
    @action async getPicture(params){
        const { data } = await pictureById(params)
        if(data.code===1&&data.data.length){
            this.picList=data.data
        }else{
            this.picList=[]
        }
    }
    //获取 当前分类图片内所有图片
    @action  async getCategoryImageList(params){
        const { data } = await getCategoryImageList(params)
        console.log(data)
        if(data.code===1&&data.data!=="null"){
            this.CategoryList = data.data
            //显示 列表页
            data.data.List.forEach(item=>{
                this.imgList.push(item)
            })
            // console.log(this.imgList)
            this.isShowCategery = true
        }
    }
    //分页请求数据
    @action changePage(){
        this.Page = this.Page+1
        // console.log(this.Page,'this.page')
    }
    //切换是否显示 大图信息
    @action toggleBigImg(type,curInd,curGroup){
        if(type===false){
            this.swiperItems =[]
        }else{
            if(curInd){
                this.curBigInd = curInd
                this.curGroup = curGroup
                console.log(this.curGroup,curInd,'jjjj')
            }
        }
            this.isShowBigImg = type
        // this.curBigInd = curInd]
    }
    //收集大图信息
    @action async collectBigImgInfo(params){
        const { data } = await getCategoryImageList(params.getInfo)
        if(data.code===1&&data.data!=="null"){
            this.curCount = data.data.Count
            console.log(this.curBigInd,'data..')
            data.data.List.forEach((item,i)=>{
                this.swiperItems.push({
                    image:item.Url.replace(/(\{0\})/,item.HighSize),
                    title:`详情图${i}`,
                    Count:data
                })

            })
        }
    }
}