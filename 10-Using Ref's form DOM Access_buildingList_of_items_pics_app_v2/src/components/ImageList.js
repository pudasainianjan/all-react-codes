import './ImageList.css';
import React from 'react';
import ImageCard from './ImageCard';

const ImageList = (props) => {
    
    //!!Warning: Each child in a list should have a unique "key" prop...react wants to identify elements that are already in the DOM by 
    //!using key and its content and when something changes it compares the list with the keys and items with those that are already in dom, 
    //!and only rerender those elements which are not already in dom..if div with the key=1 is already in the dom inside this component, then why the hell we rerender it
    //! we only want to rerender if div with key=something that was not previously shown in DOM
    //!for eg: if we add new item in a todo..only that newly added item is going to rerender as react check for key for items if key is not found in dom it puts in rerender list which makes our app more optimized
    //!give any unique key to the main root elemetn that is being returned for eg: if we only have image return like below then give key like <img key="somekey". but in other case:lets say i wrap image by a <div> then i need to give key to that div as it is root return   eg:<div key="someKey"><img src="" /></div>
    const images = props.images.map(image=>{       //Destructured version: props.images.map(({description,id,urls})=>{
        return <ImageCard key={image.id} image={image} />;
    });


    return <div className="image-list">{images}</div>;
};

export default ImageList;