import React from 'react';

export default function YouTube(props) {
  const source = `https://www.youtube.com/embed/${props.videoid}?rel=0&amp;controls=0&amp;showinfo=0`;
  return (
    <iframe className="youtube" width="100%" height="100%"
      src={source}
      frameborder="0" allowfullscreen>
    </iframe>
  );
}
