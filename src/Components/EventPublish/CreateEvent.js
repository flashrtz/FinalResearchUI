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
import swal from 'sweetalert';

import {CommonGet, CommonPost , CommonDeleteById} from "../../config";

class CreateEvent extends Component {

     
   state={

            id:0,
            isModalOpen:false,
            categoryAnswer1:"",
            categoryName:"",
            answer1:"",
            answer2:"",
            answer3:"",
            answer4:"",
            ticketCategoryCount:"",
            countList:[],
            ticketOne:"",
            ticketTwo:"",
            ticketThree:"",
            ticketOnePrice:"",
            ticketTwoPrice:"",
            ticketThreePrice:"",
            surveyList:[],
            pictures: [] ,
            description:"",
            dateAndTime: new Date(),
            location:""


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


componentWillUpdate() {}
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

renderTicketCategories = () => {

  if(this.state.ticketCategoryCount == 'a'){
     return (
      <Form.Group controlId="formBasicEmail">
      <Form.Label>Ticket - Primary</Form.Label>
      <Form.Control type="text" placeholder = "Ticket Label" name="email" value={this.state.ticketOne} onChange={(e) => this.setState({ticketOne : e.target.value})} required/>
      <Form.Control type="text" placeholder = "Price"  name="email" value={this.state.ticketOnePrice} onChange={(e) => this.setState({ticketOnePrice : e.target.value})} required/>
    </Form.Group>
     );
  }
  if(this.state.ticketCategoryCount == 'b'){
    return (
     <>
     <Form.Group controlId="formBasicEmail">
     <Form.Label>Ticket - Primary</Form.Label>
     <Form.Control type="text" placeholder = "Ticket Label" name="email" value={this.state.ticketOne} onChange={(e) => this.setState({ticketOne : e.target.value})} required/>
     <Form.Control type="text" placeholder = "Price" name="email" value={this.state.ticketOnePrice} onChange={(e) => this.setState({ticketOnePrice : e.target.value})} required/>
     
     
   </Form.Group>
    
    <Form.Group controlId="formBasicEmail">
    <Form.Label>Ticket - Secondary</Form.Label>
    <Form.Control type="text" placeholder = "Ticket Label" name="email" value={this.state.ticketTwo} onChange={(e) => this.setState({ticketTwo : e.target.value})}  required/>
    <Form.Control type="text" placeholder = "Price" name="email" value={this.state.ticketTwoPrice} onChange={(e) => this.setState({ticketTwoPrice : e.target.value})}  required/>
  </Form.Group>
  </>
    );

 }

 if(this.state.ticketCategoryCount == 'c'){
  return (
   <>
   <Form.Group controlId="formBasicEmail">
   <Form.Label>Ticket - Primary</Form.Label>
   <Form.Control type="text" placeholder = "Ticket Label" name="email" value={this.state.ticketOne} onChange={(e) => this.setState({ticketOne : e.target.value})} required/>
   <Form.Control type="text" placeholder = "Price" name="email" value={this.state.ticketOnePrice} onChange={(e) => this.setState({ticketOnePrice : e.target.value})} required/>
 
 </Form.Group>
  
  <Form.Group controlId="formBasicEmail">
  <Form.Label>Ticket - Secondary</Form.Label>
  <Form.Control type="text" name="email" placeholder = "Ticket Label" value={this.state.ticketTwo} onChange={(e) => this.setState({ticketTwo : e.target.value})}  required/>
  <Form.Control type="text" placeholder = "Price" name="email" value={this.state.ticketTwoPrice} onChange={(e) => this.setState({ticketTwoPrice : e.target.value})}  required/>
</Form.Group>

<Form.Group controlId="formBasicEmail">
   <Form.Label>Ticket - Tertiary</Form.Label>
   <Form.Control type="text"  name="email" placeholder = "Ticket Label" value={this.state.ticketThree} onChange={(e) => this.setState({ticketThree : e.target.value})}  required/>
   <Form.Control type="text" placeholder = "Price"  name="email" value={this.state.ticketThreePrice} onChange={(e) => this.setState({ticketThreePrice : e.target.value})}  required/>
 </Form.Group>
</>
  );

  }
}

formSubmitHandler=()=>{

  let formdata  = {
    title:this.state.title,
    description:this.state.description,
    numberofTicketCategories:this.state.ticketCategoryCount,
    dateAndTime:this.state.dateAndTime,
    location:this.state.location,
    ticketOne:this.state.ticketOne,
    ticketTwo:this.state.ticketOnePrice,
    ticketThree:this.state.ticketTwo,
    ticketOnePrice:this.state.ticketTwoPrice,
    ticketTwoPrice:this.state.ticketThree,
    ticketThreePrice:this.state.ticketThreePrice,

  }
//window.alert(JSON.stringify(formdata));
  CommonPost('createEvents/add/',formdata)
  .then(res=>res.json())
  .then(json =>{
    swal({
      title: "Event published Successfully!",
      text: "Success!",
      icon: "success",
      button: "OK",
    });
      console.log(json);
    // window.location.reload();
  });
}


  render() {

    let contents = this.renderTicketCategories();

    const myStyle = {
        width: "400px",
     };
    let form = (
        <div>
            {/* <div class="submit">
                        <button type="submit" class="button-blue" onClick = {this.modalBannerOpen}>Add a Survey Banner</button> */}
                        
                <ImageUploader
                    withIcon={true}
                    buttonText='Add Survey Poster'
                    onChange={this.onDrop}
                    imgExtension={['.jpg','.png']}
                    maxFileSize={5242880}
                />
             <div class="submit">
                        <button type="submit"class="button_formbuttonsurvey" onClick = {this.modalOpen}>Add Event Banner</button>
            </div>
        </div>
        );
    return (

<>

    <div  styles={{ backgroundImage:`url(require("C:\Users\Iman Dissanayake\Desktop\ProjectPhotos\YOLO.jpg"))` }}>
        {form}
        <div class="d-flex justify-content-center">
        <Form style={myStyle}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title of Event</Form.Label>
          <Form.Control type="text" placeholder="Title" name="email" value={this.state.title} onChange={(e)=>this.setState({title:e.target.value})} required/>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="3" value={this.state.description} onChange={(e)=>this.setState({description:e.target.value})}/>
          </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
             <Form.Label>Number of Ticket Categories</Form.Label>
             <Form.Control as="select" value={this.state.ticketCategoryCount} onChange ={(e) => this.ticketCategoryCountChange(e)}>
                <option value = '-1'>-Please Select-</option>
                <option value = 'a'>1</option>
                <option value = 'b'>2</option>
                <option value = 'c'>3</option>
             </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
         {contents}
        </Form.Group>
        <Form.Label>Scheduled Date and Time</Form.Label><br/>
        <DatePicker
        selected={this.state.dateAndTime}
        minDate={new Date()}
        onChange={this.handleChange}
        showTimeSelect
      /><br/><br/>
       <Form.Group controlId="formBasicEmail">
          <Form.Label>Location of the Event</Form.Label>
          <Form.Control type="text" placeholder="EventLocation" name="email" value={this.state.location} onChange={(e)=>this.setState({location:e.target.value})} required/>
        </Form.Group>

        <Button variant="outline-success" onClick={this.formSubmitHandler}>Publish</Button>{' '}


        </Form>
        </div>
      </div>
</>
    );
  }
}

export default CreateEvent;

