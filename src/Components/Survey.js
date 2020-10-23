import React, { Component } from 'react';
// import Button from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; // Import 
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ImageUploader from 'react-images-upload';
import {CommonGet, CommonPost , CommonDeleteById,CommonGetByParams} from "./../config";
import swal from 'sweetalert';

class Survey extends Component {
     
   state={

            id:0,
            isModalOpen:false,
            isModalGoogleOpen:false,
            categoryAnswer1:"",
            categoryName:"",
            answer1:"",
            answer2:"",
            answer3:"",
            answer4:"",
            gLink:"",

            surveyList:[],
            pictures: [] ,


}

constructor(props) {
    
    super(props);
        this.onDrop = this.onDrop.bind(this);

    }

componentWillMount(){

    let userId = window.sessionStorage.getItem("UserId")
    if(userId == null){
      this.props.history.push('/CheckDashboard');
    }

}

componentWillUpdate() {}

categoryName = (e) =>{

    this.setState({
        categoryName : e.target.value
    });

}

gLinkChange = (e) =>{

    this.setState({
        gLink : e.target.value
    });

}


categoryAnswer1 = (e) =>{

    this.setState({
        answer1 : e.target.value
    });

}
categoryAnswer2 = (e) =>{

    this.setState({
        answer2 : e.target.value
    });

}
categoryAnswer3 = (e) =>{

    this.setState({
        answer3 : e.target.value
    });

}
categoryAnswer4 = (e) =>{

    this.setState({
        answer4 : e.target.value
    });

}



closeModal = ()=>{
    this.setState({
        isModalOpen:false
    
    });
    console.log("giya nehda ");

}

closeGoogleModal = ()=>{
    this.setState({
        isModalGoogleOpen:false
    
    });
    console.log("giya nehda ");

}

    modalOpen =()=>{
        this.setState({
            isModalOpen:true
        
        });
        console.log("ko");
    }

    
    modalGoogleOpen =()=>{
        this.setState({
            isModalGoogleOpen:true
        
        });
        console.log("ko");
    }


    addModal =() =>{

        //creating an object for the list
        var obj={};
        obj.categoryName = this.state.categoryName;
        obj.id=this.state.id;
        obj.answer1 = this.state.answer1;
        obj.answer2 = this.state.answer2;
        obj.answer3 = this.state.answer3;
        obj.answer4 = this.state.answer4;

        this.state.surveyList.push(obj);

        this.setState({

            surveyList: this.state.surveyList,
            id: this.state.id+1

        });
        swal("Added Successfully!");


        console.log("Added Succesfully!");



      //  window.sessionStorage.setItem("YOLO", x);
            
    }

    submitGoogleModal=() => {

        window.sessionStorage.setItem("googleLink",this.state.gLink);
    }


    rendarGoogleModal() {
        if (!this.state.isModalGoogleOpen) return;
        return(
                <div className='popup'>  
                <div className='popup_inner'>  
                <label>Add the google survey link:</label>
                <div> <input type="text" id="categoryId" value={this.state.gLink}  onChange={(e) => this.gLinkChange(e)}></input></div> <br/> <br/> <br/>
                      
                    <div class="button_formbutton">
                        <button onClick = {this.submitGoogleModal}>Submit</button>
                    </div>
                    <div class="button_formbutton">
                        <button onClick = {this.closeGoogleModal}>Close</button>
                    </div>
                </div>
             </div>

        );

    };
    rendarModal() {
        if (!this.state.isModalOpen) return;
        return(
                <div className='popup'>  
                <div className='popup_inner'>  
                <label>Add a Category:</label>
                <div> <input type="text" id="categoryId" value={this.state.categoryName}  onChange={(e) => this.categoryName(e)}></input></div> <br/> <br/> <br/>
                        <div>
                            <input type="text" id="categoryAnswer1" placeholder="Answer" value={this.state.answer1}  onChange={(e) => this.categoryAnswer1(e)} ></input>
                            <input type="text" id="categoryAnswer2"placeholder="Answer" value={this.state.answer2} onChange={(e) => this.categoryAnswer2(e)}></input>
                            <input type="text" id="categoryAnswer3" placeholder="Answer" value={this.state.answer3} onChange={(e) => this.categoryAnswer3(e)}></input>
                            <input type="text" id="categoryAnswer4"placeholder="Answer" value={this.state.answer4} onChange={(e) => this.categoryAnswer4(e)}></input>
                           <br/> <br/> <br/>
                        </div>
                    <div class="button_formbutton">
                        
                        <button onClick = {this.addModal}>Add</button>
                        
                    </div>
                    <div class="button_formbutton">
                        <button onClick = {this.closeModal}>Close</button>
                        
                    </div>
                </div>
             </div>

        );

    };

