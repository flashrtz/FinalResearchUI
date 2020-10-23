import React, { Component } from 'react';
// import Button from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; // Import 
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ImageUploader from 'react-images-upload';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button'
import {CommonGet, CommonPost , CommonDeleteById,CommonGetByParams} from "../../config";
import { mockComponent } from 'react-dom/test-utils';
import moment from 'moment';
import * as ReactBootStrap from 'react-bootstrap';


class UserEditProfile extends Component {

     
   state={

            id:0,
            category:"",
            dateAndTime: new Date(),
            location:"",
            guestCount:"",
            userList:[],
            supplierList:[],


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
handleChange = date => {
  this.setState({
    dateAndTime: date
  });
};
ticketCategoryCountChange = (e) =>{
this.setState({
  ticketCategoryCount:e.target.value
              })

}       


formSubmitHandler=()=>{

  //no location at the moment
  if(this.state.category != 3){
  var queryString  = 'guestCount='+this.state.guestCount+'&userCategory='+this.state.category;//+'&date='+moment(this.state.dateAndTime).format("DD-MM-YYYY");
  }
  else {
    var queryString  = 'guestCount='+this.state.guestCount+'&userCategory='+this.state.category;//+'&date='+moment(this.state.dateAndTime).format("DD-MM-YYYY");
  }

  window.alert(queryString);

  CommonGetByParams('findSupplier/allcheck',queryString)
  .then(res=>res.json())
  .then(json =>{
      window.alert("Found Suppliers !");
      this.setState({
        supplierList:json

      })
      console.log(json);
    // window.location.reload();
     });
//window.alert(JSON.stringify(formdata));
//   CommonGet('suppliers/get/',formdata)
//   .then(res=>res.json())
//   .then(json =>{
//       window.alert("Item Added!");
//       console.log(json);
//      window.location.reload();
//   });

}


renderDisplay=(contetnts) =>{

  let tableContent = contetnts === undefined ? null : (
    contetnts.map((item)=>{
      var des;
      if(item.userCategory == 1){
          des = "Lightings"
      }
      else if(item.userCategory == 2){
          des="Sounds"
      }
      else if(item.userCategory == 3){
        des="Event Hostler"
    }
      else{
          des = "Unknown User"
      }
      return(
          <tr key ={item._id}>
            <td>{des}</td>
            <td>{item.firstname}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.email}</td>

            </tr>

      );

  }));

  return(
    <div class="table-responsive" style={{ overflow: "hidden" }}>
        <table id="example1" className="table table-condensed tfont" style={{ fontSize: "12" }}>
            <thead>
                <tr>
                <th>Category</th>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Profile</th>
                </tr>
            </thead>
            <tbody>
          {tableContent}
            </tbody>
        </table>
        <br/><br/><br/><br/>
    </div>
);
}

  render() {
    let contetntsDisplay = this.renderDisplay(this.state.supplierList);
    const myStyle = {
        width: "400px",
     };
   
    return (

<>
<Jumbotron>
    <div>
        <div>
            <h1>FIND SUPPLIER</h1>
            </div>
        <div class="d-flex justify-content-center">
        <Form style={myStyle}>
        <Form.Group controlId="exampleForm.ControlSelect1">
             <Form.Label>Number of Guests</Form.Label>
             <Form.Control as="select" value={this.state.guestCount} onChange ={(e) => this.setState({guestCount:e.target.value})}>
                <option value = '-1'>-Please Select-</option>
                <option value = '1'>Less than 50</option>
                <option value = '2'>50-100</option>
                <option value = '3'>100-500</option>
                <option value = '4'>More than 500</option>
             </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
             <Form.Label>Category</Form.Label>
             <Form.Control as="select" value={this.state.category} onChange ={(e) => this.setState({category:e.target.value})}>
                <option value = '-1'>-Please Select-</option>
                <option value = '1'>Lightings</option>
                <option value = '2'>Sounds</option>
                <option value = '3'>Both</option>
              
             </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Location of the Event</Form.Label>
          <Form.Control type="text" placeholder="EventLocation" name="email" value={this.state.location} onChange={(e)=>this.setState({location:e.target.value})} required/>
        </Form.Group>
        <Form.Label>Scheduled Date and Time</Form.Label><br/>
        <DatePicker
        selected={this.state.dateAndTime}
        onChange={this.handleChange}
        showTimeSelect
      /><br/><br/>
      

        <Button variant="info" onClick={this.formSubmitHandler}>FIND</Button>{' '}


        </Form>
        </div>
        <div>
      
       <br/><br/>
{/* <ReactBootStrap.Table striped bordered hover>
  <thead>
    <tr>

      <th>Category</th>
      <th>Name</th>
      <th>Contact Number</th>
      <th>Profile</th>
     
    </tr>
  </thead>

<tbody>
  {contetntsDisplay}
</tbody>


</ReactBootStrap.Table> */}
<div>
{contetntsDisplay}
</div>
      </div> 
 </div>
 </Jumbotron>
</>
    );
  }
}

export default UserEditProfile;

