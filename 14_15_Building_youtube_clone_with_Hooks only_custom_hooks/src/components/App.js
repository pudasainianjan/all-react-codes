import React, {useState,useEffect} from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import useVideos from '../hooks/useVideos';


const App = () =>{
  
  const [selectedVideo,setSelectedVideo] = useState(null);
  const [videos,search] = useVideos('dirt bikes');   //* App rerenders --- because we are updating our piece of state (video) inside custom hook and this custom hook is called by app here, so our App still rerenders

  useEffect(()=>{   // anytime we get new video list we want to update selected video
    setSelectedVideo(videos[0]);
  },[videos]);



  return (
    <div className="ui container">
      <SearchBar onFormSubmit={search} />
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail video={selectedVideo} />
          </div>
          <div className="five wide column">
            <VideoList
              onVideoSelect={setSelectedVideo}        //"(video)=>setSelectedVideo(video)" this code block is (equivalent) refacroted to "setSelectedVideo" only as argument and we passing it are same
              videos={videos}
            />
          </div>
        </div>
      </div>
    </div>
  );

};

export default App;



