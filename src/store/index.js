import { autorun } from 'mobx'
import BrandList  from './modules/brandList.js'
import CarDetail  from './modules/carDetails.js'
import Question  from './modules/question'
import Picture  from './modules/picture'
import Color  from './modules/color'
const brandList = new BrandList()
const carDetail = new CarDetail()
const question = new Question()
const picture = new Picture()
const color = new Color()
// console.log(brandList)
autorun(()=>{
  // brandList.brandList
})
export default {
  brandList,
  carDetail,
  question,
  picture,
  color
}