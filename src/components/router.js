import React from "react";
import Signin from "./login/signin";
import Signup from "./login/signup";
import Main from "./Layouts/index";
import Adm from "./LayoutsAdmin/index"
import Support from "./LayoutsSupport/Agent"
import {BrowserRouter, Route, Switch} from "react-router-dom"
 

class login extends React.Component{
  constructor(props){
    super(props)
    this.state = {islogged: false}
  }

  render(){
    return(
      <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Support}/>
          <Route path="/Sign-In" exact component={Signin}/> 
          <Route path="/Sign-Up" exact component ={Signup}/>
      </Switch>
      </BrowserRouter>
    );
  }
}

export default login;