import React, { PropTypes } from 'react';

const Card = (props) => {
  const slimClass = props.slim ? 'card-slim' : 'card';

  const cardClass = props.message
    ? `${slimClass} is-message` : slimClass;

  const gridClass = props.className
    ? `grid-cell ${props.className}` : 'grid-cell';

  return (
    <div className={gridClass}>
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
  slim: PropTypes.bool
};

export default Card;
