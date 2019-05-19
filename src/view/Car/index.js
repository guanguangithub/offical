import React from 'react'
import CarScss from './car.module.scss'
class Car extends React.Component {
  render(){
    return (
      <div className={CarScss.car}>
        cardetail
      </div>
    )
  }
}
export default Car