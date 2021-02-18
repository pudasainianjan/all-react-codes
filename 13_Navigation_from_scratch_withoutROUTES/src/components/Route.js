import { useEffect, useState } from 'react';

const Route = ({ path, children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);       //when app first loads sets to the current url

  useEffect(() => {
    const onLocationChange = () => {
      console.log('location changed');
      setCurrentPath(window.location.pathname);           //this is the changed url that is currently in address bar
    };

    window.addEventListener('popstate', onLocationChange);    //listening the event dispatched by link 

    return () => {        //runs before when Route removes from the screen
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return currentPath === path ? children : null;      //same as window.location.pathname === path ? children : null;
};

export default Route;
