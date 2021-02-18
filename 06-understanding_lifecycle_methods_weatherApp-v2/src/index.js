import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

//! Problem with this code is that, it is syncronous and getting geolocation may take time which may block other code, so i use class component instead and rerender when data becomes available
//*but only using class based components doesnt solve its just first step..now i will use (react state system)
// const App = () =>{
//     window.navigator.geolocation.getCurrentPosition(    //*2callbacks passin here 1st callback-->position is position is found(success callback)
//         (position)=>console.log(position),  //either success
//         (error)=>console.log(error)     //or error
//     );
//     return <div>Latitude: </div>
// };

class App extends React.Component {     //*we borrowed other class methods from React.Component class  //allows us to pull ton of built in functionality

    //*1st way of initializing state(using class default constructor)  //*optional functon-- anytime create new instance of App component, this constructor function is going to be automatically called before anything else
    //constructor(props){     //this is automatically called with the props object either if we define it or not //this is the same props we used in the functional component
        //super(props);       //we must call this and pass props as we have parent //make sure that we still want all the setup code of React.Component constructor function still gets called
        //this.state = {lat : null};        //this.state is special property so that we can useState,state is data relevant to app function  //at this point,we dont know value, so default the value to null but after getting geolocation we willl know  //now we can ealily refer to this state from any function of our app component

        //!removed geolocation call api from this constructor to componentDidMount because calling it here is not the best practice
    //}

    //*2nd way of state initilization ...
    state = {lat : null,errorMessage:'' }; //this is same as this.state inside constructor and this also automatically calls super(props),i in fact when this is compiled by babel for browser, it gives exact same code as constructor
    

    componentDidMount(){    //runs after render() runs--means it auto runs when our component shos up on the screen
        console.log('My component was rendered to the screen');
                                                              //?if we have one time data, it is best place to load those here with api or locally as it only call once the comp is rendered
        window.navigator.geolocation.getCurrentPosition(    //*2callbacks passing here 1st callback-->position is position is found(success callback)
        (position)=>{       //either success
            //* TO UPDATE OUR STATE ONJECT WE MUST CALL setState({}) with obj inside, in React, we never ever assign directly like in plain javascript  //after state is updated our app rerenders itself 
            this.setState({ lat:position.coords.latitude });    //setState() is a function that gets put on our app component automatically when we extend React.Component //it calls render() for update  //! we never should do direct assignment like this this.state.lat = position.coords.latitude    //the one exception to this rule is when we initialize the state inside constructor function   //this setState is in calback, so this doesnot run while we are running the constructor means constructor may return before callback but its going to run in the future ater location received
        },  
        (error)=>{  //or error
            this.setState({ errorMessage:error.message});  //we can update selected one or mroe stated
        }     
        );
        
    }

    componentDidUpdate(){       //it runs when componet updates meaning that our state changes and rerenders means //*anytime componentDidUpdate() is called render method is called
        console.log('My component was just updated - it rerendered');
    }
    renderContent(){        //this was previously in the render() reutrn but moved here becasue we wanted change in our app that is all our components should have red border, so we cant add individually to every if else here...
        if(this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>;
        }
        if(!this.state.errorMessage&&this.state.lat){
            return <SeasonDisplay latitude={this.state.lat}/>;  //as we have change in our state that cause children season display to be rerender as well and season display will be rerender as well...//*so anytime we call setState the but component will rerender any children that it is showing as well
        }
         //if we failed above two checks, then chances are we neither have lastitude nor error message
        return <Spinner message="please 'Allow' the location request" />;
    }

    render(){
        console.log('this',this instanceof App);  //true ...it means when render is called new instance of App is made everytime
        //React says we have to define render!!! to return jsx in class component       //as render runs quite frequently dont make any api req here, keep it clean
        return (        //trying to keep only one return inside main render method is good practice for code maintaining
            <div className="border red">    {/**wrapping our every component with one div with red border */}
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(<App />,document.getElementById('root'));

