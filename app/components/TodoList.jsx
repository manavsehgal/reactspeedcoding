import React, { PropTypes } from 'react';

const TodoList = ({ items }) => {
  const createItem = (item) => <div key={item.id}>{item.text}</div>;
  return <div>{items.map(createItem)}</div>;
};

TodoList.propTypes = { items: PropTypes.array.isRequired };

export default TodoList;
