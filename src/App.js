import React,{ Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from'clarifai';
import Navigation from './components/Navigation/Navigation';
import Facedetection from './components/Facedetection/Facedetection';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({
 apiKey: 'af9c6f2422ef45beb6321d5c8f6ca3ca'
});


const ParticlesOptions={   
 particles: {
   number:{
    value:300,
    density:{
      enable:true,
      value_area:759
     }
   },

   color: 
   {

    value:"#0c0a0a"
      },
  shape:{
   
    type:"triangle",
   
    stokes:{
  
      width:5,
   
      color:"#160707"
    },
    polygon:{
      nb_sides:5
      }
   },
                     opacity:{value:0.5,random:true,

                anim:{enable:true,speed:0.2,opacity_min:0.1,sync:false}},

               size:{value:3,random:true,

             anim:{enable:true,

             speed:40,

         size_min:0.1,

           sync:true}},

           line_linked:{

            enable:true,

      distance:150,

     color:"#ffffff",opacity:0.58,

    width:1},

  move:{enable:true,

speed:5,

direction:"top",
  
       random:true,
  
    straight:true,
  
     out_mode:"bounce",
  
   bounce:true,
  
       attract:{enable:false,rotateX:700,rotateY:800
       }}},
              interactivity:{detect_on:"window",
         events:{

          onhover:{

            enable:true,

            mode:"grab"},

                    onclick:{enable:true,mode:"push"},

                    resize:true},

             modes:{

              grab:
           
              {distance:400,
           
                line_linked:
           
                {
                  opacity:1
                }},
           bubble:{distance:400,size:40,duration:2,

                     opacity:8,speed:3},
       
       repulse:{distance:200,duration:4},
              
              push:{particles_nb:1},
              
              remove:{particles_nb:2}}},
              
                     retina_detect:true    
        }

class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:''
    }
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }
    onButtonSubmit=()=>{
      console.log(this.state);
      this.setState({imageUrl:this.state.input});   
     app.models.predict(
      Clarifai.FACE_DETECT_MODEL, this.state.input)
     .then(
        function(response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function(err) {
          // there was an error
        }
      );
  }

  render(){
  return (
    <div className="App">
      <Particles className='Particles'
                params={ParticlesOptions}
              />
   
    <Navigation/>   
      <Logo/>
      <Rank/>  
       <ImageLinkForm 
       onInputChange={this.onInputChange}  
       onButtonSubmit={this.onButtonSubmit}
       />
     
          <Facedetection imageurl={this.state.imageUrl}/>
    </div>
    );
  }
}

export default App;
