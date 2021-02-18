import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {

    const [term, setTerm] = useState('');


    //? useEffect Introduction
    //* useEffect takes 2 parameter one is callback and second is either [] or array with item [term] or nothing(empty)...empty array means run arrow function at initial render of our component, with no second argument means that run at initial render and also run after every single rerender, third argument means run at initial render and also run after every rerender is data has changed since last render
    //*Three scenatios useEffect can be used 
    //useEffect(()={ },[]);
    // useEffect(()={ });
    // useEffect(()={ },[term]);
    // console.log('I run with every render');

    //*1
    // useEffect(()=>{
    //     console.log('I RUN ONLY ONCE');
    // },[]);

    //*2
    // useEffect(()=>{
    //     console.log('I RUN AFTER EVERY RENDER AND AT INITIAL RENDER');
    // });

    //*3
    // useEffect(()=>{
    //     console.log('I RUN AT INITIAL RENDER AND AFTER EVERY RERENDER IF THAT DATA(PASSED IN SECOND ARGUMENT) HAS CHANGED');
    // },[term]);


    //run some code anytime term changes
    //whenever we rerender our component and term has changed, run this arrow function and also run when our component is first rendered      //! we are not allowed to pass async in this callback that we pass to useEffect for eg: useEffect( async ()={}) is not allowed..it has 3 possible fixes
    //*1st fix  --cannot use async in useEffect function (RECOMMENDED SOLUTION)
    // useEffect(()=>{       
    //     const search = async () => {
    //         await axios.get('make a request using url');
    //     };
    //     search();
    // },[term]);

    // //*2nd fix method       //wrap function in IIFE
    // useEffect(()=>{       
    //     (async () => {
    //         await axios.get('make a request using url');
    //     })();
    // },[term]);

    // //*3rd fix method      //using promises
    // useEffect(()=>{       
    //     axios.get('url here')
    //         .then((response)=>{
    //             console.log(response.data);
    //         });
    // },[term]);

    useEffect(()=>{
        const search = async () =>{
            await axios.get('');
        }
    },[term]);





    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input 
                        value={term}
                        onChange={e=>setTerm(e.target.value)}
                        className="input"
                     />
                </div>
            </div>
        </div>
    );
};

export default Search;