import React, { Component } from 'react';
// import Button from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; // Import 
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ImageUploader from 'react-images-upload';



class Survey extends Component {

     
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
        this.onDrop = this.onDrop.bind(this);
    }
componentWillUpdate() {}

categoryName = (e) =>{

    this.setState({
        categoryName : e.target.value
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


    modalOpen =()=>{
        this.setState({
            isModalOpen:true
        
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
        window.alert("Added Successfully!");


        console.log("Added Succesfully!");



      //  window.sessionStorage.setItem("YOLO", x);
            
    }

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

        window.sessionStorage.setItem("SurveyList",JSON.stringify(this.state.surveyList));
        console.log("Ela");
        if(this.state.surveyList != 0){
        window.alert("Survey Submitted Successfully!");
        }
        else{
       window.alert("Please create a survey!");
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
    </div>
    );

    return (
<>
    <div>
      
        {form}
    
       {table}
       </div>
       <div>   {this.rendarModal()}</div>
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