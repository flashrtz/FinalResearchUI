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
import Dashboard from './Components/Dashboard';
import Survey from './Components/Survey';
import ContactUs from './Components/ContactUs';
import SignUp from './Components/Authentication/SignUp';
import Login from './Components/Authentication/Login';
import CreateEvent from './Components/EventPublish/CreateEvent';


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
              <Link to={'/Dashboard'} className="nav-link">Dashboard</Link>
              
	          </li>
            <li>
              <Link to={'/ContactUs'} className="nav-link">ContactUs</Link>
	           
	          </li>
	          <li>
	              <Link to={'/About'} className="nav-link">About</Link>
	          </li>
            <li>
	              <Link to={'/Survey'} className="nav-link">Survey</Link>
	          </li>
            <li>
	              <Link to={'/Login'} className="nav-link">Login</Link>
	          </li>
	          
	          <li>
              <a href="#">Portfolio</a>
	          </li>
	          <li>
              <a href="#">Contact</a>
	          </li>
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
                    <a class="nav-link" href="#">Home</a>
                </li>
                <li class="nav-item">
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
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Switch>
              <Route exact path='/Dashboard' component={Dashboard} />
              <Route exact path='/ContactUs' component={ContactUs} />
              <Route exact path='/About' component={About} />
              <Route exact path='/Survey' component={Survey} />
              <Route exact path='/SignUp' component={SignUp} />
              <Route exact path='/Login' component={Login} />
              <Route exact path='/CreateEvent' component={CreateEvent} />
          </Switch>
     
      </div>
		</div>
    </div>
    </Router>
  );
}
}
export default App;
