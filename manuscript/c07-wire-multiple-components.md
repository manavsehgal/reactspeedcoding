# Wire Multiple components (W)

React is all about composition of multiple components. This chapter highlights
best practices in deciding how to design for inter-related multiple components
in your project.

You will learn following concepts in this important chapter.

- When to use presentational verses container components.
- Strategy for passing component as a property to another component.
- Reconciliation algorithm and keys for dynamic children.

{pagebreak}

## Presentational and container components (Wc)

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

Our app will use two kind of components. Presentational and container components.

Here are some guidelines to decide presentational and container components as suggested  
by Dan Abramov in his article on [Presentational and Container Components][3].

How do decide that you are writing presentational components.

- Examples: YouTube, LeanPub, Hello, Card.
- Presentational components are concerned about how things look.
- May contain both presentational and container components inside.
- Usually have some DOM markup and styles associated with the component.
- Often allow containment via this.props.children.
- Have no dependencies on the rest of the app.
- Don’t specify how the data is loaded or mutated.
- Receive data and callbacks exclusively via props.
- Rarely have their own state (when they do, it’s UI state rather than data).
- Are written as functional components unless they need state, lifecycle hooks, or performance optimizations.

How to decide that you are writing container components.

- Examples: FeatureList, Roadmap, World, CardStack.
- Are concerned with how things work.
- May contain both presentational and container components inside.
- Usually don’t have any DOM markup of their own except for some wrapping divs
- Never have any styles.
- Provide the data and behavior to presentational or other container components.
- Call Flux actions and provide these as callbacks to the presentational components.
- Are often stateful, as they tend to serve as data sources.
- Are usually generated using higher order components such as connect() from React Redux, createContainer() from Relay, or Container.create() from Flux Utils, rather than written by hand.


## Passing Component as a property (Wp)

See how React Font Awesome component [passes a component as a property][4].

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

{pagebreak}

I> ## Chapter In Progress
I> We are still writing this chapter. Please watch this space for updates.
I> Plan is to add strategies for managing component libraries and writing complex React apps.

[1]: https://medium.com/@learnreact/container-components-c0e67432e005#.gqeyt75at
[2]: https://www.youtube.com/watch?v=KYzlpRvWZ6c&t=1351
[3]: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.awiq3o75o
[4]: https://github.com/andreypopp/react-fa/blob/master/src/Icon.js
[5]: https://facebook.github.io/react/docs/reconciliation.html
[6]: http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
