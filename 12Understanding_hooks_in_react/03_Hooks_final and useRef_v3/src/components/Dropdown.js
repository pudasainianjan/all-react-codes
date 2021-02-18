import React, {useState,useEffect,useRef} from 'react';


const Dropdown = ({ label,options,selected,onSelectedChange }) =>{

    const [open,setOpen] = useState(false);
    const ref = useRef();

    //for listening cllick outside of dropdown --whereever we click event bubbles up to body
    useEffect(()=>{
        const onBodyClick = (e)=>{
            
            if (ref.current && ref.current.contains(e.target)){ //contains checks one dom element belong to other dom element or not
                return;
            }
            setOpen(false);
        };

        document.body.addEventListener('click', onBodyClick);
        

        return () => {
            document.body.removeEventListener('click', onBodyClick);
        };
    },[]);


    const renderedOptions = options.map((option)=>{
        if (option.value === selected.value){
            return null;        //means dont render anything
        }
        return (
            <div key={option.value} className="item" 
            onClick={()=>onSelectedChange(option)}>
                {option.label}
            </div>
        );
    });

   

    return(
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">
                    {label}
                </label>
                <div onClick={(e)=>setOpen(!open)} className={`ui selection dropdown ${open ? 'visible active': ''}`}>
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open? 'visible transition':''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;


//*How to use ref:
//1 import React, {useState,useEffect,useRef} from 'react';
//2 const ref = useRef();
//3  <div ref={ref} className="ui form">
//4 Accessing ref: ref.current
