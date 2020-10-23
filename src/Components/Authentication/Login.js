import React, { Component } from 'react';
// import Button from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; // Import 
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ImageUploader from 'react-images-upload';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {CommonGet, CommonPost , CommonDeleteById} from "../../config";
import swal from 'sweetalert';


class Login extends Component {

     
   state={

            id:0,
            isModalOpen:false,
            categoryAnswer1:"",
            firstname:"",
            lastname:"",
            email:"",
            password:"",
          


            surveyList:[],
            pictures: [] ,
            userList:[],

}

constructor(props) {
    super(props);
      
    }
componentWillUpdate() {

  CommonGet('users/all','')
  .then(res=>res.json())
  .then(json =>{
      this.setState({
         userList:json
      })
  });

}

handleOnChange = (event) => {

    const state = this.state
    state[event.target.name] = event.target.value;
    this.setState(state);

}

handleOnClick = () =>{
 
  let getId = this.state.userList.filter((item)=>{
    if(item.email == this.state.email && item.password == this.state.password){
      swal({
        title: "User Login Successfully!",
        text: "Valid Credentials!",
        icon: "success",
        button: "OK",
      });
    // swal("Valid Credentials!", "success");
      this.props.history.push('/CheckDashboard');
      return item
    }
  

  })
  .map((item)=>{
    return item
  })

  getId.map((item)=>{
    return(
    window.sessionStorage.setItem("UserId",item._id),
    window.sessionStorage.setItem("UserEmail",item.email),
    window.sessionStorage.setItem("UserCategory",item.userCategory),
    window.sessionStorage.setItem("Name",item.firstname),
    window.sessionStorage.setItem("guestcount",item.guestCount), 
    window.sessionStorage.setItem("phoneNumber",item.phoneNumber)


    );
  })

if(getId.length > 0){
  console.log("Success")
}
  else{

    swal({
      title: "User Login Failed!",
      text: "Invalid Credentials!",
      icon: "error",
      button: "OK",
    });
  }

}

render() {

    const myStyle = {
        width: "400px",
     };

    return (
       
 <>
        <h1> LOGIN </h1> <br/>
        <div class="d-flex justify-content-center">
        <Form style={myStyle}>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Email Address" name="email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} required/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} required/>
        </Form.Group>

        </Form>
        </div>

        <br/>
        <a href='/SignUp'> Not a member? Join Us </a>
        <br/> <br/>

        <Button variant="primary" type="submit" onClick = {this.handleOnClick}>
           LOGIN
        </Button>
 </>
 );
 }
 }

 export default Login;