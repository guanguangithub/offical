import { observable, action } from 'mobx'
import { getCarDetail } from '../../api/home.js'
import group from '../../utils/group'
export default class CarDetail {
    @observable originData
    @observable detailInfo
    @observable years
    constructor(){
        this.originData ={}
        this.detailInfo = {};
        this.isLoaded = true;
        this.years = ['全部'];
        this.grouplist = []
    }
    @action async getDetailInfo(param){
        const  { data } = await getCarDetail(param)
        // console.log(data,'data...')
        if(data.data){
            this.isLoaded = false 
            this.originData = data.data
            this.detailInfo = data.data
            console.log(this.originData,'...origindata')
            this.sortData(this.detailInfo)
            this.filterYears(this.detailInfo.list)
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
        let arr = this.originData.list.slice(0);
       this.detailInfo.list =  arr.filter(item=>{
           if(i===0){
               return true
           }else{
               return item.market_attribute.year === this.years[i]
           }
        })
        
    }
    @action sortData(data){
        const arr = data
        arr.list = arr.list.sort((a,b)=>{
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

        // 分组
        //list = {
        //         2018:[
        //             {key:'',list:''},
        //             {key:'',list:''},
        //             {key:'',list:''},
        //         ]
        // }
        // this.years
        // console.log(new Set(this.years))
        data.list.forEach(item=>{
            let key = item.exhaust+'/'+item.max_power+' '+item.inhale_type
            let year = item.market_attribute.year
            item.key = key
            let ind = this.grouplist.findIndex(item=>item.key===key)
            if(ind===-1){
                this.grouplist.push({
                    key:key,
                    year:year,
                    list:[item]
                })
            }else{
                this.grouplist[ind].list.push(item)
            }
            // let ind = list.findIndex(val=>val[str])
        })
        console.log(this.grouplist,'group')
        console.log(data.list)
        this.detailInfo = arr
    }
}
