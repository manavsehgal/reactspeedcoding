import React from 'react';
import CardStack from './CardStack.jsx';

function MissingRoute() {
  return (
    <div>
      <h1>Oops! We Could Not Find That...</h1>
      <h2>
        Here's the latest from ReactSpeed UI.
        Please use top menu to navigate elsewhere.
      </h2>
      <CardStack redirect />
    </div>
  );
}

export default MissingRoute;
