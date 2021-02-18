import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {

    const [term, setTerm] = useState('programming');
    const [debouncedTerm,setDebouncedTerm] = useState(term);
    const [results,setResults] = useState([]);


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

    /*
    useEffect(()=>{
        const search = async () =>{
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php',{       //take data out of the response we get
                params:{
                    action:'query',
                    list:'search',
                    origin:'*',
                    format:'json',
                    srsearch:term
                }
            });

            setResults(data.query.search);           //component rerender so we can access the data in jsx and render 
        }
        //for the first search--- we just skip delay below
        if(term && !results.length){        //!NOte: it will show a warning sa we only looked for chnages in term but not result.length in our array below..the rule if if we access state inside hook we need to put it to second argument so put results.length in second arg...but this further leads to another problem i.e it makes one extra api request..to slove this we can make extra state debouncedTerm and listen to it for api call ...and listen to listen to term we call different useEffect and update setDebounced term inside term..this will help solve warning and 2 api calls as well as limits our requests..
            search();
        }
        else{
            //limitimg the amount of request made-------when user types or clicks at input, set Timer and clear timer if user types again and set a new timer   ---this can beachieved by either setting the state or using a feature of useEffect function that returns and calls that returned fnx only in next render
            const timeoutId = setTimeout(()=>{          //setTimeout always returns a unique id so that we can pass when clearing that timeout
                if(term) search();   //if you default state is null
            },500);

            return () =>{           //* the only thing we are allowed to return inside useEffect function is this another function...this function will be returned only when our component first renders, but whem it rerenders, it will frist call previously returned function before calling useEffect's own arrow callback function
                clearTimeout(timeoutId);
            };
        }

    },[term,results.length]);           //results.length added because we accessed it inside hook, if it is not placed here, it will give warning...but this will cause extra api call when we set result..so using debounce logic code below to solve
    */

    //?this code fixes the issue of warning given by useEffect above using debouncer logic --this time using two useEffect to solve problem
    useEffect(()=>{
        const timerId = setTimeout(() => {
            setDebouncedTerm(term);
        }, 1000);

        return ()=>{
            clearTimeout(timerId);
        };

    },[term]);

    useEffect(()=>{
        const search = async () =>{
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php',{       //take data out of the response we get
                params:{
                    action:'query',
                    list:'search',
                    origin:'*',
                    format:'json',
                    srsearch:debouncedTerm
                }
            });

            setResults(data.query.search);           //component rerender so we can access the data in jsx and render 
        }
        
        search();
        
    },[debouncedTerm]);



    const renderedResults = results.map((result)=>{
        return(
            <div className="item" key={result.pageid}>
                <div className="right floated content">
                       <a className="ui button" href={`https:en.wikipedia.org?curid=${result.pageid}`}>Go</a> 
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    {/* {result.snippet} //this line also prints span tag in the screen as api returns html so we need to turn this string into jsx which can be dangerous for xss attacks as someone can inject javascript code into our application */}
                    {/* this is the hidden feature in react that react doesnt want us to know...this converts some string into jsx...i only used it here because wiki api returned html also NOTE: this can be loophole to XSS attacks so never use it unless you are sure..only use this if you are sending this html and as you can trust yourself----in this case we have a string we have to turn into JSX using this tag..so if some api you are requesting return some malicious soce code as string and you turn it into jsx and they can change you url to make axios request and boom app is hacked */}
                    <span dangerouslySetInnerHTML={{ __html:result.snippet}}>      
                    </span>
            
                </div>
            </div>
        );
    });



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

                <div className="ui celled list">
                    {renderedResults}
                </div>
            </div>
        </div>
    );
};

export default Search;