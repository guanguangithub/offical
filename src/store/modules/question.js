import { observable, action} from 'mobx'
import { getCityList, getProvinceById, getCurCity,chooseDealer } from '../../api/home'
import { async } from 'q';
export default class Question{
    @observable isShowCity
    @observable isShowProvince
    @observable curCity
    @observable cityList
    @observable provinceList
    @observable dealerList

    constructor(){
        this.isShowCity=false;
        this.isShowProvince=false;
        this.curCity = '';
        this.curCityId  = '2593';
        this.cityList = [];
        this.provinceList = [];
        this.dealerList = [];
        this.carId = '';
    }
    //控制当前经销商是否被选中
    @action isChoosenDealer(ind){
        if(this.dealerList.length){
            this.dealerList[ind].isChoosen = !this.dealerList[ind].isChoosen
        }
    }
    //获取当地经销商列表
    @action async getCurDealer(params){
        this.carId = params.carId
        const { data } = await chooseDealer(params)
        console.log(params)
        console.log(data,'data...')
       
        if(data.data.list){
            this.dealerList = data.data.list
            if(this.dealerList.length){
                this.dealerList = this.dealerList.map((item,i)=>{
                    if(i<3){
                        item.isChoosen = true
                    }else{
                        item.isChoosen = false
                    }
                    return item
                })
            }
            
        }
    }
    //定位当前城市
    @action async getCurCity(){
        const { data } = await getCurCity()
        console.log(data,'当前城市')
        if(data.msg==='success') {
            this.curCity = data.data.CityName
            this.curCityId = data.data.CityID
        }
    }
    //获取所有城市列表
    @action async getCityList(){
        const {data} = await getCityList()
        console.log(data,'WWWWWW')
        if(data.data.length){
            this.cityList = data.data
        }
    }
    //切换城市组件 并且请求数据
    @action async toggleCity(node,type){
        if(type=='show'){
            await this.getCityList()
            this.isShowCity = true;
        }else{
            if(node.nodeName==='DIV'||node.className==='city_autoCity__1ld0W'){
                this.isShowCity = false
            }else{
                return 
            }
        }

    }
    //根据id获取省份 列表
    @action async getProvinceById(params){
        const { data } = await getProvinceById(params)
        if(data.data.length){
            this.provinceList = data.data
        }
    }
    //切换省份出现与否
    @action async toggleProvince(params,type,curCity){
        if(type==='show'){
            await this.getProvinceById(params)
            this.isShowProvince = true;
        }else{
            if(curCity){
                this.curCity = curCity.CityName
                this.curCityId = curCity.CityID
                this.getCurDealer({carId:this.carId,cityId:this.curCityId})
                this.isShowProvince = false;
                this.isShowCity = false
            }else{
                this.isShowProvince = false;                
            }
        }
    }
}