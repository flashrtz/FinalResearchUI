import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {CommonGet, CommonPost , CommonDeleteById,CommonGetByParams} from "./../config";
//import * from 'C:/Users/Iman Dissanayake/Desktop/MyProject/new/public/css/stylegame.css'; //stylesheet

   
  
class loginform extends Component {

     
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
	
<div class="header">
		<div class="w3layouts_header_left">
			<div class="top-nav-text">
				<p>Call Us : <span class="call">+00 111 2222 333</span></p>
				<p>Email Us : <span class="mail"><a href="mailto:info@example.com">info@example.com</a></span></p>
			</div>
		</div>
		<div class="w3layouts_header_right">
			<form action="#" method="post">
				<input name="Search heare" type="search" placeholder="Search" required=""/>

				<input type="submit" value=""/>
			</form>
		</div>
		<div class="clearfix"> </div>
	</div>
	<div class="w3_navigation">
		<div class="container">
			<nav class="navbar navbar-default">
				<div class="navbar-header navbar-left">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
						data-target="#bs-example-navbar-collapse-1">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<div class="w3_navigation_pos">
						<h1><a href="index.html" title="Gaming Wonderland">G-Wonderland</a></h1>
					</div>
				</div>
			
				<div class="collapse navbar-collapse navbar-right" id="bs-example-navbar-collapse-1">
					<nav class="cl-effect-5" id="cl-effect-5">
						<ul class="nav navbar-nav">
							<li class="active"><a href="index.html"><span data-hover="Home">Home</span></a></li>

							<li><a href="#about" class="scroll"><span data-hover="About">About</span></a></li>
							<li><a href="#services" class="scroll"><span data-hover="Services">Services</span></a></li>
							<li><a href="#work" class="scroll"><span data-hover="Gallery">Gallery</span></a></li>
							<li><a href="#projects" class="scroll"><span data-hover="News">News</span></a></li>
							<li><a href="#mail" class="scroll"><span data-hover="Contact">Contact</span></a></li>
						</ul>
					</nav>
				</div>
			</nav>
		</div>
	</div>

	<div class="banner">

		<div class="slider">
			<div class="callbacks_container">
				<ul class="rslides" id="slider3">
					<li>
						<div class="slider-img">
							<img src="images/banner1.jpg" class="img-responsive" alt="Gaming Wonderland"/>
						</div>
						<div class="slider-info">

							<h4>phantom assassin - female - game </h4>
							<p>World building is component of fantasy </p>
							<a href="#about" class="hvr-shutter-in-horizontal scroll">Read More</a>
						</div>
					</li>
					<li>
						<div class="slider-img">
							<img src="images/banner2.jpg" class="img-responsive" alt="Gaming Wonderland"/>
						</div>
						<div class="slider-info">

							<h4>girl - ears - art - light</h4>
							<p>World building is component of fantasy </p>
							<a href="#about" class="hvr-shutter-in-horizontal scroll">Read More</a>
						</div>
					</li>
					<li>
						<div class="slider-img">
							<img src="images/banner3.jpg" class="img-responsive" alt="Gaming Wonderland"/>
						</div>
						<div class="slider-info">

							<h4>pegasus - horse - flowers</h4>
							<p>World building is component of fantasy </p>
							<a href="#about" class="hvr-shutter-in-horizontal scroll">Read More</a>
						</div>
					</li>


				</ul>

			</div>
			<div class="clearfix"></div>
		</div>

	</div>

	<div class="modal fade" id="myModal1" role="dialog">
		<div class="modal-dialog">
		
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4>Contracts</h4>
					<img src="images/ab.jpg" alt=" " class="img-responsive"/>
					<h5>Donec lobortis pharetra dolor</h5>
					<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
						industry's standard dummy text ever since the 1500s, rds which don't look even slightly believable. If you
						are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in
						the middle of text.</p>
				</div>
			</div>
		</div>
	</div>

