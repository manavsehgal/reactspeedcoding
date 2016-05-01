import React, {PropTypes} from 'react';

import Card from './Card.jsx';

import World from './World.jsx';
import YouTube from './YouTube.jsx';
import IconText from './IconText.jsx';
import GitHub from './GitHub.jsx';
import Workflow from './Workflow.jsx';
import ButtonDemo from './ButtonDemo.jsx';

export default class CardStack extends React.Component {
  static propTypes = {
    messages: PropTypes.array.isRequired
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
    const gridClass = "grid grid-gutters grid-full grid-flex-cells large-grid-fit u-textCenter";

    return (
      <div>
        <div className={gridClass}>
          <Card><Workflow /></Card>
          <Card><GitHub repo="facebook/react" /></Card>
          <Card>
            <IconText icon="cog" size="4x" text="10 Custom Components" />
          </Card>
        </div>
        <div className={gridClass}>
          <Card>
            <ButtonDemo
              buttonList={['default', 'primary', 'secondary']}
            />
          </Card>
          <Card>
            <ButtonDemo
              buttonList={['golden', 'warning large', 'danger medium', 'primary small']}
            />
          </Card>
        </div>
        <div className={gridClass}>
          <Card>
            <IconText className="orange" icon="database" size="4x"
            text="Firebase React Integration" />
          </Card>
          <Card><GitHub repo="reactjs/redux" /></Card>
          <Card><GitHub repo="webpack/webpack" /></Card>
        </div>

        <div className={gridClass}>
          <Card><YouTube videoid="MGuKhcnrqGA" /></Card>
          <Card>
            <IconText className="blue" icon="globe" size="4x"
              text="Nine Component Creation Strategies" />
          </Card>
          <Card><World /></Card>
        </div>

        <div className={gridClass}>
          {renderMessages}
        </div>
      </div>
    );
  }
}
