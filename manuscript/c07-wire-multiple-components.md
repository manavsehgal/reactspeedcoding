# Wire Multiple components (W)

React is all about composition of multiple components. This chapter highlights
best practices in deciding how to design for inter-related multiple components
in your project.

You will learn following concepts in this important chapter.

- Events in multiple components (We).
- Composition using parent child node tree (Wt).
- Routing components (Wr).
- Redux and Flux (Wf).
- When to use presentational verses container components (Wc)
- Reconciliation algorithm and keys for dynamic children (Wk).

{pagebreak}

## The Roadmap app

To help understand this important chapter, let us create a relatively complex app
to manage the the roadmap for ReactSpeed book and companion code. We want to list
upcoming and recent content and code features. Users should have the capability
to *Like* features they want to see first.

![Roadmap app wireframe](images/roadmap.jpg)

Our roadmap app will require a component to render the individual feature.
It will also require a component to manage a list of feature components. We would
also add a search box. A filter component will list features by categories
like components, styles, chapters, sections, and strategies.

You will note that various components within this app will interact with each
other (blue dashed lines in the wireframe). Changing filters will interact with search, reducing the scope of
what can be searched. Search will interact with features, showing only features
that match the text entered in search. Number of likes will interact with order of features.

Our app will also maintain several UI states. Some candidate states could be,
active filter, order of features, search text, and last *Like* clicked.

{pagebreak}

## Events in multiple components (We)

Let us begin creating our Roadmap app by firstly creating some reusable components extending our
ReactSpeed UI library. Let us create a ```button``` CSS module.

We decide to reuse ```<button>``` component provided by React, rather than create our custom  
component.

We want our button to render in multiple colors defined in our ```variables.css``` theme. We also want buttons in
various sizes, like, large, medium, small, and default.

{title="/app/styles/components/button.css custom styles for button", lang=css}
~~~~~~~
.button {
  transition: background-color 0.2s;
  padding: 0.6em 1em;
  border: 0;
  border-radius: 2px;
  margin: 3px;
  cursor: pointer;
  font-size: 0.8125em;
  font-weight: normal;
  line-height: normal;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;

  &:focus {
    outline: none;
    text-decoration:none;
  }

  &.default { @mixin colorize-button $default; }
  &.primary { @mixin colorize-button $primary; }
  &.secondary { @mixin colorize-button $secondary; }
  &.warning { @mixin colorize-button $warning; }
  &.danger { @mixin colorize-button $danger; }
  &.success { @mixin colorize-button $success; }
  &.golden { @mixin colorize-button $golden; }

  &.large {
    padding: 0.8em 1.2em;
    font-size: 1.2em;
  }

  &.medium {
    padding: .6em 1em;
    font-size: 0.9em;
  }

  &.small {
    padding: 0.3em 0.7em;
    font-size: 0.65em;
  }
}
~~~~~~~

Notice we are using CSS mixins to style our button class based on modifiers for different colors.

{title="/app/styles/base/mixins.css mixin for colorizing buttons", lang=css}
~~~~~~~
@define-mixin colorize-button $bg {
  background: $(bg);
  color: white;
  border: 1px solid color($(bg) shade(10%));
  &:active,
  &:focus,
  &:hover {
    background: color($(bg) tint(20%));
    border: 1px solid color($(bg) shade(10%));
    text-decoration:none;
  }
}
~~~~~~~

We want to demonstrate our new reusable styles in our ```CardStack``` component listing.
To manage interactivity for our demo buttons we want to create a ```ButtonDemo``` component
which will be a placeholder for how to add buttons and interactivity with other owner components.

The following code shows two variations of how we create instances of ```button``` component.
Firstly we render the instance directly. Next we parametrize the style information and pass
these as properties to ```ButtonDemo```.

{title="/app/components/CardStack.jsx rendering Button and ButtonDemo", lang=html}
~~~~~~~
<Card>
  <p>Click does not do much...</p>
  <button className="button default">Default</button>
  <button className="button primary">Primary</button>
  <button className="button secondary">Secondary</button>
  <button className="button danger">Danger</button>
  <button className="button success">Success</button>
  <button className="button warning">Warning</button>
  <button className="button golden">Golden</button>
</Card>
<Card>
  <ButtonDemo
    colors={['Golden', 'Success', 'Danger', 'Warning']}
    sizes={['large', 'medium', 'medium', 'small']}
    icons={['coffee', 'cloud', 'flash', 'plug']}
    iconOnly
  />
</Card>
~~~~~~~

The ```ButtonDemo``` component creates and handles events on ```button``` component, and passes these
events as properties to ```button``` component.

Notice how we bind the event handler to ```button``` component and pass a parameter to the
method.

{title="/app/components/ButtonDemo.jsx event handling", lang=javascript}
~~~~~~~
import React, { PropTypes, Component } from 'react'