	<div class="about" id="about">
		<div class="container">
			<div class="col-md-4 agileits_about_left">
				<h3 class="w3l_head">About Us</h3>
				<p class="w3ls_head_para">who we are</p>
			</div>
			<div class="agileits_banner_bottom_grids">
				<div class="col-md-6 agileits_banner_bottom_grid_l">
					<h4>Aliquam a nunc non erat lobortis</h4>
					<p><i>Vestibulum nec consequat nisl. Aliquam vehicula egestas commodo.
							Pellentesque lorem magna, pulvinar sed lacinia et, venenatis in mi.</i>Nullam sodales rutrum nisl, gravida
						porttitor lectus porta et.
						Duis purus arcu, semper at magna faucibus, elementum maximus ligula.
						Etiam imperdiet posuere odio gravida vehicula. Nulla consectetur massa
						eget tincidunt suscipit. Integer vitae ex eros. Cras ornare dignissim
						scelerisque.</p>
				</div>
				<div class="col-md-6 agileits_banner_bottom_grid_r">
					<div class="agileits_banner_btm_grid_r">
						<img src="images/ab.jpg" alt=" " class="img-responsive"/>
						<div class="agileits_banner_btm_grid_r_pos">
							<img src="images/ab1.jpg" alt=" " class="img-responsive"/>
						</div>
					</div>
				</div>
				<div class="clearfix"> </div>
			</div>
		</div>
	</div>

	<div class="services" id="services">
		<h3 class="w3l_head w3l_head1">Services</h3>
		<p class="w3ls_head_para w3ls_head_para1">View Our Services</p>
		<div class="services-agile-w3l">
			<div class="col-md-3 services-gd text-center">
				<div class="hi-icon-wrap hi-icon-effect-9 hi-icon-effect-9a">
					<a href="#" class="hi-icon"><img src="images/s1.png" alt=" " /></a>
				</div>
				<h4>Service 1</h4>
				<p>Lorem Ipsum</p>
			</div>

			<div class="col-md-3 services-gd text-center">
				<div class="hi-icon-wrap hi-icon-effect-9 hi-icon-effect-9a">
					<a href="#" class="hi-icon"><img src="images/s2.png" alt=" " /></a>
				</div>
				<h4>Service 2</h4>
				<p>Lorem Ipsum</p>
			</div>
			<div class="col-md-3 services-gd text-center">
				<div class="hi-icon-wrap hi-icon-effect-9 hi-icon-effect-9a">
					<a href="#" class="hi-icon"><img src="images/s3.png" alt=" " /></a>
				</div>
				<h4>Service 3</h4>
				<p>Lorem Ipsum</p>
			</div>
			<div class="col-md-3 services-gd text-center">
				<div class="hi-icon-wrap hi-icon-effect-9 hi-icon-effect-9a">
					<a href="#" class="hi-icon"><img src="images/s4.png" alt=" " /></a>
				</div>
				<h4>Service 4</h4>
				<p>Lorem Ipsum</p>
			</div>
			<div class="clearfix"> </div>
		</div>
	</div>

	<div class="team-bottom" id="work">
		<div class="container">
			<h3 class="w3l_head w3l_head1">Latest Gallery</h3>
			<p class="w3ls_head_para w3ls_head_para1">Lorem Ipsum Dolor</p>
			<div class="w3layouts_gallery_grids">
				<ul class="w3l_gallery_grid" id="lightGallery">
					<li data-title="Games" data-desc="Lorem Ipsum is simply dummy text of the printing." data-src="images/ab.jpg"
						data-responsive-src="images/ab.jpg">
						<div class="w3layouts_gallery_grid1 box">
							<a href="#">
								<img src="images/ab.jpg" alt=" " class="img-responsive" />
								<div class="overbox">
									<h4 class="title overtext"> Gaming Wonderland</h4>

								</div>
							</a>
						</div>
					</li>
					<li data-title="Games" data-desc="Lorem Ipsum is simply dummy text of the printing." data-src="images/g1.jpg"
						data-responsive-src="images/g1.jpg">
						<div class="w3layouts_gallery_grid1 box">
							<a href="#">
								<img src="images/g1.jpg" alt=" " class="img-responsive" />
								<div class="overbox">
									<h4 class="title overtext"> Gaming Wonderland</h4>

								</div>
							</a>
						</div>
					</li>
					<li data-title="Games" data-desc="Lorem Ipsum is simply dummy text of the printing." data-src="images/g2.jpg"
						data-responsive-src="images/g2.jpg">
						<div class="w3layouts_gallery_grid1 box">
							<a href="#">
								<img src="images/g2.jpg" alt=" " class="img-responsive" />
								<div class="overbox">
									<h4 class="title overtext"> Gaming Wonderland</h4>

