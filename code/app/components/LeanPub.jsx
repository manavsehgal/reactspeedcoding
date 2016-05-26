import React from 'react';

const LeanPub = ({ bookid }) => (
  <iframe
    width="100%"
    height="370"
    src={`https://leanpub.com/${bookid}/embed`}
    frameBorder="0"
    allowTransparency="true"
  />
);

LeanPub.propTypes = { bookid: React.PropTypes.string };

export default LeanPub;
