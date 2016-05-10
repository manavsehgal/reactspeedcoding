import React from 'react';

export default function LeanPub(props) {
  const source = `https://leanpub.com/${props.bookid}/embed`;
  return (
    <iframe
      width="100%"
      height="370"
      src={source}
      frameBorder="0"
      allowTransparency="true"
    >
    </iframe>
  );
}
