import React from 'react';
import Hello from './Hello.jsx';

export default class World extends React.Component {
  constructor(props) {
    super(props);
    this.state = {greet: props.greet};
    this.slangGreet = this.slangGreet.bind(this);
    this.hindiGreet = this.hindiGreet.bind(this);
  }

  slangGreet() {
    this.setState({greet: 'Yo!'});
  }

  hindiGreet() {
    this.setState({greet: 'Namaste'});
  }

  render() {
    return (
      <div>
        <Hello greet={ this.state.greet } message="World!" />
        <a href="#" onClick={ this.slangGreet }>
          Slang greeting
        </a> OR <a href="#" onClick={ this.hindiGreet }>
          Hindi greeting
        </a>
      </div>
    );
  }
}
