import React from 'react';

export default function LeanPub(props) {
  const source = `https://leanpub.com/${props.bookid}/embed`;
  return (
    <iframe width="100%" height="330"
      src={source}
      frameborder="0" allowtransparency="true">
    </iframe>
  );
}
