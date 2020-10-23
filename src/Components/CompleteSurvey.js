import React, { Component } from 'react';
// import Button from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; // Import 
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {CommonGet, CommonPost , CommonDeleteById,CommonGetByParams} from "./../config";
import swal from 'sweetalert';



class CompleteSurvey extends Component {

     
   state={

            id:0,
            isModalOpen:false,
            categoryAnswer1:"",
            categoryName:"",
            answer1:"",
            answer2:"",
            answer3:"",
            answer4:"",


            surveyList:[],
            pictures: [] ,


}

constructor(props) {
    super(props);
        }


componentWillMount(){
    let userId = window.sessionStorage.getItem("UserId")
    if(userId == null){
      this.props.history.push('/CheckDashboard');
    }

let surveyId = sessionStorage.getItem("surveyId");
CommonGet('survey/findById',surveyId)
    .then(res=>res.json())
    .then(json =>{
        this.setState({
           surveyList:json
        })
	});

}

componentWillUpdate() {}

  
 renderSurveys = () => {

        return(

            <div>
      <label>Category1</label>
      <br/>
      <label>Answer1</label>
      <br/>
      <label>Answer2</label>
      <br/>
      <label>Answer3</label>
      <br/>
      <label>Answer4</label>
      <br/>

                </div>

        );
        
        }


  render() {
      
    let survey= this.renderSurveys();
    // let table =this.rendertable(this.state.surveyList); 

    return (
<>
    <div>
       {survey}
       </div>

       <div>
        
       <div>
                    <button type="submit" class="button_formbuttonsub" onClick = {this.submitSurvey}>Submit</button>

                         </div>
       </div>
       </>
    );
  }
}

export default CompleteSurvey;