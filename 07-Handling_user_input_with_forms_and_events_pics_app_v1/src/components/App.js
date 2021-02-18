import React from 'react';
import SearchBar from './SearchBar';

// const App = () => {
//     return (
//         <div className="ui container" style={{marginTop:'10px'}}><SearchBar /></div>
//     );
// };
//REFACTORING APP FUNCTION TO CLASS COMPONENT SO THAT I CAN PASS CALLBACK TO SEARCHBAR CHILD TO GET SEARCHTERM BACK  --this is way for communicaton with child component ...as props is only one way but callback will be called from child so its two way
class App extends React.Component{
    onSearchSubmit(term){
        console.log('from App callback',term);
    }

    render(){
        return (
                 <div className="ui container" style={{marginTop:'10px'}}>
                     <SearchBar onSubmit = {this.onSearchSubmit} />     {/*Note that:  onSubmit here is not event listener, you can give any name ..it is just prop name*/}
                 </div>
                );
    }
}

export default App;