import React, { PropTypes } from 'react';

import Card from './Card.jsx';

import World from './World.jsx';
import WorkflowFire from './WorkflowFire.jsx';
import TodoApp from './TodoApp.jsx';
const steps = require('../fixtures/workflow/steps.json');

export default class CardStack extends React.Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    redirect: PropTypes.bool,
    route: PropTypes.object
  }

  static defaultProps = {
    messages: [
      'Responsive Design',
      'Customizable Theme',
      'Reusable Components'
    ],
    redirect: false
  }

  render() {
    const messages = this.props.messages;

    const renderMessages = messages.map(message =>
      <Card key={message} message>
        <h3>{message}</h3>
      </Card>
    );

    const gridClass = `grid grid-gutters grid-full
      grid-flex-cells large-grid-fit u-textCenter`;

    return (
      <div>
        <h1>Custom Components</h1>
        <div className={gridClass}>
          <Card>
            <WorkflowFire steps={steps} rsdb={this.props.route.rsdb} />
          </Card>
          <Card><World /></Card>
          <Card><TodoApp /></Card>
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
            <p>Buttons</p>
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
          {renderMessages}
        </div>
      </div>
    );
  }
}
