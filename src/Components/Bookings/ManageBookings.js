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


class ManageBookings extends Component {

     
   state={

            id:0,
            category:"",
            dateAndTime: new Date(),
            location:"",
            guestCount:"",
            userList:[],
            supplierList:[],
            nameEvent:"",
            nameEventHostler:"",
            contactEventHostler:"",
            bookingList:[],
            userId:"",
            isEdit:false



}

constructor(props) {
    super(props);
      
    }
componentWillMount() {
var userId = window.sessionStorage.getItem("UserId");
//let userId = window.sessionStorage.getItem("UserId")
if(userId == null){
  this.props.history.push('/CheckDashboard');

}
//window.alert(userId);
this.setState({
  userId : userId
})

  var queryString  = 'userId='+ userId;
  let formdata = {
    userId : userId
  }

  CommonGetByParams('manageSupplierBooking/userIdGet',queryString)
  .then(res=>res.json())
  .then(json =>{
      this.setState({
         bookingList:json
      })
  });

}

handleChange = date => {
  this.setState({
    dateAndTime: moment(date).format('DD-MM-YYYY')
  });
};
ticketCategoryCountChange = (e) =>{
this.setState({
  ticketCategoryCount:e.target.value
              })

}       

formItemDeleteHandler = (id) => {
       
  confirmAlert({
      customUI: ({ onClose }) => {
          return (
              <div className='custom-ui'>
                  <center className="wellb">
                      <h3 className="text text-danger text20">Confirm to Delete</h3>
                      <p className="text text-info">Are you sure you want to disable this User?</p>
                      <br />
                      <button className="btn btn-info" onClick={onClose}>No</button>
                      <button
                          className="btn btn-warning m20"
                          onClick = {()=>{this.deleteUser(id);onClose();}}
                        //   onClick={() => {
                        //       this.setState(prevState => ({ 
                        //           surveyList: prevState.surveyList.filter(item => item.id != id)
                        //       }));
                            //  onClose();
                        // /</center>/ }
                       // }
                       >
                          Yes, Delete it!
                      </button>
                  </center>
              </div>
          );
      }
  });
};

formItemEditHandler = (id) => {
  this.state.bookingList.map((item) => {
      if (id == item._id) {
  
          this.setState({
           nameEvent:item.nameEvent,
           nameEventHostler:item.nameEventHostler,
           contactEventHostler:item.contactEventHostler,
           location:item.location,
           dateAndTime:item.dateAndTime,
           userId : item.userId,
           isEdit:true
          });
  
      }
  
    });
}
formSubmitHandler=()=>{

    let formdata  = {
        nameEvent:this.state.nameEvent,
        nameEventHostler:this.state.nameEventHostler,
        contactEventHostler:this.state.contactEventHostler,
        location:this.state.location,
        dateAndTime:this.state.dateAndTime,
        userId : this.state.userId,
        userCategory:sessionStorage.getItem("UserCategory"),
        firstname:sessionStorage.getItem("Name"),
        email:sessionStorage.getItem("UserEmail"),
        guestCount:sessionStorage.getItem("guestcount"),
        phoneNumber:sessionStorage.getItem("phoneNumber"),

     
    }
 /// window.alert(JSON.stringify(formdata));
    CommonPost('manageSupplierBooking/add/',formdata)
    .then(res=>res.json())
    .then(json =>{
        swal("Booking Added!");
        console.log(json);
     // window.location.reload();
    });
  }
  
//Edit Handler
formSubmitEdit = () => {

  let formdata  = {
    nameEvent:this.state.nameEvent,
    nameEventHostler:this.state.nameEventHostler,
    contactEventHostler:this.state.contactEventHostler,
    location:this.state.location,
    dateAndTime:this.state.dateAndTime,
    userId : this.state.userId
 
}
//window.alert(JSON.stringify(formdata));
CommonPost('manageSupplierBooking/update/',formdata)
.then(res=>res.json())
.then(json =>{
    swal("Booking Updated!");
    console.log(json);
   window.location.reload();
});



}


renderDisplay=(contetnts) =>{

  let tableContent = contetnts === undefined ? null : (
    contetnts.map((item)=>{
    
      return(

          <tr key ={item._id}>
            <td>{item.nameEvent}</td>
            <td>{item.location}</td>
            <td>{item.nameEventHostler}</td>
            <td>{item.dateAndTime}</td>
            <td><a title="Edit " onClick={(event) => this.formItemEditHandler(item._id)} ><i className="i class="i class="fa fa-list-alt fa-2x fore-color-cyan icon-blue"></i> </a></td>
            <td><a title="Delete " onClick={(event) => this.formItemDeleteHandler(item._id)} ><i className="fa fa-trash fa-2x fore-color-cyan icon-blue"></i> </a></td>
            </tr>

      );

  }));

  return(
    <div class="table-responsive" style={{ overflow: "hidden" }}>
        <table id="example1" className="table table-condensed tfont" style={{ fontSize: "12" }}>
            <thead>
                <tr>
                <th>Event Name</th>
                <th>Location</th>
                <th>EventManager</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
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
    let contetntsDisplay = this.renderDisplay(this.state.bookingList);
    const myStyle = {
        width: "400px",
     };
   
    return (

<>

    <div>
        <div>
            <h1>MANAGE BOOKING</h1>
            </div>
        <div class="d-flex justify-content-center">
        <Form style={myStyle}>
  
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name of the Event</Form.Label>
          <Form.Control type="text" placeholder="Name of the Event" name="nameEvent" value={this.state.nameEvent} onChange={(e)=>this.setState({nameEvent:e.target.value})} required/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name of the Event Hostler</Form.Label>
          <Form.Control type="text" placeholder="Name of the Event Hostler" name="nameEvent" value={this.state.nameEventHostler} onChange={(e)=>this.setState({nameEventHostler:e.target.value})} required/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Contact of the Event Hostler</Form.Label>
          <Form.Control type="text" placeholder="Contact of the Event Hostler" name="nameEvent" value={this.state.contactEventHostler} onChange={(e)=>this.setState({contactEventHostler:e.target.value})} required/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Location of the Event</Form.Label>
          <Form.Control type="text" placeholder="EventLocation" name="email" value={this.state.location} onChange={(e)=>this.setState({location:e.target.value})} required/>
        </Form.Group>
        <Form.Label>Scheduled Date and Time</Form.Label><br/>
        <DatePicker
        format="DD/MM/YYYY"
        value={this.state.dateAndTime}
        minDate={new Date()}
       // selected={this.state.dateAndTime}
        onChange={this.handleChange}
        showTimeSelect
      /><br/><br/>
      
      <Button variant="info" onClick={this.formSubmitEdit} hidden={!this.state.isEdit}>Edit</Button>{' '}

        <Button variant="info" onClick={this.formSubmitHandler}>ADD</Button>{' '}


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

export default ManageBookings;

