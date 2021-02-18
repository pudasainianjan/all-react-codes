import React from 'react';
import ReactDOM from 'react-dom';

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
    render(){
        window.navigator.geolocation.getCurrentPosition(    //*2callbacks passin here 1st callback-->position is position is found(success callback)
        (position)=>console.log(position),  //either success
        (error)=>console.log(error)     //or error
        );

        return <div>Latitude: </div>
    }
}

ReactDOM.render(<App />,document.getElementById('root'));