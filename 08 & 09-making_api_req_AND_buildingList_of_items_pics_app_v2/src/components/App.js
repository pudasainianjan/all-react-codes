import React from 'react';
import unsplash from '../api/unsplash'
import SearchBar from './SearchBar';
import ImageList from './ImageList';

// const App = () => {
//     return (
//         <div className="ui container" style={{marginTop:'10px'}}><SearchBar /></div>
//     );
// };
//REFACTORING APP FUNCTION TO CLASS COMPONENT SO THAT I CAN PASS CALLBACK TO SEARCHBAR CHILD TO GET SEARCHTERM BACK  --this is way for communicaton with child component ...as props is only one way but callback will be called from child so its two way
class App extends React.Component{

    state = { images : [] };        //*as i know image value is going to be list of array returned by API so initialized empty array...but //? why not null ?? because just imagine in future, you will have code like this somewhere (this.state.images.map) and it wont show if we havent received data yet

    onSearchSubmit = async term=>{
    // async onSearchSubmit(term){      //*this is refactored into arrow function because the value of this shows props object which called it...so to auto bind value of this to this App instance, it is turned to arrow
        // console.log('from App callback',term);
        //*1st way of fetching without async await
        // axios.get('https://api.unsplash.com/search/photos',{  //first arg: base url,second arg is to customize out req
        //     //params specifies the different query string parameters we want to add into the request
        //     params: { query : term },     //same as fetching https://api.unsplash.com/search/photos?query=cars
        //     headers:{       //passing api key via headers
        //         Authorization: 'Client-ID lMY-rUZhM5LQeTHL6_853hAAAjdgw8RCCjTKyEkbkfY'
        //     }
        // })
        // .then(response=>{        //this is first way to get data 2nd way is just add async to this function and use async await
        //     console.log(response.data.results);
        // });
        //*2nd way of fetching without async await -->for this also make this function async
        // const response = await axios.get('https://api.unsplash.com/search/photos',{  
        //     params: { query : term },    
        //     headers:{     
        //         Authorization: 'Client-ID lMY-rUZhM5LQeTHL6_853hAAAjdgw8RCCjTKyEkbkfY'
        //     }
        // });

        //refactoring both above requests by creating seperate instance of axios in our api file with header and base url but this is only good for some use cases..its always best to sepereate there all api call in external file
        const response = await unsplash.get('/search/photos',{      //we have already created a instance of axios inside api with necessary header and base url key inside unsplash 
            params: { query : term } 
        });

        // console.log(response.data.results);
        this.setState({ images:response.data.results });      //this will cause our component to rerender
    }

    render(){
        return (
                 <div className="ui container" style={{marginTop:'10px'}}>
                     <SearchBar onSubmit = {this.onSearchSubmit} />     {/*Note that:  onSubmit here is not event listener, you can give any name ..it is just prop name*/}
                     <ImageList images={this.state.images} />
                 </div>
                );
    }
}

export default App;
