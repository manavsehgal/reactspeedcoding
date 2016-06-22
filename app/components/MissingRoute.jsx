import React from 'react';
import FullPageHome from './FullPageHome.jsx';

const MissingRoute = () => (
  <div>
    <h1>Oops! We Could Not Find That...</h1>
    <h2>
      Browse latest content from ReactSpeed.com and please use top menu to navigate elsewhere.
    </h2>
    <FullPageHome redirect />
  </div>
);

export default MissingRoute;
