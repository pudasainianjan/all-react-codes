import React from 'react';

class SearchBar extends React.Component{

    state = { term: '' };
    // //gets called anytime someone changes text input
    //? CONTROLLED VS UNCONTROLLED ELEMENT: i have used state with property term here, so react exactly knows what is the value right now.So I am using CONTROLLED ELEMENT...If I had just called callback and never stored value in my state, our app would always have to depend on the DOM for source of data
    // onInputChange(event){
    //     console.log(event.target.value);
    // }


    //converting this normal func to arrow function as it couldnt show this value 
    //! COMMON ERROR: cannot read state of undefined..this error occurs when we have some kind of callback and that callback like below function and when they are not arrow function they cant receive value of this ...so change them to arrow as it also binds the value of this with event listener
    //*when you use normal function in some kind of callbacks then that is not goind to preserve value of this...so use arrow function if you need to call class methods whem certain events happen
    onFormSubmit = (event) => {     //arrow binds value of this and preserves it...notmal function break value of 'this' inside callback function
        event.preventDefault();
        // console.log(this.state.term);
        this.props.onSubmit(this.state.term)   //onSubmit was the callback that was passed as a props from the app
    }

    render(){
        // console.count('rerendered');
        return (
            <div className="ui segment">
                {/* <form onSubmit={(event)=>this.onFormSubmit(event)} className="ui form"> */}     {/**do this if you have normal function as a method, mean if you dont have arrow function */}
                <form onSubmit={this.onFormSubmit} className="ui form">             {/**do this if you have arrow function or method eg:see onFormSubmit function */}
                    <div className="field">
                        <label>Image Search</label>
                        <input 
                            type="text" 
                            value={this.state.term} 
                            onChange={(e)=>this.setState({term:e.target.value})}  //used arrow func here as this would not//used arrow func here as this would not be recognised otherwise it would be called as callback in future and at that time this is not recognised     //normal function do not bind the value of this for future, so this will be undefined...so use arrow function in cases like this
                        /> 
                        
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBar;