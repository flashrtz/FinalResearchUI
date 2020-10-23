import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Home from './Components/Home';
import About from './Components/About';
import Survey from './Components/Survey';
import ContactUs from './Components/ContactUs';
import SignUp from './Components/Authentication/SignUp';
import Login from './Components/Authentication/Login';
import CreateEvent from './Components/EventPublish/CreateEvent';
import FindSupplier from './Components/Supplier/FindSupplier';
import UserViewProfile from './Components/User/UserViewProfile';
import ManageBookings from './Components/Bookings/ManageBookings';
import loginform from './Components/loginform';
import CheckDashboard from './CheckDashboard';
import CompleteSurvey from './Components/CompleteSurvey';






class App extends Component{
  // constructor(props){
  //   super(props);
  // }
  render(){
  return (
    <Router>
    <div className="App">
      <div class="wrapper d-flex align-items-stretch">
			<nav id="sidebar">
				<div class="p-4 pt-5">
		  		<a href="#" class="img logo rounded-circle mb-5" style={{backgroundImage: "url(../public/images/logo.jpg);"}}></a>
	        <ul class="list-unstyled components mb-5">
	          <li class="active">
              <Link to={'/CheckDashboard'} className="nav-link">Dashboard</Link>
	          </li>
            <li>
	              <Link to={'/Survey'} className="nav-link">+ Survey</Link>
	          </li>
            <li>
	              <Link to={'/UserViewProfile'} className="nav-link">UserViewProfile</Link>
	          </li>
            <li>
	              <Link to={'/FindSupplier'} className="nav-link">FindSupplier</Link>
	          </li>
            <li>
	              <Link to={'/CreateEvent'} className="nav-link">CreateEvent</Link>
	          </li>
           
            {/* <li>
	              <Link to={'/UserViewProfile'} className="nav-link">UserViewProfile</Link>
	          </li> */}
            <li>
	              <Link to={'/ManageBookings'} className="nav-link">ManageBookings</Link>
	          </li>
          
          
	          {/* <li>
	              <Link to={'/About'} className="nav-link">About</Link>
	          </li> */}
           
            <li>
              <Link to={'/ContactUs'} className="nav-link">ContactUs</Link>
	          </li>
            {/* <li>
	              <Link to={'/Login'} className="nav-link">Login</Link>
	          </li>
              <li>
	              <Link to={'/SignUp'} className="nav-link">SignUp</Link>
	          </li> */}
         
          
          
          
          
	          
	        </ul>

	        <div class="footer">
	        	<p>
              Made by ImanDissanayake for the ResearchProject.
						 </p>
	        </div>

	      </div>
    	</nav>

        
      <div id="content" class="p-4 p-md-5">

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">

            <button type="button" id="sidebarCollapse" class="btn btn-primary">
              <i class="fa fa-bars"></i>
              <span class="sr-only">Toggle Menu</span>
            </button>
            <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa fa-bars"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="nav navbar-nav ml-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/">LogOut</a>
                </li>
                {/* <li class="nav-item">
                    <a class="nav-link" href="#">ContactUs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Survey</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Contact</a>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      
        <Switch>
              <Route exact path='/ContactUs' component={ContactUs} />
              <Route exact path='/About' component={About} />
              <Route exact path='/Survey' component={Survey} />
              <Route exact path='/SignUp' component={SignUp} />
              <Route exact path='/CreateEvent' component={CreateEvent} />
              <Route exact path='/FindSupplier' component={FindSupplier} />
              <Route exact path='/SignUp' component={SignUp} />
              <Route exact path='/UserViewProfile' component={UserViewProfile} />
              <Route exact path='/ManageBookings' component={ManageBookings} />
              <Route exact path='/loginform' component={loginform} />
              <Route exact path='/CheckDashboard' component={CheckDashboard} />
              <Route exact path='/CompleteSurvey' component={CompleteSurvey} />


              
         
              <Route exact path='/' component={Login} />
              
          </Switch>
     
      </div>
		</div>
    </div>
    </Router>
  );
}
}
export default App;
