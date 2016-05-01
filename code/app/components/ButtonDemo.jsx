import React, { PropTypes, Component } from 'react'
import Button from './Button.jsx';

class ButtonDemo extends Component {
  static propTypes = {buttonList: PropTypes.array.isRequired}
  constructor(props) {
    super(props);
    this.state = {demoMessage: 'Click any button...'};
  }

  handleButtonClick(button) {
    this.setState({demoMessage: `Button ${button} clicked.`});
  }

  render () {
    const renderButtons = this.props.buttonList.map(button =>
        <Button
          key={button}
          label={button}
          className={`button ${button}`}
          onClick={this.handleButtonClick.bind(this, button)}
        />
      );

    return (
      <div>
        <p>{this.state.demoMessage}</p>
        {renderButtons}
      </div>
    );
  }
}

export default ButtonDemo;
