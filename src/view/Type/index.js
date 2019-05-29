import React, {useState, useEffect} from 'react';
import typeScss from './type.module.scss'
import patternScss from '../../components/pattern/pattern.module.scss'
function Type(props){
    const [newList, setnewList] = useState([])//分好组的数据
    const [curInd,setcurInd] = useState(0)//用于渲染的数组
    const [mapList,setmaplist] = useState([])

    useEffect(()=>{
        let data = window.sessionStorage.getItem('2019.offical.groupList')?JSON.parse(window.sessionStorage.getItem('2019.offical.groupList')):[];
        let year = window.sessionStorage.getItem('2019.offical.years')?JSON.parse(window.sessionStorage.getItem('2019.offical.years')):[];  
        year = year.slice(1)
        let arr ={}
        data.forEach(item=>{
            let year = item.year;
           arr[year] = arr[year]||[]
           arr[year].push(item)
            
        })
        let a = [arr]
        setmaplist(data)
        setnewList(a)
    },[])
   function tabChange(item,i){
       setcurInd(i)
       setmaplist(newList[0][item])
    }
    function confirmType(val){
        console.log(val)
        window.sessionStorage.setItem('2019.offical.curId',JSON.stringify(val.car_id))
        console.log(props)
        props.history.goBack()
    }
    return (
        <div className={typeScss.wrap}>
           <h5>
               {  newList.length?
                   Object.keys(newList[0]).map((item,i)=>(
                       <span
                       className={curInd===i?typeScss.active:null}
                       onClick={()=>tabChange(item,i)}
                       key={i}
                       >{item}</span>            
                   )):null
               }
           </h5>
            {mapList.length?
                mapList.map((item,i)=>(
                <div key={i} className={typeScss.group}>
                    <p className={typeScss.title}>{item.key}</p>
                    <div className={typeScss.list}>
                        {
                            item.list.map((val,key)=>(
                                <dl 
                                onClick={()=>confirmType(val)}
                                key={key}>
                                    <dt>
                                        <p className={typeScss.patternYear}>{val.market_attribute.year}款 {val.car_name}</p> 
                                        <span className={typeScss.price}>{val.market_attribute.dealer_price_min}起</span>
                                    </dt>
                                    <dd className={typeScss.lowPrice}><span>{val.horse_power}马力{val.gear_num}档{val.trans_type}</span> <b className={typeScss.officalPrice}>指导价 {val.market_attribute.official_refer_price}</b></dd>
                                </dl>
                            ))
                        }
                        
                    </div>
                </div>
                )):null
            }
           
        </div>
    )
}
export default Type