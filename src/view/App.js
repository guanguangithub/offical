import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom'
import { Router, routes } from "../routes"
function App() {
  return (
   <BrowserRouter>
      <Router routes={routes}>
        <Redirect exact from='/' to='/Home'></Redirect>
      </Router>  
   </BrowserRouter>
  );
}

export default App;
