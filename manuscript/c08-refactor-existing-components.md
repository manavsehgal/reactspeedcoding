# Refactor Existing Components (R)

Refactoring is an essential part of iterative development. React is ideal for iterative
refactoring of your code because of component based development.

{pagebreak}

## Refactoring to render node children (Rc)

All JSX HTML-like tags are actually React components. You can start your component
design by copying HTML from a sample or existing source into render method.

At some stage you will want to convert these nodes into React components and gain
benefits of composition design pattern, among others.

A straightforward strategy to do this kind of refactoring is
to use ```this.props.children```. Any nodes or components contained within a
parent node can be available to the parent with this strategy.

You may want to follow this strategy if you are not passing any properties
from parent to child nodes. You may also want to leave any state management to
the contained component. This strategy also helps if you are mostly interested
in *decorating* the child node with additional styles or HTML tags in a consistent
manner. Cases where you want to future-proof your code and add new child nodes,
representing new components, are also ideal for this refactoring strategy.

Our ```Card``` and ```CardStack``` components are ideal for this refactoring strategy.
So far we have been adding many custom components to the ```CardStack``` using ```<li>``` node
as parent for the child component. Now let us consider a scenario where you want to
use ```<div>``` instead of ```<li>``` or a more complex set of HTML and CSS to represent
a ```Card```. You will face two challenges. You will need to find and replace nodes in multiple
places. Any changes done to ```Card``` component will not reflect, unless you copy these
changes to nodes that are not rendering the ```Card``` component.

{title="/app/components/Card.jsx original Card component", lang=javascript}
~~~~~~~
import React from 'react';

export default function Card(props) {
  return (
    <li className="card message">
      <h3>{props.message}</h3>
    </li>
  );
}
~~~~~~~

Our refactored ```Card``` component is way more powerful now. It can handle
multiple sizes for rendering cards of varying dimensions. It can also render
distinctly if we are displaying a message.

Note that using ```{this.react.children}``` requires
we convert our component into a class definition, so that it can inherit
props.children and related utility methods from the ```React.Component``` parent.

{title="/app/components/Card.jsx refactored Card component", lang=javascript}
~~~~~~~
import React, {PropTypes} from 'react';

export default class Card extends React.Component {
  static propTypes = { size: PropTypes.string, message: PropTypes.bool }
  static defaultProps = { size: '', message: false }
  render() {
    const messageClass = this.props.message ? ' message': '';

    const cardClass = this.props.size
      ? `card-${this.props.size}${messageClass}`
      : `card${messageClass}`;

    return (
      <li className={cardClass}>
        {this.props.children}
      </li>
    );
  }
}
~~~~~~~

Another benefit from this refactoring is reduced, easier to read code for
our ```CardStack``` render method. Notice how we are passing ```message```
property without initializing it with a value. React understands this as a
boolean property with value as true.

{title="/app/components/Card.jsx refactored Card component", lang=javascript}
~~~~~~~
render () {
  const messages = this.props.messages;
  const renderMessages = messages.map(message =>
      <Card key={message} message><h3>{message}</h3></Card>
    );

  return (
    <ul className="stack">
      <Card key="workflow" size="2w"><Workflow /></Card>
      <Card key="comp-strat">
        <IconText className="blue" icon="globe"
          size="4x" text="Nine Component Creation Strategies" />
      </Card>
      <Card key="comp-cust">
        <IconText icon="cog"
          size="4x" text="10 Custom Components" />
      </Card>
      <Card key="firebase">
        <IconText className="orange" icon="database"
          size="4x" text="Firebase React Integration" />
      </Card>
      <Card key="github-react"><GitHub repo="facebook/react" /></Card>
      <Card key="github-webpack"><GitHub repo="webpack/webpack" /></Card>
      <Card key="github-redux"><GitHub repo="reactjs/redux" /></Card>
      <Card key="youtube"><YouTube videoid="MGuKhcnrqGA" /></Card>
      <Card key="world"><World /></Card>
      {renderMessages}
    </ul>
  );
}
~~~~~~~

Extending HTML nodes or React components representing standard HTML tags is another
use case for this refactoring strategy. As long as you are consuming any properties
only within the owner component or only within the contained component, this strategy
provides an easy path to refactoring.

{pagebreak}

## ES5 to ES6 React component definition (Re)

Most React content on the Web still refers to ES5 code. This section is about
refactoring existing E5 React component to ES6 code.

## Testing and refactoring (Rt)

This section will cover aspects of testing that may influence refactoring decisions.

I> ## Chapter In Progress
I> We are still writing this chapter. Please watch this space for updates.
I> Plan is to add refactoring strategies for testing, performance, reliability, and speed coding.
