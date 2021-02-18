import React from 'react';

const Spinner = (props) =>{
    return(
        <div className="ui active dimmer">
            <div className="ui text loader">{props.message}</div>
        </div>
    );
}

Spinner.defaultProps = {        //if we forget or do not pass props sometimes we need default
    message:'Loading...'
};

export default Spinner;