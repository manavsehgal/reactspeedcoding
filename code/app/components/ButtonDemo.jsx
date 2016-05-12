import React, { PropTypes, Component } from 'react';

class ButtonDemo extends Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    icons: PropTypes.array,
    sizes: PropTypes.array,
    iconOnly: PropTypes.bool
  }
  static defaultProps = { icons: [], sizes: [], iconOnly: false }

  constructor(props) {
    super(props);
    this.state = { demoMessage: 'Click any button...' };
  }

  handleButtonClick(color) {
    this.setState({ demoMessage: `Button ${color} clicked.` });
  }

  render() {
    const renderButtons = this.props.colors.map((color, i) => {
      const iconClass =
        (this.props.icons === undefined || this.props.icons.length === 0)
          ? '' : ` fa fa-${this.props.icons[i]}`;

      const buttonClass =
        (this.props.sizes === undefined || this.props.sizes.length === 0)
          ? `button ${color.toLowerCase()}`
          : `button ${this.props.sizes[i]} ${color.toLowerCase()}`;

      const renderIcons =
        (this.props.icons === undefined || this.props.icons.length === 0)
          ? color
          : <div><i className={iconClass}></i>&nbsp;{color}</div>;

      const renderLabel =
        this.props.iconOnly
          ? <i className={iconClass}></i>
          : renderIcons;

      return (
        <button
          key={color}
          className={buttonClass}
          /* eslint-disable react/jsx-no-bind */
          onClick={this.handleButtonClick.bind(this, color)}
          /* eslint-enable react/jsx-no-bind */
        >
          {renderLabel}
        </button>
      );
    });

    return (
      <div>
        <p>{this.state.demoMessage}</p>
        {renderButtons}
      </div>
    );
  }
}

export default ButtonDemo;
