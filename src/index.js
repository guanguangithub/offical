import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App.js'
//重置样式
import './scss/common.css'
//适配大小
import './utils/flexible.js'
// 注入 mobx 状态
import { Provider } from 'mobx-react'
import store from './store'
ReactDOM.render(<Provider {...store}><App /></Provider>, document.getElementById('root'));
  