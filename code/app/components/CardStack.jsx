import React, {PropTypes} from 'react';

import Card from './Card.jsx';

import World from './World.jsx';
import YouTube from './YouTube.jsx';
import IconText from './IconText.jsx';
import GitHub from './GitHub.jsx';
import Workflow from './Workflow.jsx';

export default class CardStack extends React.Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
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
        <Card key={message} message><h3>{message}</h3></Card>
      );

    return (
      <ul className="stack">
        <Card size="2w"><Workflow /></Card>
        <Card>
          <IconText className="blue" icon="globe" size="4x"
            text="Nine Component Creation Strategies" />
        </Card>
        <Card>
          <IconText icon="cog" size="4x" text="10 Custom Components" />
        </Card>
        <Card>
          <IconText className="orange" icon="database" size="4x"
          text="Firebase React Integration" />
        </Card>
        <Card><GitHub repo="facebook/react" /></Card>
        <Card><GitHub repo="webpack/webpack" /></Card>
        <Card><GitHub repo="reactjs/redux" /></Card>
        <Card><World /></Card>
        <Card size="2x"><YouTube videoid="MGuKhcnrqGA" /></Card>
        {renderMessages}
      </ul>
    );
  }
}
