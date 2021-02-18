import React, {useState} from 'react';

const Accordion = ({items}) =>{
    //*initializing a new state
    //array destructuring----when we call useState() we get back an array of two elements inside of it...first element i.e activeIndex is statename, and second element is a function we call to update our state, just like a class component it will cause a component to auto rerender
    const [activeIndex, setActiveIndex] = useState(null);         //useState takes 1 argument i.e default value for our state...      


    const onTitleClick = (index) => {
        // console.log('title was clicked',index);
        //*setting state
        setActiveIndex(index);
    }

    const renderedItems = items.map((item,index)=>{
        const active = index === activeIndex? 'active' : '';
        return (
           <React.Fragment key={item.title}>                {/*<div key={item.title}>                  {/*here this is extra div that we need to wrap but our semantic ui other ui library may put unnecessary border to this div ....so it is better to use <React.Fragement> instead of div to wrap the jsx code*/}
                <div className={`title ${active}`} onClick={()=>onTitleClick(index)}>  
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>

                <div className={`content ${active}`}>
                    <p>{item.content}</p>
                </div>
             </React.Fragment> 
            
        );
    });

return <div className="ui styled accordion">
            {renderedItems}
            <h1>{activeIndex}</h1>
        </div>;
};

export default Accordion;
