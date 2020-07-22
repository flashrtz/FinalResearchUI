import React, { Component } from 'react';
import SimpleImageSlider from 'react-simple-image-slider'


class Dashboard extends Component {
    render() {

        const images = [
                    {url:"images/image3.jpg"},
                     {url:"images/image2.jpg"}

        ];
      return (
<div>
{/* //<div class="bgded overlay" style="background-image:url('images/demo/backgrounds/01.png');"> */
}
<div>
                <SimpleImageSlider
                    width={1000}
                    height={504}
                    images={images}
                />
            </div>
  <div id="pageintro" class="hoc clear"> 
    <article>
      <h3>Checkout the new Surveys!And win free Tickets!</h3>
      
  
    </article>
  </div>

<div class="wrapper row3">
  <main class="hoc container clear"> 
   
    <section id="introblocks">
      <ul class="nospace group btmspace-80 elements elements-four">
        <li class="one_quarter">
          <article><a href="#"><i class="fas fa-hand-rock"></i></a>
            <h6 class="heading">Survey Test 1</h6>
            <p>Survey Test !</p>
          </article>
        </li>
        <li class="one_quarter">
          <article><a href="#"><i class="fas fa-dove"></i></a>
            <h6 class="heading">Survey Test 2</h6>
            <p>Survey Test !</p>
          </article>
        </li>
        <li class="one_quarter">
          <article><a href="#"><i class="fas fa-history"></i></a>
            <h6 class="heading">Survey Test 3</h6>
            <p>Survey Test !</p>
          </article>
        </li>
        <li class="one_quarter">
          <article><a href="#"><i class="fas fa-heartbeat"></i></a>
            <h6 class="heading">Survey Test 4</h6>
            <p>Survey Test !</p>
          </article>
        </li>
      </ul>
    </section>
   

 </main>   
</div>
</div>
     
      );
    }
  }
  
  export default Dashboard;