    submitSurvey =()=>{

        let linkgoogle = window.sessionStorage.getItem("googleLink")
    if(linkgoogle != null)
        {

            let formdata  = {
                userId:window.sessionStorage.getItem("UserId"),
                userEmail:window.sessionStorage.getItem("UserEmail"),
                link:window.sessionStorage.getItem("googleLink"),              
            
              }
         
            
              CommonPost('surveyLink/add',formdata)
              .then(res=>res.json())
              .then(json =>{
                swal({
                    title: "Survey Added And Published Successfully!",
                    icon: "success",
                    button: "OK",
                  });
                  console.log(json);
                 //window.location.reload();
              });


        }
        else{
                let formdata = this.state.surveyList.map((item)=>{
    return{
        userId:window.sessionStorage.getItem("UserEmail"),
        googleLink:window.sessionStorage.getItem("googleLink"),
        surveyTopic:"itemsurveyTopic",
        categoryName:item.categoryName,
        answer1:item.answer1,
        answer2:item.answer2,
        answer3:item.answer3,
        answer4:item.answer4,
    }
  });

  CommonPost('survey/addAll',formdata)
  .then(res=>res.json())
  .then(json =>{
    swal({
        title: "Survey Added And Published Successfully!",
        icon: "success",
        button: "OK",
      });
      console.log(json);
     //window.location.reload();
  });
}
    }

    formItemDeleteHandler = (id) => {
       
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <center className="wellb">
                            <h3 className="text text-danger text20">Confirm to Delete</h3>
                            <p className="text text-info">Are you sure you want to delete this row?</p>
                            <br />
                            <button className="btn btn-info" onClick={onClose}>No</button>
                            <button
                                className="btn btn-warning m20"
                                onClick={() => {
                                    this.setState(prevState => ({
                                        surveyList: prevState.surveyList.filter(item => item.id != id)
                                    }));
                                    onClose();
                                }}>
                                Yes, Delete it!
                            </button>
                        </center>
                    </div>
                );
            }
        });
    };


    rendertable = (cusmargin) => {
        console.log("JHSVADHJADHASVJHDSGH");
        let tableContent = cusmargin === undefined ? null : (
            cusmargin.map((cacc) => {
                 //var methodchange = document.getElementById("cinvestmentAdvisor");
                 //var methodName = methodchange.options[methodchange.selectedIndex].text;

                 //    console.log(methodName);
               

                return (
                    <tr>
                        <td>{cacc.categoryName}</td>
                        <td>{cacc.answer1}</td>
                        <td>{cacc.answer2}</td>
                        <td>{cacc.answer3}</td>
                        <td>{cacc.answer4}</td>
                        <td>
                           <a title="Delete " onClick={(event) => this.formItemDeleteHandler(cacc.id)} ><i className="fa fa-trash fa-2x fore-color-cyan icon-blue"></i> </a>
            
                        </td>
                    </tr>

                );
            })
        );

        return (
            //<div class="table-responsive">
            //    <table id="example" class="display dataTable no-footer" cellspacing="0" width="100%">
            <div className="col-md-12">
                <div className="table-responsive row-top-gap">
                    <table id="cycle" className="display dataTable no-footer">

                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Answer</th>
                                <th>Answer</th>
                                <th>Answer</th>
                                <th>Answer</th>
                            
                                <th className="no-sort">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table>
                </div>
            </div>

        );
        // this.jqueryScripts();
    };



    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
            
        });
    
        window.sessionStorage.setItem("pic",this.state.pictures);
    }


  render() {

    let table =this.rendertable(this.state.surveyList); 

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
                    <button type="submit"class="button_formbuttonsurvey" onClick = {this.modalOpen}>Add a Survey Topic</button>
        </div>
        <div class="submit">
                    <button type="submit"class="button_formbuttonsurvey" onClick = {this.modalGoogleOpen}>Add a Google Survey</button>
        </div>
    </div>
    );

    return (
<>
    <div>
        {form}
       {table}
       </div>
       <div>   {this.rendarModal()}</div>
       <div>   {this.rendarGoogleModal()}</div>
       <div>
        
       <div>
                    <button type="submit" class="button_formbuttonsub" onClick = {this.submitSurvey}>Submit</button>
                         
                         </div>
       </div>
       </>
    );
  }
}

export default Survey;