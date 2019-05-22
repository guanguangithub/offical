import { observable, action } from 'mobx'
import { getBrandList, getCarType } from '../../api/home'
import group from '../../utils/group'
export default class HomeState{
  @observable brandList;
  @observable homeLoad;
  @observable carTypes;
  @observable isShow;
  constructor(){
    this.brandList =[];
    this.carTypes =[];
    //控制侧边框
    this.isShow = false;
    //控制loading
    this.homeLoad = false;
  }
  //获取品 牌列表
  async getBrandList(){
    const { data } = await getBrandList()
    // console.log(data,'data') 
    if(data.data.length){
      this.setBrandList(data.data)
    }
  }
  @action setBrandList(data){
    this.brandList=group(data)
    this.homeLoad = true;
  }
 //获取汽车类型
  @action async getCarType(param){
   const { data } = await getCarType(param)
  //  console.log(data)
   if(data.data.length){ 
    this.carTypes = data.data
    this.isShow = true 
   }
 }
 //取消弹出框
 @action cancel(){
   this.isShow = false
 }
 //显示弹窗
 @action showType(){
   this.isShow = true
 }
 //获取汽车详情内容

}