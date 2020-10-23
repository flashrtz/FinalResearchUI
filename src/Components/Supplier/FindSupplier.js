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

import swal from 'sweetalert';

import * as ReactBootStrap from 'react-bootstrap';


class FindSupplier extends Component {

     
   state={

            id:0,
            category:"",
            dateAndTime: new Date(),
            location:"",
            guestCount:"",
            userList:[],
            supplierList:[],
            bookingList:[],

}

constructor(props) {
    super(props);
      
    }

componentWillMount(){
  let userId = window.sessionStorage.getItem("UserId")
  if(userId == null){
    this.props.history.push('/CheckDashboard');

  }
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
    if(this.state.guestCount != "" && this.state.category != "")
{
  
    if(this.state.category != 3){
    var queryString  = 'guestCount='+this.state.guestCount+'&userCategory='+this.state.category+'&date='+moment(this.state.dateAndTime).format("DD-MM-YYYY");
    }
    else {
      var queryString  = 'guestCount='+this.state.guestCount+'&userCategory='+this.state.category+'&date='+moment(this.state.dateAndTime).format("DD-MM-YYYY");
    }

   // swal(queryString);

    CommonGetByParams('findSupplier/allcheck',queryString)
    .then(res=>res.json())
    .then(json =>{
      swal("Found Suppliers !");
        this.setState({
          supplierList:json

        })
       // console.log(json);
      
      })
      .then(()=>{
        CommonGetByParams('findSupplier/getallBookings')
        .then(res=>res.json())
        .then(json =>{
          swal("Found Suppliers !");
            this.setState({
              bookingList:json
    
            })
           // console.log(json);
          
          });

      })
    }
    else{

      swal("Please enter the reuqired fields !");
    }
  }

renderDisplay=(contetnts) =>{
//contetnts == this.state.bookingList
//Booking List contains all the events of the users
  let tableContent = contetnts === undefined ? null : (
    contetnts
    .filter((item)=>{

      if(item.dateAndTime != moment(this.state.dateAndTime).format("DD-MM-YYYY") && this.state.guestCount == item.guestCount && this.state.category == item.userCategory){
        return item
      }

    }) 
    .map((item)=>{
      
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

renderDisplayv1=(contetnts) =>{
  //contetnts == this.state.bookingList
  //Booking List contains all the events of the users

    let tableContent = contetnts === undefined ? null : (
      contetnts
      .filter((item)=>{
  
        if(item.dateAndTime != moment(this.state.dateAndTime).format("DD-MM-YYYY") && this.state.guestCount == item.guestCount){
          return item.userId
        }
  
      }) 
      .map((item)=>{
        return item
      })
    );
  //  console.log(tableContent)
    
  }


  render() {
    let contetntsDisplay = this.renderDisplay(this.state.bookingList);
    const myStyle = {
        width: "400px",
     };
   
    return (

<>

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
        minDate={new Date()}
        onChange={this.handleChange}
        showTimeSelect
      /><br/><br/>
      

        <Button variant="info" onClick={this.formSubmitHandler}>FIND</Button>{' '}


        </Form>
        </div>
        <div>
      
       <br/><br/>

<div>
{contetntsDisplay}
</div>
      </div> 
 </div>
</>
    );
  }
}

export default FindSupplier;