class ButtonDemo extends Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    icons: PropTypes.array,
    sizes: PropTypes.array,
    iconOnly: PropTypes.bool
  }
  static defaultProps = {icons: [], sizes: [], iconOnly: false}

  constructor(props) {
    super(props);
    this.state = {demoMessage: 'Click any button...'};
  }

  handleButtonClick(color) {
    this.setState({demoMessage: `Button ${color} clicked.`});
  }

  render () {
    const renderButtons = this.props.colors.map((color, i) => {
        const iconClass =
          (this.props.icons === undefined || this.props.icons.length == 0)
            ? `` : ` fa fa-${this.props.icons[i]}`;
        const buttonClass =
          (this.props.sizes === undefined || this.props.sizes.length == 0)
            ? `button ${color.toLowerCase()}`
            : `button ${this.props.sizes[i]} ${color.toLowerCase()}`;
        const renderLabel =
          this.props.iconOnly
            ? <i className={iconClass}></i>
            : (this.props.icons === undefined || this.props.icons.length == 0)
              ? color
              : <div><i className={iconClass}></i>&nbsp;{color}</div>;
        return(
          <button
            key={color}
            className={buttonClass}
            onClick={this.handleButtonClick.bind(this, color)}
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
~~~~~~~

Our render method is relatively complex, however it is creating multiple variations of ```button``` components
based on style parameters passed as properties. As a result, the ```CardStack``` render is relatively simpler, with fewer lines of code when compared with directly rendering instances of the ```button``` component variations.
This is a good strategy for creating visual test pages for your components.

Event handling in multiple components has following key strategies.

- As event handlers often manipulate state, they are best defined where state is defined.
- Define the event handler in outermost owner component.
- Consume on<Event> property within owned components down the multi-component hierarchy.
- Event handlers without any parameters can bind within the constructor.
- Event handlers with parameters can bind within on<Event> property.
- Pass parameter to event handling method using on<Event> property bind expression.

{pagebreak}

## Composition using parent child node tree (Wt)

Once you create reusable components in React, you should be able to compose more
complex, feature rich components by just building a node-tree, just like you do with HTML nodes.

Let us create another component to demonstrate this. This time we are creating an input control.
We want input control to come in several variations. Simple input box. Label and input box.
Icon label and input box. And, icon label, input box, and a button. We want to design our
input box variations within JSX by just combining the required components together.

Here is what our ```CardStack``` component rendering of forms looks like.
This is based on input control styles and ```button``` React component we reused earlier.
Notice how ```CardStack``` is rendering multiple instances of ```Card``` component, which
in turn renders several child nodes including ```button``` and ```inputs``` components
that React provides.

{title="/app/components/CardStack.jsx rendering Input styles", lang=html}
~~~~~~~
<div className={gridClass}>
  <Card>
    <p>Beautiful forms</p>
    <div className="input">
      <span className="input-item">Name</span>
      <input className="input-field" placeholder="Placeholder for name" />
    </div>
    <div className="input">
      <input className="input-field" placeholder="Just a field" />
    </div>
  </Card>
  <Card>
    <p>Responsive forms</p>
    <div className="input">
      <button className="button success"><i className="fa fa-search"></i></button>
      <input className="input-field" placeholder="Search something" />
    </div>
    <div className="input">
      <span className="input-item"><span className="fa fa-envelope"></span></span>
      <input className="input-field" placeholder="Send another one" />
      <button className="button warning">Send</button>
    </div>
  </Card>
</div>
~~~~~~~

We have CSS modules styling default components React provides out of the box. This is a fair iterative design
strategy. We create React components as we need them. If HTML nodes + styles serve the purpose,
we continue moving forward in our app design.

This is another reason for using form controls like input as-is without wrapping them in our own component.
We can use form controls like input as *Controlled Components* where React provides value props and ```this.state.value``` out of the box. This way we do not need to maintain state for such controlled components.

Parent-child tree composition strategies are summarized here.

- Compose components like HTML/DOM tree to render complex variations of reusable components.
- Composition in a node tree creates parent-child relationship between components.
- Parent-child relationship is easier to create than Owner-owned relationship.
- Parent-child relationship is relatively decoupled when compared to Owner-owned relationship.
- Consume child nodes within parent render method using ```this.props.children``` property.

{pagebreak}

## Presentational and container components (Wc)

Our app will use two kind of components. Presentational and container components.

Here are some guidelines to decide presentational and container components as suggested  
by Dan Abramov in his article on [Presentational and Container Components][3].

How do decide that you are writing presentational components.

- Examples: YouTube, LeanPub, Hello, Card, Button.
- Presentational components are concerned about how things look.
- May contain both presentational and container components inside.
- Usually have some DOM markup.
- Have styles associated with the component.
- Often allow containment via this.props.children.
- Have no dependencies on the rest of the app.
- Don’t specify how the data is loaded or mutated.
- Receive data and callbacks exclusively via props.
- Rarely have their own state (when they do, it’s UI state rather than data).
- Are written as functional components unless they need state, lifecycle hooks, or performance optimizations.

How to decide that you are writing container components.

- Examples: FeatureList, Roadmap, World, CardStack, ButtonDemo.
- Are concerned with how things work.
- May contain both presentational and container components inside.
- Usually don’t have any DOM markup of their own except for some wrapping divs
- Never have any styles.
- Provide the data and behavior to presentational or other container components.
- Call Flux actions and provide these as callbacks to the presentational components.
- Are often stateful, as they tend to serve as data sources.
- Are usually generated using higher order components such as connect() from React Redux, createContainer() from Relay, or Container.create() from Flux Utils, rather than written by hand.

{pagebreak}

## Reconciliation algorithm and keys for dynamic children (Wk)

This section is important when you are designing component hierarchies with multiple, repeating
components.

One of the ways React apps remain performant is by doing DOM diff while calculating
which nodes need to be updated during state changes and re-rendering.

This strategy applies to [Dynamic Children][6], where you are creating component nodes
using an iterator or array.

As the Facebook documentation article on [reconciliation algorithm][5] explains, React uses
unique keys to make this algorithm performant.

- **Unique.** The keys need to be unique only within the parent tree.
- **Stable.** Using random generators for keys is not advised as every time the key for same
node may be different, resulting in re-rendering of whole tree. This also leads to unpredictable state.
- **Predictable.** Do not use array ids as keys as elements may get removed, added, or reordered, which in
turn will change the id to element mapping.
- **Outermost Component.** Specify keys for the outermost component that is part
of a dynamic list, not within the component's render method.

There are several strategies for using unique keys.

- **Unique content as key.** If you have a list of finite, pre-defined, unique content items, where you are
certain that the content items will not change, you could reuse the content items as the key.

```
const renderMessages = messages.map(message =>
    <Card key={message} message><h3>{message}</h3></Card>
  );
```

If you do not supply the key in this piece of code, following warning results.

E> ## React keys warning in browser console
E> Warning: Each child in an array or iterator should have a unique "key" prop.
E> Check the render method of `CardStack`.
E> See https://fb.me/react-warning-keys for more information.

- **Database id as key.** When using a database to create dynamic elements, you may want to reuse any
unique ids maintained by your database as key. This transfers the key stability and uniqueness burden
to the underlying database. You also have a consistent way of managing unique keys for the data documents or records
that the specific component is rendering.

- **GUID generators.** When you have user generated dynamic list of nodes in your app, like a set of comments
in a discussion forum, you may want to explore trade-offs between using a GUID generator library or using the underlying database for the unique ids. We prefer the latter approach as it creates less performance burden for our front-end
and avoids data redundancy in maintaining two sets of uniques per record or document.

With this understanding our ```CardStack``` component gets further simplified. We no longer have to supply
keys to child components which are not part of an iterator.

{title="/app/components/CardStack.jsx render method", lang=javascript}
~~~~~~~
render () {
  const messages = this.props.messages;
  const renderMessages = messages.map(message =>
      <Card key={message} message><h3>{message}</h3></Card>
    );

  return (
    <ul className="stack">
      <Card size="2w"><Workflow /></Card>
      <Card>
        <IconText className="blue" icon="globe" size="4x"
          text="Nine Component Creation Strategies" />
      </Card>
      <Card>
        <IconText icon="cog" size="4x" text="10 Custom Components" />
      </Card>
      <Card>
        <IconText className="orange" icon="database" size="4x"
        text="Firebase React Integration" />
      </Card>
      <Card><GitHub repo="facebook/react" /></Card>
      <Card><GitHub repo="webpack/webpack" /></Card>
      <Card><GitHub repo="reactjs/redux" /></Card>
      <Card><World /></Card>
      <Card size="2x"><YouTube videoid="MGuKhcnrqGA" /></Card>
      {renderMessages}
    </ul>
  );
}
~~~~~~~

{pagebreak}

## Key in repeating items (Code update 2016-04-20)

This change applies to the ```messages``` array and list item key attributes.

We can simplify the key requirement for repeat elements by passing actual value from the array
as long as we are certain that the array values will remain unique.

So in our latest code update the ```messages``` array is just an array of unique strings as messages.
We pass this on to key attribute as well as the value for the list items. This further simplifies
our component code.


I> ## Chapter In Progress
I> We are still writing this chapter. Please watch this space for updates.
I> Plan is to add strategies for managing component libraries and writing complex React apps.

[1]: https://medium.com/@learnreact/container-components-c0e67432e005#.gqeyt75at
[2]: https://www.youtube.com/watch?v=KYzlpRvWZ6c&t=1351
[3]: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.awiq3o75o
[4]: https://github.com/andreypopp/react-fa/blob/master/src/Icon.js
[5]: https://facebook.github.io/react/docs/reconciliation.html
[6]: http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
