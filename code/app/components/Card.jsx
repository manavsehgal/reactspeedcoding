import React, { PropTypes } from 'react';

const Card = (props) => {
  const slimClass = props.slim ? 'card-slim' : 'card';

  const cardClass = props.message
    ? `${slimClass} is-message` : slimClass;

  const gridClass = props.className
    ? `grid-cell ${props.className}` : 'grid-cell';

  return (
    <div onClick={props.onClick} className={gridClass}>
      <div className={cardClass}>
        {props.children}
      </div>
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  message: PropTypes.bool,
  children: PropTypes.node,
  slim: PropTypes.bool,
  onClick: PropTypes.func
};

export default Card;
