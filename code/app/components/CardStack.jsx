import React, { PropTypes } from 'react';

import Card from './Card.jsx';

import World from './World.jsx';
import IconText from './IconText.jsx';
import Workflow from './Workflow.jsx';
import TodoApp from './TodoApp.jsx';

export default class CardStack extends React.Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    redirect: PropTypes.bool
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
      <Card key={message} message><h3>{message}</h3></Card>
    );

    const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit u-textCenter';

    return (
      <div>
        {!this.props.redirect ? <h1>ReactSpeed UI Components</h1> : ''}
        <div className={gridClass}>
          <Card>
            <IconText
              className="primary-text"
              icon="cloud"
              size="4x"
              text="Three complete React Apps with code and dedicated chapters"
            />
          </Card>
          <Card>
            <IconText
              className="default-text"
              icon="cubes"
              size="4x"
              text="Growing library of 30+ reusable custom components"
            />
          </Card>
          <Card>
            <IconText
              className="golden-text"
              icon="rocket"
              size="4x"
              text={`Speed optimizations for every aspect of
                development and production workflow`}
            />
          </Card>
        </div>
        <div className={gridClass}>
          <Card slim>
            <IconText
              className="success-text"
              icon="database"
              size="4x"
              text={`Multiple data strategies using fixtures, Redux store,
                real-time database, and AJAX REST APIs`}
            />
          </Card>
        </div>
        <div className={gridClass}>
          <Card>
            <IconText
              className="warning-text"
              icon="road"
              size="4x"
              text="Roadmap app created using Redux and Enzyme"
            />
          </Card>
          <Card>
            <IconText
              className="default-text"
              icon="github"
              size="4x"
              text={`Popular GitHub repository with complete and
                tested source code`}
            />
          </Card>
          <Card>
            <IconText
              className="danger-text"
              icon="area-chart"
              size="4x"
              text="Infographics, charts, and visualization components in progress"
            />
          </Card>
        </div>

        <div className={gridClass}>
          <Card slim>
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
            <IconText
              className="danger-text"
              icon="bug"
              size="4x"
              text="Mocha, Chai, Enzyme BDD Testing"
            />
          </Card>
          <Card>
            <IconText
              className="primary-text"
              icon="globe"
              size="4x"
              text="Nine Component Creation Strategies"
            />
          </Card>
          <Card>
            <IconText
              className="warning-text"
              icon="database"
              size="4x"
              text="Firebase React Integration"
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
          <Card><Workflow /></Card>
          <Card><World /></Card>
          <Card><TodoApp /></Card>
        </div>

        <div className={gridClass}>
          {renderMessages}
        </div>
      </div>
    );
  }
}
