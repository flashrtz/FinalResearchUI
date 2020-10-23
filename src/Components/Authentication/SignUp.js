import React, { Component } from 'react';
// import Button from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; // Import 
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ImageUploader from 'react-images-upload';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {CommonGet, CommonPost , CommonDeleteById} from "../../config";
import swal from 'sweetalert';


class SignUp extends Component {

     
   state={

            id:0,
            isModalOpen:false,
            categoryAnswer1:"",
            firstname:"",
            lastname:"",
            email:"",
            password:"",
            cfpassword:"",
            userCategory:"",
            isHidden:true,
            likeOthers:false,
            guestCount:"",
            phoneNumber:"",
            address:"",
            address2:"",
            city:"",
            zip:"",

            surveyList:[],
            pictures: [] ,


}

constructor(props) {
    super(props);
      
    }
componentWillUpdate() {}


userCategoryChange = (e) =>{


    this.setState({

        userCategory:e.target.value,
       // isHidden:false,
    })
  
    

    if(e.target.value == 1 || e.target.value == 2 ){

        this.setState({
            isHidden:false,
        })
    }else{

        this.setState({
            isHidden:true,
        })
    }


}
//submit handler

submitHandler =()=>{

  let finalpassword = "";
  if(this.state.password == this.state.cfpassword){
    finalpassword = this.state.password;
  }
  else{
   swal("Password Mismatched!")
  } 


  let formdata = {

    firstname:this.state.firstname,
    lastname:this.state.lastname,
    email:this.state.email,
    userCategory:this.state.userCategory,
    guestCount:this.state.guestCount,
    phoneNumber:this.state.phoneNumber,
    address:this.state.address,
    address2:this.state.address2,
    city:this.state.city,
    zip:this.state.zip,
    likeOthers:this.state.likeOthers,
    password:finalpassword
  }

 // swal(JSON.stringify(formdata));
  CommonPost('users/add/',formdata)
  .then(res=>res.json())
  .then(json =>{
    swal({
			title: "User Registered Successfully!",
			icon: "success",
			button: "OK",
		  });
      console.log(json);
     //window.location.reload();
  });
}


render() {

    const myStyle = {
        width: "400px",
     };

    return (
        <>
 <h1>CREATE ACCOUNT</h1>
 <br/>

 <div class="d-flex justify-content-center">
 <Form style={myStyle}>

 <Form.Group controlId="formBasicEmail">
   <Form.Label>First Name</Form.Label>
   <Form.Control type="text" placeholder="First Name" name="firstname" value={this.state.firstname} onChange={(e)=>this.setState({firstname:e.target.value})} required/>
 </Form.Group>

 <Form.Group controlId="formBasicEmail">
   <Form.Label>Last Name</Form.Label>
   <Form.Control type="text" placeholder="Last Name" name="lastname" value={this.state.lastname} onChange={(e)=>this.setState({lastname:e.target.value})} required/>
 </Form.Group>

 <Form.Group controlId="formBasicEmail">
   <Form.Label>Email</Form.Label>
   <Form.Control type="text" placeholder="Email Address" name="email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} required/>
 </Form.Group>

 <Form.Group controlId="userCategory">
    <Form.Label>Select a Category</Form.Label>
    <Form.Control as="select" name="userCategory" value={this.state.userCategory} onChange={(e)=>this.userCategoryChange(e)} >
      <option value="-1">Select</option>
      <option value ="1">Lightings</option>
      <option value="2">Sounds</option>
      <option value="3">Event Hostler</option>
    </Form.Control>
  </Form.Group>

{
// Below is the form needed when a user selects a category!
}
  <Form hidden={this.state.isHidden}>
  <Form.Row>
    <Form.Group as={Form.Col} controlId="formGridEmail">
      <Form.Label>Guest Count</Form.Label>
      <Form.Control as="select" name="userCategory" value={this.state.guestCount} onChange={(e)=>this.setState({guestCount:e.target.value})} >
                <option value = '-1'>-Please Select-</option>
                <option value = '1'>Less than 50</option>
                <option value = '2'>50-100</option>
                <option value = '3'>100-500</option>
                <option value = '4'>More than 500</option>
    </Form.Control>
     

    </Form.Group>

    <Form.Group as={Form.Col} controlId="formGridPassword">
      <Form.Label>Phone Number</Form.Label>
      <Form.Control  placeholder="+94" value ={this.state.phoneNumber} onChange={(e)=>this.setState({phoneNumber:e.target.value})}/>
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control placeholder="1234 Main St" value ={this.state.address} onChange={(e)=>this.setState({address:e.target.value})} />
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Address 2</Form.Label>
    <Form.Control placeholder="Apartment, studio, or floor" value ={this.state.address2} onChange={(e)=>this.setState({address2:e.target.value})} />
  </Form.Group>

  <Form.Row>
    <Form.Group as={Form.Col} controlId="formGridCity"  >
      <Form.Label>City</Form.Label>
      <Form.Control value ={this.state.city} onChange={(e)=>this.setState({city:e.target.value})}/>
    </Form.Group>

    <Form.Group as={Form.Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control value ={this.state.zip} onChange={(e)=>this.setState({zip:e.target.value})}/>
    </Form.Group>
  </Form.Row>

  <Form.Group id="formGridCheckbox">
    <Form.Check type="checkbox" label="Like to partner with others?" value ={this.state.likeOthers} onChange={(e)=>this.setState({likeOthers:!this.state.likeOthers})}/>
  </Form.Group>

</Form>

<br/><br/>
 <Form.Group controlId="formBasicEmail">
   <Form.Label>Password</Form.Label>
   <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} required/>
 </Form.Group>

 <Form.Group controlId="formBasicEmail">
   <Form.Label>Confirm Password</Form.Label>
   <Form.Control type="password" placeholder="Password" name="cfpassword" value={this.state.cfpassword} onChange={(e)=>this.setState({cfpassword:e.target.value})} required/>
 </Form.Group>

 </Form>
 </div>

 <br/>
 <Button variant="primary" type="submit" onClick={this.submitHandler}>
    CREATE ACCOUNT
 </Button>
 
 </>
 );
 }
 }

 export default SignUp;