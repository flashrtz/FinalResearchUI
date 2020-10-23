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
import ImageGallery from 'react-image-gallery';

//SCSS
import "react-image-gallery/styles/scss/image-gallery.scss";

//CSS
import "react-image-gallery/styles/css/image-gallery.css";


const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];
   
  
class UserViewProfile extends Component {

     
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
componentWillMount() {

  var userid = window.sessionStorage.getItem("UserId");
  CommonGet('users/findById',userid)
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
    const myStyle = {
      width: "400px",
   };
   
   let user = this.state.userList;
   let count = (user.guestCount == 1) ? "Less than 50" : (user.guestCount == 2) ? "50-100" : (user.guestCount == 3) ? "100-500" :'More than 500';
   let userCategory = (user.userCategory == 1) ? "Lightings" : (user.userCategory == 2) ? "Sounds" : (user.userCategory == 3) ? "Event Hostler" :'Guest';

    return (

<>
 <ImageGallery items={images} />;

 <div class="d-flex justify-content-center">
        <Form style={myStyle}>
        <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label><h2>{window.sessionStorage.getItem("Name")}</h2></Form.Label>
            
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
             <Form.Label>Expecting Number of Guests</Form.Label>
             
             <Form.Control type="text" placeholder="EventLocation" name="email" value={count} disabled required/>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
             <Form.Label>Category</Form.Label>
             <Form.Control type="text" placeholder="EventLocation" name="email" value={userCategory} disabled required/>

        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
             <Form.Label>Description</Form.Label>
             <Form.Control type="textArea" placeholder="EventLocation" name="email" value={this.state.userCategory} disabled required/>
        </Form.Group>
        <Form.Row>
        <Form.Group as={Form.Col} controlId="formGridCity"  >
      
          <Form.Label>EmailAddress</Form.Label>
          <Form.Control type="text" placeholder="EventLocation" name="email" value={this.state.location} disabled onChange={(e)=>this.setState({location:e.target.value})} required/>
       </Form.Group><br/><br/>
       <Form.Group as={Form.Col} controlId="formGridCity"  >
      
      <Form.Label></Form.Label>
      <Form.Control type="text" placeholder="EventLocation" name="email" value={this.state.location} disabled onChange={(e)=>this.setState({location:e.target.value})} required/>
   </Form.Group><br/><br/>
      
      </Form.Row><br/><br/>
     
        
        </Form>
        </div>
       
</>
    );
  }
}

export default UserViewProfile;

