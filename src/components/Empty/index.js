/*
 * @Author: Fairy·yue 
 * @Date: 2019-05-24 17:28:09 
 * @Last Modified by:   Fairy·yue 
 * @Last Modified time: 2019-05-24 17:28:09 
 */
//空数据提示页
import React from 'react';
import emptyScss from './empty.module.scss'
import emtypImg from '../../assets/img/nodata.png'
export default props =>{
    return (<div className={emptyScss.emptyWrap}>
        <img src={emtypImg} alt=""/>
        {/* <span>该地区没有经销商参考,怪可惜o(╥﹏╥)o</span> */}
    </div>)
}