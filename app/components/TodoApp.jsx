import React from 'react';
import TodoList from './TodoList';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.onChange
      = this.onChange.bind(this);
    this.handleSubmit
      = this.handleSubmit.bind(this);
  }
  onChange = (e) =>
    this.setState({ text: e.target.value });
  handleSubmit = (e) => {
    e.preventDefault();
    const nextItems = this.state.items
      .concat([{
        text: this.state.text,
        id: Date.now() }]);
    this.setState({
      items: nextItems,
      text: '' });
  }
  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.onChange}
            value={this.state.text}
          />
          <button>
            {`Add # ${this.state.items.length + 1}`}
          </button>
        </form>
      </div>
    );
  }
}

export default TodoApp;
