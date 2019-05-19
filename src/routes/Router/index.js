import React from 'react'
import { Switch , Route } from 'react-router-dom'
class Router extends React.Component{
  render(){
    return (
      <Switch>
        { this.props.children}
        {
        this.props.routes?
            this.props.routes.map(Item=>(
              <Route 
                key={Item.path}
                path={Item.path}
                render={props=><Item.component {...props} routs={Item.routes}/>}
              ></Route>
            ))  
          :null
          }
      </Switch>
      )
  }
}


export default Router