								</div>
							</a>
						</div>
					</li>
					<li data-title="Games" data-desc="Lorem Ipsum is simply dummy text of the printing." data-src="images/g3.jpg"
						data-responsive-src="images/g3.jpg">
						<div class="w3layouts_gallery_grid1 box">
							<a href="#">
								<img src="images/g3.jpg" alt=" " class="img-responsive" />
								<div class="overbox">
									<h4 class="title overtext"> Gaming Wonderland</h4>

								</div>
							</a>
						</div>
					</li>
					<li data-title="Games" data-desc="Lorem Ipsum is simply dummy text of the printing." data-src="images/g4.jpg"
						data-responsive-src="images/g4.jpg">
						<div class="w3layouts_gallery_grid1 box">
							<a href="#">
								<img src="images/g4.jpg" alt=" " class="img-responsive" />
								<div class="overbox">
									<h4 class="title overtext"> Gaming Wonderland</h4>

								</div>
							</a>
						</div>
					</li>
					<li data-title="Games" data-desc="Lorem Ipsum is simply dummy text of the printing." data-src="images/g5.jpg"
						data-responsive-src="images/g5.jpg">
						<div class="w3layouts_gallery_grid1 box">
							<a href="#">
								<img src="images/g5.jpg" alt=" " class="img-responsive" />
								<div class="overbox">
									<h4 class="title overtext"> Gaming Wonderland</h4>

								</div>
							</a>
						</div>
					</li>
					<li data-title="Games" data-desc="Lorem Ipsum is simply dummy text of the printing." data-src="images/g8.jpg"
						data-responsive-src="images/g8.jpg">
						<div class="w3layouts_gallery_grid1 box">
							<a href="#">
								<img src="images/g8.jpg" alt=" " class="img-responsive" />
								<div class="overbox">
									<h4 class="title overtext"> Gaming Wonderland</h4>

								</div>
							</a>
						</div>
					</li>
					<li data-title="Games" data-desc="Lorem Ipsum is simply dummy text of the printing." data-src="images/g6.jpg"
						data-responsive-src="images/g6.jpg">
						<div class="w3layouts_gallery_grid1 box">
							<a href="#">
								<img src="images/g6.jpg" alt=" " class="img-responsive" />
								<div class="overbox">
									<h4 class="title overtext"> Gaming Wonderland</h4>

								</div>
							</a>
						</div>
					</li>
					<li data-title="Games" data-desc="Lorem Ipsum is simply dummy text of the printing." data-src="images/g7.jpg"
						data-responsive-src="images/g7.jpg">
						<div class="w3layouts_gallery_grid1 box">
							<a href="#">
								<img src="images/g7.jpg" alt=" " class="img-responsive" />
								<div class="overbox">
									<h4 class="title overtext"> Gaming Wonderland</h4>

								</div>
							</a>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<div class="projects" id="projects">
		<div class="container">
			<div class="port-head">
				<h3 class="w3l_head w3l_head1">Latest News</h3>
				<p class="w3ls_head_para w3ls_head_para1">View Our Fantasy Games</p>
			</div>
		</div>
		<div class="projects-grids">
			<div class="sreen-gallery-cursual">

				<div id="owl-demo" class="owl-carousel owl-theme">
					<div class="item">
						<div class="projects-agile-grid-info">
							<img src="images/s1.jpg" alt="" />
							<div class="projects-grid-caption">

								<h4>Gaming Wonderland</h4>
								<p>Lorem ipsum</p>
							</div>
						</div>
					</div>
					<div class="item">
						<div class="projects-agile-grid-info">
							<img src="images/s2.jpg" alt="" />
							<div class="projects-grid-caption">

								<h4>Gaming Wonderland</h4>
								<p>Lorem ipsum</p>
							</div>
						</div>
					</div>
					<div class="item">
						<div class="projects-agile-grid-info">
							<img src="images/s3.jpg" alt="" />
							<div class="projects-grid-caption">

								<h4>Gaming Wonderland</h4>
								<p>Lorem ipsum</p>
							</div>
						</div>
					</div>
					<div class="item">
						<div class="projects-agile-grid-info">
							<img src="images/s4.jpg" alt="" />
							<div class="projects-grid-caption">

