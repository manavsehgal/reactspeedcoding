import React from 'react';

export default function Hello(props) {
  return (
    <h3>
      {props.greet} {props.message}
    </h3>
  );
}
