import React from 'react';

class ImageCard extends React.Component{
    //*Ref System: in plane js we used to get height of image from DOM : imageElement.clientHeight but in REACT we can't...
    //* So we use REF(reference) system to know properties of particular DOM element, we create those ref element by defining state and passing React.createRef() and providing that this.ref to the img tag like <img ref={this.imageRef}  NOTE: ref is not dom attribute,its jsx attribute unlike src,alt etc are dom attribute but it also finally converts into dom attribute
    //?when we console log ref's clientHeight in componentDidMount it shows zero because by the time it calls didMount it is still loading image from the url but when we see object it shows because it goes to dom and sees height
    //*here we let the image load into the dom first and as it renders we reach to dom and access its height and agiain update them in grid with their specific height
    constructor(props){
        super(props);

        this.state = {spans:0};  //until we actuallt load the image and determine its height its 0

        this.imageRef = React.createRef();          //creates ref for this DOM element for knowing different DOM properties
    }

    componentDidMount(){
        // console.log(this.imageRef);
        // console.log(this.imageRef.current.clientHeight);     //it may show zero or have data becasue at this instance of time it is rendered but also getting image from url, therefore we re trying to get the height before the image has been downloaded from the api url
        //todo: to solve this problem, we add event listener 
        this.imageRef.current.addEventListener('load', this.setSpans.bind(this));           //* as setSpans is a callback function, either make setSpans arrow function or bind the value of this to setSpans... here i binded and setSpans is a normal function
    }

    setSpans() {
        // console.log(this.imageRef.current.clientHeight);  //actual height of image element
        const height = this.imageRef.current.clientHeight;

        const spans = Math.ceil(height / 10);  //it was 150 before...now its changed to 10...150 is given because in our grid container we had grid-auto-row: 150px means that every row must have 150px; but it caused problem of extra whitespace so decrease to 10...
         this.setState({ spans : spans})   //this.setState({spans}) because key and value are sane
    }

    render(){
        const { description,urls } = this.props.image;
        return (
            <div style={{gridRowEnd:`span ${this.state.spans}`}}>
                <img 
                    src={urls.regular} 
                     alt={description}
                     ref={this.imageRef}     //this is a JSX tag unlike alt,src etc are DOm tag but jsx ultimately converts into the DOM
                />
            </div>
        );
    }
}

export default ImageCard;


