import React, { PropTypes } from 'react';

const Card = (props) => {
  let variantClass = props.slim ? 'card-slim' : 'card';
  variantClass = props.blank ? 'card-blank' : variantClass;

  const cardClass = props.message
    ? `${variantClass} is-message` : variantClass;

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
  blank: PropTypes.bool,
  onClick: PropTypes.func
};

export default Card;
