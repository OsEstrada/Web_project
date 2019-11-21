import React from "react";
import Signin from "./login/signin";
import Signup from "./login/signup";
import Main from "./Layouts/index";
import Adm from "./LayoutsAdmin/index"
import {BrowserRouter, Route, Switch} from "react-router-dom"
 

class login extends React.Component{
  constructor(props){
    super(props)
    this.state = {SignInActive: true}
  }

  isSignInActive=(event)=>{
    this.setState({SignInActive:!this.state.SignInActive})
  }


  render(){
    return(
      <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/Sign-In" exact component={Signin}/> 
          <Route path="/Sign-Up" exact component ={Signup}/>
      </Switch>
      </BrowserRouter>
    );
  }
}

export default login;