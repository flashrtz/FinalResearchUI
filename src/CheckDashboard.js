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
import {CommonGet, CommonPost , CommonDeleteById,CommonGetByParams} from "./config";
import { mockComponent } from 'react-dom/test-utils';
import moment from 'moment';
import * as ReactBootStrap from 'react-bootstrap';
import swal from 'sweetalert';
import Rating from 'react-rating'


import "./assets/css/bootstrap.css";
import "./assets/css/style.css";
import "./assets/css/animate.css";

class CheckDasboard extends Component {

     
   state={


	userList:[],
	eventList:[],
	reviewList:[],
	surveyList:[],
	surveyLinkList:[],
	isModalOpen:false,
	review:"",
	rate:0,

}

constructor(props) {
    super(props);
      
    }
componentWillMount() {
    CommonGet('users/all','')
    .then(res=>res.json())
    .then(json =>{
        this.setState({
           userList:json
        })
	});
	
	CommonGet('createEvents/all','')
    .then(res=>res.json())
    .then(json =>{
        this.setState({
           eventList:json
        })
	});
	CommonGet('survey/all','')
    .then(res=>res.json())
    .then(json =>{
        this.setState({
           surveyList:json
        })
	});
	CommonGet('surveyLink/all','')
    .then(res=>res.json())
    .then(json =>{
        this.setState({
           surveyLinkList:json
        })
	});
	CommonGet('review/all','')
    .then(res=>res.json())
    .then(json =>{
        this.setState({
           reviewList:json
        })
    });
}

//open modal

modalOpen =()=>{
	this.setState({

		isModalOpen:true
	
	});
	console.log("ko");

  }

  //close modal
  
  closeModal = ()=>{
	this.setState({

		isModalOpen:false
	
	});
	
  
  }

  addModal=()=>{
	let formdata ={
			email:window.sessionStorage.getItem("UserEmail"),
			review:this.state.review,
			rating:this.state.rate
	  }
	
	  CommonPost('review/add',formdata)
	  .then(res=>res.json())
	  .then(json =>{
		swal({
			title: "Review Added Successfully!",
			icon: "success",
			button: "OK",
		  });
		  //console.log(json);
		 //window.location.reload();  
	  });

  }
  
//add rate
rateAdd =(rate) => {

this.setState({

	rate:rate

})

}



//add  modal
rendarModal() {
	if (!this.state.isModalOpen) return;
	return(
		<div>
			
			<div className='popup'>  
		    <div className='popup_inner'>  
			
			<label>Add a Category:</label>
			<div> <input type="text" id="categoryId"  placeholder = "Review" onChange={(e) => this.setState({review:e.target.value})}></input></div> <br/><br/>
			<div><h3  style={{ color: 'red' }}><b>Give Your Rating</b></h3><Rating initialRating={this.state.rate} onChange={(rate) => this.rateAdd(rate)}></Rating></div><br/><br/>
			{/* <section class="site-hero"  id="section-homeModal" ></section> */}
			<div class="button_formbutton">
						  <button onClick = {this.addModal}>Add</button>
					  </div>
					  <div class="button_formbutton">
						  <button onClick = {this.closeModal}>Close</button>
						  
					  </div>
					
				</div>
			
			 </div>
		 </div>
  
	);
  
  };
  
renderSurveys = () => {


let length = this.state.eventList.length;

let tableContetnts = this.state.eventList.filter((item,i)=>{

if(i>length-6){

	return item;
}

})

.map((item,i)=>{


    return (

        
         <div class="resume-item mb-4">
         <span class="date"><span class="icon-calendar"></span>{item.userEmail}</span>
         <h3>LINK To The Survey!</h3>
		 <h3><a href={item.link} >{item.link}</a></h3>
         <span class="school">{item.firstname}</span>
        </div>
  

    )

})


return (
<div>
    {tableContetnts}
    </div>

)

}

//render upcoming Events

renderUpcomingEvents= () => {


	let length = this.state.eventList.length;
	
	let tableContetnts = this.state.eventList.filter((item,i)=>{
	
	if(i>length-4){
	
		return item;
	}
	
	})
	
	.map((item,i)=>{
	
	
		return (
	
			
		
			<div class="col-sm-6 col-lg-4 mb-4">
				<div class="blog-entry">
					<a href="#"><img src="./assets/images/poster3.jpg" alt="Image placeholder" class="img-fluid" /></a>
					<div class="blog-entry-text">
						<h3><a href="#">Upcoming Events</a></h3>
							<p class="mb-4">{item.title}</p>

						<div class="meta">
							<a href="#"><span class="icon-calendar"></span> {moment(item.dateAndTime).format("ll")}</a>
							<a href="#"><span class="icon-bubble"></span> {item.location}</a>
						</div>
					</div>
				</div>
			</div>
		

	  
	
		)
	
	})
	
	
	return (
	<div>
		{tableContetnts}
		</div>
	
	)
	
	}



//render Reviews
renderReviews = () => {

	let length = this.state.reviewList.length;
	
	let tableContetnts = this.state.reviewList.filter((item,i)=>{
	if(i>length-4){
		return item;
	}
	})
	.map((item,i)=>{
    return (
		<div>
			<div class="col-md-6">
				<div class="block-47 d-flex mb-5">
					<blockquote class="block-47-quote">
	<p>&ldquo;{item.review}&rdquo;</p>
	<cite class="block-47-quote-author">&mdash; {item.email}</cite><br/>
							<Rating  emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" readonly initialRating={item.rating} style={{ color: 'yellow' }}/>
					</blockquote>
				
				</div>
			</div>
		</div>
	)
});
return (
<div>
    {tableContetnts}
    </div>

	);

}

