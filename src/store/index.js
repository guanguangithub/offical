import { autorun } from 'mobx'
import BrandList  from './modules/brandList.js'
const brandList = new BrandList()
// console.log(brandList)
autorun(()=>{
  // brandList.brandList
})
export default {
  brandList
}