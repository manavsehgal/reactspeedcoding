import React from 'react';
import World from './World.jsx';
import Card from './Card.jsx';

export default class CardStack extends React.Component {
  render () {
    const messages = this.props.messages;
    const renderMessages = messages.map(message =>
        <Card key={message.id} message={message.txt} />
      );

    const gridClass = `grid grid-gutters grid-full
      grid-flex-cells large-grid-fit u-textCenter`;

    return (
        <div className={gridClass}>
          <Card><World /></Card>
        </div>

        <div className={gridClass}>
          {renderMessages}
        </div>
    );
  }
}

CardStack.propTypes = {
  messages: React.PropTypes.array.isRequired,
}

CardStack.defaultProps = {
  messages: [
    {id: 1, txt: 'Responsive Design'},
    {id: 2, txt: 'Customizable Theme'},
    {id: 3, txt: 'Reusable Components'},
  ],
}
