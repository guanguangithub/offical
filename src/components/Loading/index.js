/*
 * @Author: Fairy·yue 
 * @Date: 2019-05-21 20:34:10 
 * @Last Modified by: Fairy·yue
 * @Last Modified time: 2019-05-21 20:34:39
 */
/**
 * 加载loading组件
 */
import React from 'react'
import LoadingScss from './loading.module.scss'
class Loading extends React.Component {
  render() {
    return (
      <div className={LoadingScss.loadWrap}>
        <div className={LoadingScss.loadInner}>
          <img src={require('../../assets/img/loading.gif')} alt=""/>
          <span>加载中...</span>
        </div>
      </div>
    )
  }
}
export default Loading
// export default Com =>{
//   return class Loading extends Com {
//     constructor(props){
//       super(props)
//       console.log(this.state)
//     }
//     render(){
//       return (
//         <div>
//           <Com></Com>
//           <div className={LoadingScss.loadWrap}>
//             <div className={LoadingScss.loadInner}>
//               <img src={require('../../assets/img/loading.gif')} alt=""/>
//               <span>加载中...</span>
//             </div>
//           </div>
//         </div>
//       )
//     }
//   }
// }