  render() {
   
	let reviewContents = this.renderReviews();
	let yosurveys = this.renderSurveys();
	let upEvents = this.renderUpcomingEvents();
	
    return (
<div>

	<section class="site-hero"  id="section-home" >
		<div class="container">
			<div class="row intro-text align-items-center justify-content-center">
				<div class="col-md-10 text-center pt-5">

					<h1 class="site-heading site-animate">Welcome <strong class="d-block">Doctor Event</strong></h1>
					<strong class="d-block text-white text-uppercase letter-spacing">Research Project By Iman Dissanayake</strong>

				</div>
			</div>
		</div>
	</section> 
	<section class="site-section pb-0"  id="section-services">
		<div class="container">

			<div class="row mb-4">
				<div class="col-md-12">
					<div class="section-heading text-center">
						<h2><strong> Services </strong></h2>
						<h2>We offer you many Services in order to help you have the perfect event.Get in Contact with the suppliers and host your own event.</h2>
					</div>
				</div>
			</div>

			 <div class="row">
	
				<div class="col-md-6 col-lg-4 text-center mb-5">
					<div class="site-service-item site-animate" data-animate-effect="fadeIn">
					<div class="block-47 d-flex mb-5">
					<div class="block-47-image">
								<img src="./assets/images/poster2.jpg" alt="Image placeholder" class="img-fluid" />
								</div>
						<h3 class="mb-4"> Lighting</h3></div>
						<p><li>Enhances the Mood</li><li>Change Your Guests’ Experience</li><li>Entertain and Mesmerize Your Guests</li><li>Enhances the Mood</li></p>
						<p><a href="#" class="site-link">Learn More <i class="icon-chevron-right"></i></a></p>
					</div>	
				</div>
				<div class="col-md-6 col-lg-4 text-center mb-5">
					<div class="site-service-item site-animate" data-animate-effect="fadeIn">
					<div class="block-47 d-flex mb-5">
					<div class="block-47-image">
								<img src="./assets/images/poster3.jpg" alt="Image placeholder" class="img-fluid" />
								</div>
						<h3 class="mb-4">Sounds</h3></div>
						<p><li>Commendable Connection</li><li>Impeccable interaction</li><li>Magnetic Management</li><li>Enhances the Mood</li></p>
						<p><a href="#" class="site-link">Learn More <i class="icon-chevron-right"></i></a></p>
					</div>	
				</div>
				<div class="col-md-6 col-lg-4 text-center mb-5">
					<div class="site-service-item site-animate" data-animate-effect="fadeIn">
					<div class="block-47 d-flex mb-5">
					<div class="block-47-image">
								<img src="./assets/images/poster4.jpg" alt="Image placeholder" class="img-fluid" />
								</div>
						<h3 class="mb-4"> Event Hostler</h3></div>
						<p><li>Audience favored events hosting</li><li>Best Locations</li><li>Highly entertaining event</li><li>Hosting unforgetable memories</li></p>
						<p><a href="#" class="site-link">Learn More <i class="icon-chevron-right"></i></a></p>
					</div>	
				</div>
				{/* <div class="col-md-6 col-lg-4 text-center mb-5">
					<div class="site-service-item site-animate" data-animate-effect="fadeIn">
					<div class="block-47 d-flex mb-5">
					<div class="block-47-image">
								<img src="./assets/images/poster5.jpg" alt="Image placeholder" class="img-fluid" />
								</div>
						<h3 class="mb-4"> Mobile Application</h3></div>
						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
						<p><a href="#" class="site-link">Learn More <i class="icon-chevron-right"></i></a></p>
					</div>	
				</div>
				<div class="col-md-6 col-lg-4 text-center mb-5">
					<div class="site-service-item site-animate" data-animate-effect="fadeIn">
					<div class="block-47 d-flex mb-5">
					<div class="block-47-image">
								<img src="./assets/images/poster6.jpg" alt="Image placeholder" class="img-fluid" />
								</div>
						<h3 class="mb-4"> About Us</h3></div>
						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
						<p><a href="#" class="site-link">Learn More <i class="icon-chevron-right"></i></a></p>
					</div>	
				</div> */}

				

			</div>
		</div>
	</section>

	{/* 
				<div class="row">
					<div class="section-heading text-center col-md-12">
						<h2>Featured <strong>Portfolio</strong></h2>
					</div>
				</div>
				<div class="filters">
					<ul>
						<li class="active" data-filter="*">All</li>
						<li data-filter=".packaging">Packaging</li>
						<li data-filter=".mockup">Mockup</li>
						<li data-filter=".typography">Typography</li>
						<li data-filter=".photography">Photography</li>
					</ul>
				</div> */}

	    
	

			<div class="row">
				<div class="col-md-12 mb-5">
					<div class="section-heading text-center">
						<h2> <strong>Surveys</strong></h2>
					</div>
				</div>
				<div class="col-md-6">
					<h2 class="mb-5">Complete surveys and win free Tickets!</h2>
                    
                    {yosurveys}
                     
				</div> 
				<div class="col-md-6">
					<h2 class="mb-5">Win a free ticket!</h2>
				</div>
			</div>
	
			<section class="site-section" id="section-blog">
		<div class="container">
			<div class="row">
				<div class="col-md-12 mb-5">
					<div class="section-heading text-center">
						<h2>UpComing <strong>Events</strong></h2>
					</div>
				</div>
			</div>
			<div class="row">
			{upEvents}
			</div>
			<div class="row">
				<div class="col-sm-6 col-lg-4 mb-4">
					<div class="blog-entry">
						<a href="#"><img src="./assets/images/poster1.jpg" alt="Image placeholder" class="img-fluid" /></a>
						<div class="blog-entry-text">
							<h3><a href="#">Upcoming Events</a></h3>
							<p class="mb-4">Keep the date reserved.</p>

							<div class="meta">
								<a href="#"><span class="icon-calendar"></span> Aug 7, 2018</a>
								<a href="#"><span class="icon-bubble"></span> 5 Comments</a>
							</div>
						</div>
					</div>
				</div>

				<div class="col-sm-6 col-lg-4 mb-4">
					<div class="blog-entry">
						<a href="#"><img src="./assets/images/poster2.jpg" alt="Image placeholder" class="img-fluid" /></a>
						<div class="blog-entry-text">
							<h3><a href="#">Upcoming Events</a></h3>
							<p class="mb-4">Keep the date reserved.</p>

							<div class="meta">
								<a href="#"><span class="icon-calendar"></span> Aug 7, 2018</a>
								<a href="#"><span class="icon-bubble"></span> 5 Comments</a>
							</div>
						</div>
					</div>
				</div>

				<div class="col-sm-6 col-lg-4 mb-4">
					<div class="blog-entry">
						<a href="#"><img src="./assets/images/poster3.jpg" alt="Image placeholder" class="img-fluid" /></a>
						<div class="blog-entry-text">
							<h3><a href="#">Upcoming Events</a></h3>
							<p class="mb-4">Keep the date reserved.</p>

							<div class="meta">
								<a href="#"><span class="icon-calendar"></span> Aug 7, 2018</a>
								<a href="#"><span class="icon-bubble"></span> 5 Comments</a>
							</div>
						</div>
					</div>
				</div>

				<div class="col-sm-6 col-lg-4 mb-4">
					<div class="blog-entry">
						<a href="#"><img src="./assets/images/poster4.jpg" alt="Image placeholder" class="img-fluid" /></a>
						<div class="blog-entry-text">
							<h3><a href="#">Upcoming Events</a></h3>
							<p class="mb-4">Keep the date reserved.</p>

							<div class="meta">
								<a href="#"><span class="icon-calendar"></span> Aug 7, 2018</a>
								<a href="#"><span class="icon-bubble"></span> 5 Comments</a>
							</div>
						</div>
					</div>
				</div>

				<div class="col-sm-6 col-lg-4 mb-4">
					<div class="blog-entry">
						<a href="#"><img src="./assets/images/poster5.jpg" alt="Image placeholder" class="img-fluid" /></a>
						<div class="blog-entry-text">
							<h3><a href="#">Upcoming Events</a></h3>
							<p class="mb-4">Keep the date reserved. </p>
							<div class="meta">
								<a href="#"><span class="icon-calendar"></span> Aug 7, 2018</a>
								<a href="#"><span class="icon-bubble"></span> 5 Comments</a>
							</div>
						</div>
					</div>
				</div>

				<div class="col-sm-6 col-lg-4 mb-4">
					<div class="blog-entry">
						<a href="#"><img src="./assets/images/poster6.jpg" alt="Image placeholder" class="img-fluid" /></a>
						<div class="blog-entry-text">
							<h3><a href="#">Upcoming Events</a></h3>
							<p class="mb-4">Keep the date reserved.</p>
							<div class="meta">
								<a href="#"><span class="icon-calendar"></span> Aug 7, 2018</a>
								<a href="#"><span class="icon-bubble"></span> 5 Comments</a>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</section>

	

	<section class="site-section">
		<div class="container">
			<div class="row mb-5">
				<div class="col-md-12">
				<p>
						<a onClick ={this.modalOpen} class="btn btn-primary px-4 py-2 btn-sm smoothscroll">Add Review</a>
					</p>
					<div class="section-heading text-center">
						<h2><strong>Reviews</strong></h2>
					</div>
				</div>
			</div>
			<div class="row">
			{reviewContents}
			 {/* <div class="col-md-6">
					<div class="block-47 d-flex mb-5">
						<blockquote class="block-47-quote">
							<p>&ldquo;Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.&rdquo;</p>
							<cite class="block-47-quote-author">&mdash; Ethan McCown, CEO <a href="#">XYZ Inc.</a></cite>
						</blockquote>
					</div>
				</div>
				<div class="col-md-6">
					<div class="block-47 d-flex mb-5">
						<blockquote class="block-47-quote">
							<p>&ldquo;Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.&rdquo;</p>
							<cite class="block-47-quote-author">&mdash; Craig Gowen, CEO <a href="#">XYZ Inc.</a></cite>
						</blockquote>
					</div>
				</div>
				<div class="col-md-6">
					<div class="block-47 d-flex mb-5">
						<blockquote class="block-47-quote">
							<p>&ldquo;Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.&rdquo;</p>
							<cite class="block-47-quote-author">&mdash; Ethan McCown, CEO <a href="#">XYZ Inc.</a></cite>
						</blockquote>
					</div>
				</div>
				<div class="col-md-6">
					<div class="block-47 d-flex mb-5">
						<blockquote class="block-47-quote">
							<p>&ldquo;Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.&rdquo;</p>
							<cite class="block-47-quote-author">&mdash; Craig Gowen, CEO <a href="#">XYZ Inc.</a></cite>
						</blockquote>
					</div>
				</div>*/}
			</div> 
		</div>
	</section>

	<div>   {this.rendarModal()}</div>

	<footer class="site-footer">
		<div class="container">
			<div class="row mb-5">
				<p class="col-12 text-center">
					This website is made by Iman Dissanayake (1934193) as a Research Project for the Final year in BSc(Hons)Computer Science and Software Engineering of University Of Bedfordshire.
				</p>
			</div>
			
			
		</div>
	</footer>

    </div>
    );


  }

}

export default CheckDasboard;

