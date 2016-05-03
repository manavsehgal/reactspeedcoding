import React, {PropTypes} from 'react';

import Card from './Card.jsx';

import World from './World.jsx';
import YouTube from './YouTube.jsx';
import IconText from './IconText.jsx';
import GitHub from './GitHub.jsx';
import Workflow from './Workflow.jsx';
import ButtonDemo from './ButtonDemo.jsx';
import Button from './Button.jsx';

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
            <IconText
              icon="css3"
              size="4x"
              text="ReactSpeed UI is very efficient. CSS 4.6KB Gzip, 21KB Minified."
            />
          </Card>
        </div>
        <div className={gridClass}>
          <Card>
            <p>Click does not do much...</p>
            <Button className="button default">Default</Button>
            <Button className="button primary">Primary</Button>
            <Button className="button secondary">Secondary</Button>
            <Button className="button danger">Danger</Button>
            <Button className="button success">Success</Button>
            <Button className="button warning">Warning</Button>
            <Button className="button golden">Golden</Button>
          </Card>
          <Card>
            <ButtonDemo
              colors={['Golden', 'Success', 'Danger', 'Warning']}
              sizes={['large', 'medium', 'medium', 'small']}
              icons={['coffee', 'cloud', 'flash', 'plug']}
              iconOnly
            />
          </Card>
          <Card>
            <ButtonDemo
              colors={['Primary', 'Success', 'Danger', 'Secondary']}
              sizes={['large', 'medium', 'medium', 'small']}
              icons={['car', 'bar-chart', 'bug', 'star']}
            />
          </Card>
        </div>

        <div className={gridClass}>
          <Card>
            <p>Beautiful forms</p>
            <div className="input">
              <span className="input-item">Name</span>
              <input className="input-field" placeholder="Placeholder for name" />
            </div>
            <div className="input">
              <input className="input-field" placeholder="Just a field" />
            </div>
          </Card>
          <Card>
            <p>Responsive forms</p>
            <div className="input">
              <button className="button success"><i className="fa fa-search"></i></button>
              <input className="input-field" placeholder="Search something" />
            </div>
            <div className="input">
              <span className="input-item"><span className="fa fa-envelope"></span></span>
              <input className="input-field" placeholder="Send another one" />
              <button className="button warning">Send</button>
            </div>
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
