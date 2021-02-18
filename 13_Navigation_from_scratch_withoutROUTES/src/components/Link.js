import React from 'react';

const Link = ({ className, href, children }) => {
  const onClick = (event) => {
    if (event.metaKey || event.ctrlKey) {     //if user presses the ctrl key and click to link we want to show in another page (metaKey is for mac ) we want 
      return;
    }

    event.preventDefault();                 //prevent the default reload
    window.history.pushState({}, '', href);

    const navEvent = new PopStateEvent('popstate');   //this will be used to communicate with the Route that the url has changed
    window.dispatchEvent(navEvent);         //we dispatched event here...this will be listened by Route
  };

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  );
};

export default Link;
