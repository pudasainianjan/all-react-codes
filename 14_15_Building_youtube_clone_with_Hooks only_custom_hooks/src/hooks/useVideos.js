import {useState,useEffect} from 'react';
import youtube from '../apis/youtube';

const useVideos = (defaultSearchTerm) => {
    const [videos,setVideos] = useState([]);

    useEffect(()=>{     //whenever we use outside variable in our hook, react wants to know (means we list that variable inside second argument array...eg:defaultSearchTerm)
        search(defaultSearchTerm);
      },[defaultSearchTerm]);

      const search = async term => {
        const response = await youtube.get('/search', {
          params: {
            q: term
          }
        });
    
        setVideos(response.data.items);
      };

      return [videos,search];        //Convention: useState returns an array that has a piece of state and a setter inside it

      //or we could return an object that has properties of videos and onTermSubmit
};

export default useVideos;