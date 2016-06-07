import React from 'react';
import Hello from './Hello.jsx';

export default class World extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentGreeting: props.greet,
      value: 'ReactSpeed'
    };
    this.slangGreet = this.slangGreet.bind(this);
    this.hindiGreet = this.hindiGreet.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  slangGreet() {
    this.setState({ currentGreeting: 'Yo!' });
  }

  hindiGreet() {
    this.setState({ currentGreeting: 'Namaste' });
  }

  handleNameChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const renderName = this.state.value ? `${this.state.value} says ` : '';
    const renderGreeting = renderName + this.state.currentGreeting;
    return (
      <div>
        <Hello greet={renderGreeting} message="World!" />
        <a className="link" onClick={this.slangGreet}>
          Slang
        </a> OR <a className="link" onClick={this.hindiGreet}>
          Hindi
        </a>
        <br /><br />
        <input
          type="text" value={this.state.value}
          placeholder="Enter a name"
          onChange={this.handleNameChange}
        />
      </div>
    );
  }
}

World.propTypes = {
  greet: React.PropTypes.string.isRequired
};

World.defaultProps = {
  greet: 'Hello'
};
