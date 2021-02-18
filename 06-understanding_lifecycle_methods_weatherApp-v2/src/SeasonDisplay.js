import React from  'react';
import './SeasonDisplay.css';

const seasonConfig ={
    summer:{
        text:'Let\'s hit the beach',
        iconName:'sun'
    },
    winter:{
        text:'Burr it is cold',
        iconName:'snowflake'
    }
}

//defining new function whose sole purpose is to get season //*our app logic: if the hemisphere(known by latitude) is northern then it is summer at 3 upto 8 month (i.e april to sept) other remaining month winter and exactly opposite for southern hemisphere
const getSeason = (lat,month) =>{
    if(month>2 && month <9){
        //now determine himisphere by latitude
        return lat > 0 ? 'summer':'winter';     //lat > 0 means , we must be in northern hemisphere
    }
    else{       //for remaining months i.e for months 9,10,11 (oct,nov,dec) and 0,1,2
        return lat > 0 ? 'winter':'summer';    
    }
}

const SeasonDisplay = (props) => {
    const season = getSeason(props.latitude,new Date().getMonth());
    console.log(season);
    // const text = season === 'winter'?'Burr, it is chilly':'Lets hit beach';
    // const icon = season === 'winter'?'sun':'sun';        //instead of using this repetitive ternary operator I created seasonConfig function that takes season and returns a message and icon
    const {text,iconName} = seasonConfig[season]        //{text,iconName}
    return (
         <div className={`season-display ${season}`}>
            <i className={`icon-left ${iconName} icon massive`} />
            <h1>{text}</h1>
            <i className={`icon-right ${iconName} icon massive`} />
        </div>
    );
};

export default SeasonDisplay;




