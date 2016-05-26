import React, { PropTypes } from 'react';

const IconText = ({ icon, text, className, size, rotate, flip, inverse }) => {
  let variation = '';

  variation += className ? ` ${className}` : '';
  variation += size ? ` fa-${size}` : '';
  variation += rotate ? ` fa-rotate-${rotate}` : '';
  variation += flip ? ` fa-flip-${flip}` : '';
  variation += inverse ? ' fa-inverse' : '';

  const iconClass = `fa fa-${icon}${variation}`;

  return (
    <div>
      <i className={iconClass}></i>
      <h4>{text}</h4>
    </div>
  );
};

IconText.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
  rotate: PropTypes.number,
  flip: PropTypes.oneOf(['horizontal', 'vertical']),
  inverse: PropTypes.bool
};

export default IconText;
