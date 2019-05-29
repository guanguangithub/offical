import React, { Component } from 'react';
import imgScss from './img.module.scss'
class index extends Component {
    state = {  }
    render() {
        const {val,curGroup,curInd} = this.props
        
        return (
            <li className={imgScss.imgItem} onClick={(e)=>this.props.toggleBigPic(curInd,curGroup,true,e)}>
                <img src={val.Url.replace(/(\{0\})/,val.LowSize,)} alt="" className={imgScss.imgBg}/>
                {this.props.children}
            </li>
        );
    }
}

export default index;