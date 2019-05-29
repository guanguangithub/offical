import {observable, action} from 'mobx'
import { getColor } from '../../api/home'
export default class Color {
    // @observable colorList
    constructor(){
        this.colorList={}
    }
    @action async getColor(params){//SerialID=3395&_1558665354493
        const { data } = await getColor(params)
        console.log(data,'data')
        if(data.code===1){
            this.colorList = data.data
        }
    }

}