import React from 'react';

export default function Hello({ greet, message }) {
  return (
    <div className="title-shadow">
      {greet} {message}
    </div>
  );
}
