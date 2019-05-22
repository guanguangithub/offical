import { observable, action } from 'mobx'
import { getCarDetail } from '../../api/home.js'
import group from '../../utils/group'
export default class CarDetail {
    @observable detailInfo
    @observable years
    constructor(){
        this.detailInfo = {}
        this.isLoaded = true;
        this.years = ['全部'];
    }
    @action async getDetailInfo(param){
        const  { data } = await getCarDetail(param)
        // console.log(data,'data...')
        if(data.data){
            this.isLoaded = false     
            this.sortData(data.data)
            this.filterYears(data.data.list)
        }
    } 
  
    @action filterYears(list){
        list.forEach(item=>{
            this.years.push(item.market_attribute.year)
        })
        this.years=  [...new Set(this.years)]
    }
    //通过年份 筛选数据
    @action filterByYear(i){
        // console.log(this.detailInfo,'filter')
       this.detailInfo.list =  this.detailInfo.list.filter(item=>{
           if(i===0){
               return true
           }else{
               return item.market_attribute.year === this.years[i]
           }
        })
        
    }
    @action sortData(data){
        data.list = data.list.sort((a,b)=>{
            if(a.exhaust!==b.exhaust){
                return a.exhaust-b.exhaust
            }else{
                if(a.max_power!=b.max_power){
                    return a.max_power-b.max_power
                }else{
                    if(a.inhale_type!=b.inhale_type){
                        return -1
                    }else{
                        if(a.market_attribute.year!==b.market_attribute.year){
                            return b.market_attribute.year-a.market_attribute.year
                        }
                    }
                }
            }
        })
        // 分组
        for(let i = 0;i<data.list.length-1;i++){
            if(data.list[i].exhaust===data.list[i+1].exhaust&&data.list[i].max_power===data.list[i+1].max_power&&data.list[i].inhale_type===data.list[i+1].inhale_type){
                data.list[i+1].hide = true;
            }
        }
        this.detailInfo = data

    }
}
