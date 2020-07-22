import React, { Component } from 'react';
// import Button from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; // Import 
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ImageUploader from 'react-images-upload';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


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
   <Form.Control type="text" placeholder="First Name" name="firstname" value={this.state.firstname} onChange={this.handleOnChange} required/>
 </Form.Group>

 <Form.Group controlId="formBasicEmail">
   <Form.Label>Last Name</Form.Label>
   <Form.Control type="text" placeholder="Last Name" name="lastname" value={this.state.lastname} onChange={this.handleOnChange} required/>
 </Form.Group>

 <Form.Group controlId="formBasicEmail">
   <Form.Label>Email</Form.Label>
   <Form.Control type="text" placeholder="Email Address" name="email" value={this.state.email} onChange={this.handleOnChange} required/>
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
      <Form.Control type="email" placeholder="Enter Count" />
    </Form.Group>

    <Form.Group as={Form.Col} controlId="formGridPassword">
      <Form.Label>Phone Number</Form.Label>
      <Form.Control  placeholder="+94" />
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control placeholder="1234 Main St" />
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Address 2</Form.Label>
    <Form.Control placeholder="Apartment, studio, or floor" />
  </Form.Group>

  <Form.Row>
    <Form.Group as={Form.Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control />
    </Form.Group>

    <Form.Group as={Form.Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control />
    </Form.Group>
  </Form.Row>

  <Form.Group id="formGridCheckbox">
    <Form.Check type="checkbox" label="Like to partner with others?" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>



<br/><br/>
 <Form.Group controlId="formBasicEmail">
   <Form.Label>Password</Form.Label>
   <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleOnChange} required/>
 </Form.Group>

 <Form.Group controlId="formBasicEmail">
   <Form.Label>Confirm Password</Form.Label>
   <Form.Control type="password" placeholder="Password" name="cfpassword" value={this.state.cfpassword} onChange={this.handleOnChange} required/>
 </Form.Group>

 </Form>
 </div>

 <br/>
 <Button variant="primary" type="submit" >
    CREATE ACCOUNT
 </Button>
 
 </>
 );
 }
 }

 export default SignUp;