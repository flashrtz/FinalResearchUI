import React, { Component } from 'react';
import swal from 'sweetalert';


class ContactUs extends Component {



submitHandler =() =>{


  swal({
    title: "Message received successfully!",
    text: "We 'll get to you quickly!",
    icon: "success",
    button: "OK",
  });
}


    render() {
      return (
     <div>
<div id="form-main">
    <div id="form-div">
        <form >
             <p class="name">
        	<input name="name" type="text" class="feedback-input" required placeholder="Name" id="name" />
            </p>
            <p class="email">
             <input name="email" type="email" required  class="feedback-input" id="email" placeholder="Email" />
             </p>
            <p class="text">
             <textarea name="message" class="feedback-input" id="comment" placeholder="Message"></textarea>
             </p>
                 <div class="submit">
                    <button type="button" class="button-blue" onClick={this.submitHandler}>SUBMIT</button>
                      
                 </div>
        </form>
          {/* <div id="error_message" style="width:100%; height:100%; display:none; ">
                <h4>Error</h4>
                Sorry there was an error sending your form.
          </div>
          <div id="success_message" style="width:100%; height:100%; display:none; ">
          <h2>Success! Your Message was Sent Successfully.</h2>
          </div> */}
    </div>
</div>
</div>
     
      );
    }
  }
  
  export default ContactUs;