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
