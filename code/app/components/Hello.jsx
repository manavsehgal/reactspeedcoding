import React from 'react';

const Hello = ({ greet, message }) =>
  <h3>
    {greet} {message}
  </h3>;

Hello.propTypes = {
  greet: React.PropTypes.string,
  message: React.PropTypes.string
};

export default Hello;
