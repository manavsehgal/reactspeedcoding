import React from 'react';

import Card from './Card.jsx';

import World from './World.jsx';
import YouTube from './YouTube.jsx';

export default class CardStack extends React.Component {
  static propTypes = {
    messages: React.PropTypes.array.isRequired,
  }

  static defaultProps = {
    messages: [
      'React Speed UI',
      'Single Page Apps',
      'Responsive Design',
      'Customizable Theme',
      'Reusable Components',
      'Simple Structure',
      'Production Optimized',
      'State Machine',
      'Expressive Syntax'
    ],
  }

  render () {
    const messages = this.props.messages;
    const renderMessages = messages.map(message =>
        <Card key={message} message={message} />
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