								<h4>Gaming Wonderland</h4>
								<p>Lorem ipsum</p>
							</div>
						</div>
					</div>
					<div class="item">
						<div class="projects-agile-grid-info">
							<img src="images/s5.jpg" alt="" />
							<div class="projects-grid-caption">

								<h4>Gaming Wonderland</h4>
								<p>Lorem ipsum</p>
							</div>
						</div>
					</div>
					<div class="item">
						<div class="projects-agile-grid-info">
							<img src="images/s6.jpg" alt="" />
							<div class="projects-grid-caption">

								<h4>Gaming Wonderland</h4>
								<p>Lorem ipsum</p>
							</div>
						</div>
					</div>
					<div class="item">
						<div class="projects-agile-grid-info">
							<img src="images/s7.jpg" alt="" />
							<div class="projects-grid-caption">

								<h4>Gaming Wonderland</h4>
								<p>Lorem ipsum</p>
							</div>
						</div>
					</div>
					<div class="item">
						<div class="projects-agile-grid-info">
							<img src="images/s1.jpg" alt="" />
							<div class="projects-grid-caption">
								<h4>Gaming Wonderland</h4>
								<p>Lorem ipsum</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mail" id="mail">
		<div class="container">
			<h3 class="w3l_head w3l_head1">Contact Us</h3>
			<p class="w3ls_head_para w3ls_head_para1">send us a message</p>
			<div class="w3_mail_grids">
				<form action="https://sendmail.w3layouts.com/submitForm" method="post">
					<div class="col-md-6 w3_agile_mail_grid">
						<span class="input input--ichiro">
							<input class="input__field" type="text" id="input-25" name="w3lName" placeholder="Your Name" required=""/>
						</span>
						<span class="input input--ichiro">
							<input class="input__field" type="email" id="input-26" name="w3lSender" placeholder="Your Email" required=""/>
						</span>
						<span class="input input--ichiro">
							<input class="input__field" type="text" id="input-27" name="w3lSubject" placeholder="Subject" required=""/>
						</span>
					</div>
					<div class="col-md-6 w3_agile_mail_grid">
						<textarea name="w3lMessage" placeholder="Your Message" required=""></textarea>
						<input type="submit" value="Submit" />
					</div>
					<div class="clearfix"> </div>
				</form>
			</div>
		</div>
	</div>


	<div class="map">
		<div class="container">
			<h3 class="w3l_head w3l_head1">Locate Us</h3>
			<p class="w3ls_head_para w3ls_head_para1">How to find us</p>
		</div>
		<iframe
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57537.641430789925!2d-74.03215321337959!3d40.719122105634035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2sin!4v1456152197129"
			allowfullscreen=""></iframe>

	</div>
	
	<div class="w3l_footer">
		<div class="container">

			<div class="w3ls_footer_grids">

				<div class="w3ls_footer_grid">
					<div class="col-md-4 w3ls_footer_grid_left">
						<div class="w3ls_footer_grid_leftl">
							<i class="fa fa-map-marker" aria-hidden="true"></i>
						</div>
						<div class="w3ls_footer_grid_leftr">
							<h4>Location</h4>
							<p>3030 New York, NY, USA</p>
						</div>
						<div class="clearfix"> </div>
					</div>
					<div class="col-md-4 w3ls_footer_grid_left">
						<div class="w3ls_footer_grid_leftl">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</div>
						<div class="w3ls_footer_grid_leftr">
							<h4>Email</h4>
							<a href="mailto:info@example.com">info@example.com</a>
						</div>
						<div class="clearfix"> </div>
					</div>
					<div class="col-md-4 w3ls_footer_grid_left">
						<div class="w3ls_footer_grid_leftl">
							<i class="fa fa-phone" aria-hidden="true"></i>
						</div>
						<div class="w3ls_footer_grid_leftr">
							<h4>Call Us</h4>
							<p>(+000) 003 003 0052</p>
						</div>
						<div class="clearfix"> </div>
					</div>
					<div class="clearfix"> </div>
				</div>
			</div>
		</div>
		<div class="w3l_footer_pos">
			<p>© 2020 Gaming Wonderland. All Rights Reserved | Design by <a href="https://w3layouts.com/">W3layouts</a></p>
		</div>
	</div>

</>
    );
  }
}

export default loginform;

