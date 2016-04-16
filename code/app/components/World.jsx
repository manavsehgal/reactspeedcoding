import React from 'react';
import Hello from './Hello.jsx';

export default class World extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGreeting: props.greet
    };
    this.slangGreet = this.slangGreet.bind(this);
    this.hindiGreet = this.hindiGreet.bind(this);
  }

  slangGreet() {
    this.setState({currentGreeting: 'Yo!'});
  }

  hindiGreet() {
    this.setState({currentGreeting: 'Namaste'});
  }

  render() {
    return (
      <div>
        <Hello greet={ this.state.currentGreeting } message="World!" />
        <a href="#" onClick={ this.slangGreet }>
          Slang
        </a> OR <a href="#" onClick={ this.hindiGreet }>
          Hindi
        </a>
      </div>
    );
  }
}

World.propTypes = {
  greet: React.PropTypes.string.isRequired,
}

World.defaultProps = {
  greet: 'Hello',
}
