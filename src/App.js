import React, { Component } from 'react';
import{Switch,Route,BrowserRouter,Redirect} from 'react-router-dom';
import Login from './pages/Login/Login';
import admin from './pages/admin/admin';
export default class App extends Component{
  render(){
    return(
      <div>
        <BrowserRouter>
        <Switch>
          <Route path='/Login'component={Login}></Route>
          <Route path='/admin'component={admin}></Route>
          <Redirect to='/Login'/>
        </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
