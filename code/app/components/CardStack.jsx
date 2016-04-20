import React from 'react';

import Card from './Card.jsx';

import World from './World.jsx';
import YouTube from './YouTube.jsx';

export default class CardStack extends React.Component {
  render () {
    let messages = this.props.messages;
    let renderMessages = messages.map(message =>
        <Card key={message.id} message={message.txt} />
      );

    return (
      <ul className="stack">
        <li key="world" className="card demo">
          <World />
        </li>
        <li key="youtube" className="card demo">
          <YouTube videoid="MGuKhcnrqGA" />
        </li>
        {renderMessages}
      </ul>
    );
  }
}

CardStack.propTypes = {
  messages: React.PropTypes.array.isRequired,
}

CardStack.defaultProps = {
  messages: [
    {id: 1, txt: 'React Speed UI'},
    {id: 2, txt: 'Single Page Apps'},
    {id: 3, txt: 'Responsive Design'},
    {id: 4, txt: 'Customizable Theme'},
    {id: 5, txt: 'Reusable Components'},
    {id: 6, txt: 'Simple Structure'},
    {id: 7, txt: 'Production Optimized'},
    {id: 8, txt: 'State Machine'},
    {id: 9, txt: 'Expressive Syntax'},
  ],
}
