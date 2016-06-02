import React from 'react';
const { PropTypes } = React;

const IconSvg = props => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'baseline'
    },
    path: {
      fill: 'currentColor'
    },
    font: {
      fontSize: props.slim ? props.size * 120 / 100 : props.size * 40 / 100
    }
  };
  const renderText = props.slim
    ? <span className={props.textColor}> {props.text} </span>
    : <div className={props.textColor}>{props.text}</div>;
  const renderClassName = props.className ? props.className : props.color;

  return (
    <span className={renderClassName} style={styles.font}>
      {props.left ? renderText : ''}
      <svg
        style={styles.svg}
        width={`${props.size}px`}
        height={`${props.size}px`}
        viewBox="0 0 1024 1024"
      >
        <path
          style={styles.path}
          d={props.icon}
        ></path>
      </svg>
      {props.left ? '' : renderText}
    </span>
  );
};

IconSvg.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  text: PropTypes.string,
  slim: PropTypes.bool,
  textColor: PropTypes.string,
  className: PropTypes.string,
  left: PropTypes.bool
};

IconSvg.defaultProps = {
  size: 16,
  color: 'primary-text',
  text: '',
  slim: false,
  textColor: '',
  className: '',
  left: false
};

export default IconSvg;
