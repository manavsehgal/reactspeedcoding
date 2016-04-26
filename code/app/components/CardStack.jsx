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
        <Card key={message} message={message} />
      );

    return (
      <ul className="stack">
        <li key="workflow" className="card demo">
          <Workflow />
        </li>
        <li key="comp-strat" className="card demo">
          <IconText className="blue" icon="globe"
            size="5x" text="Nine Component Creation Strategies" />
        </li>
        <li key="cust-comp" className="card demo">
          <IconText icon="cog"
            size="5x" text="10 Custom Components" />
        </li>
        <li key="fire-base" className="card demo">
          <IconText className="orange" icon="database"
            size="5x" text="Firebase React Integration" />
        </li>
        <li key="github-react" className="card demo">
          <GitHub repo="facebook/react" />
        </li>
        <li key="github-webpack" className="card demo">
          <GitHub repo="webpack/webpack" />
        </li>
        <li key="github-redux" className="card demo">
          <GitHub repo="reactjs/redux" />
        </li>
        <li key="youtube" className="card demo">
          <YouTube videoid="MGuKhcnrqGA" />
        </li>
        <li key="world" className="card demo">
          <World />
        </li>
        {renderMessages}
      </ul>
    );
  }
}
