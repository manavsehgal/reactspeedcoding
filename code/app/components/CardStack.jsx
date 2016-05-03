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
      'Responsive Design',
      'Customizable Theme',
      'Reusable Components'
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
          <Card>
            <IconText
              className="warning-text"
              icon="css3"
              size="4x"
              text="ReactSpeed UI is efficient. CSS 4.6KB Gzip, 21KB Minified."
            />
          </Card>
        </div>

        <div className={gridClass}>
          <Card>
            <p>Click does not do much...</p>
            <button className="button default">Default</button>
            <button className="button primary">Primary</button>
            <button className="button secondary">Secondary</button>
            <button className="button danger">Danger</button>
            <button className="button success">Success</button>
            <button className="button warning">Warning</button>
            <button className="button golden">Golden</button>
          </Card>
        </div>

        <div className={gridClass}>
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
            <p>Responsive forms</p>
            <div className="input">
              <span className="input-label">Name</span>
              <input className="input-field" placeholder="Placeholder for name" />
            </div>
            <div className="input">
              <input className="input-field" placeholder="Just a field" />
            </div>
          </Card>
          <Card>
            <p>Beautiful forms</p>
            <div className="input">
              <button className="button success"><i className="fa fa-search"></i></button>
              <input className="input-field" placeholder="Search something" />
            </div>
            <div className="input">
              <span className="input-label"><span className="fa fa-envelope"></span></span>
              <input className="input-field" placeholder="Send another one" />
              <button className="button warning">Send</button>
            </div>
          </Card>
        </div>

        <div className={gridClass}>
          <Card><GitHub repo="facebook/react" /></Card>
          <Card><GitHub repo="reactjs/redux" /></Card>
        </div>

        <div className={gridClass}>
          <Card><YouTube videoid="MGuKhcnrqGA" /></Card>
        </div>
        <div className={gridClass}>
          <Card>
            <IconText className="warning-text" icon="database" size="4x"
            text="Firebase React Integration" />
          </Card>
          <Card><World /></Card>
          <Card>
            <IconText className="primary-text" icon="globe" size="4x"
              text="Nine Component Creation Strategies" />
          </Card>
        </div>

        <div className={gridClass}>
          {renderMessages}
        </div>
      </div>
    );
  }
}
