# Starting Component Design (S)

If the blank, dark code editor window is staring back at you, do not despair. We will run through 11
different ways you can get started building your components in React!

The objective at this stage is to speedily "prototype" new features and code within your React project.
Subsequent chapters on **Designing Component Internals**, **Wiring Multiple Components**, and **Refactoring Existing Components** will go over best practices to create performant, reusable, and maintainable code.

Here is what you will learn in this chapter along with sample code.

- Designing React components rapidly from samples available on the Web.
- Using Web Embeds like YouTube, Flickr, Twitter, to create React components.
- Converting CSS libraries into React components.
- Integrating third-party REST APIs to start creating React components.
- Moving from a wireframe to a React component.
- Designing mock and converting it to a React component.
- Creating a working prototype and translating this to a React component.
- Starting with a data table and turing this into a React component.
- How to handle real-time streams as a React component.
- How to model documents as a React component.
- How to enhance HTML elements as React components.

## Sample to React (Ss)

You may want to start with an existing single page sample
available on Github or on one of the tutorial websites. Normally this is accompanied
with JSFiddle, CodePen, or similar tools where you can play around with the functionality,
before deciding to bring the code into React.

This is a good place to start your component design journey. The broad sequence of steps are outlined here.

1. Identify root level component name that represents your sample. Define the basic React component.
2. Split sample code HTML, CSS, JavaScript into separate files.
3. Copy HTML DOM that renders the sample UI, into ```render()``` function of the root level component.
4. Optionally, replace some of the HTML with existing reusable components you may already have in your app.
5. Copy CSS into new or existing partial.
6. The JavaScript, if any, can be copied into ```/app/public/js``` folder or, if available over CDN,
referred in ```<script>``` tag from ```/app/templates/index_default.html```.
7. Import the new component into your ```index.jsx``` and create an instance in ```render()``` function.

Advantage of this approach is you get to experiment on features and integration requirements early on
in your development cycle. You also start modularizing various parts of the sample functionality, like
splitting the CSS, JS, and HTML. As your build pipeline (Webpack) is ready to consume these files, you
will run the sample in no time within your app folders and files organization. This also makes it easier
to refactor iteratively as you go over more advanced stages of the component design workflow.

For ReactSpeed website we start with a [sample provided by CSS Tricks][1]. We decide to combine
multiple samples in this tutorial to achieve our target page layout complete with navigation,
header, footer, sidebars, and main content area.

![CSS Tricks sample layout](images/holygrail-layout.jpg)

**Step 1:** We determine that our root level component will be simply called ```Page```.

We start by defining our component. At this stage we could define this component
simply as a stateless component, using pure function instead of class, like we did in case of ```Hello```
component earlier. Root level components mostly end up as classes with some state
management, so we stick to class definition to start with.

Note that we import ```CardStack``` component we designed in earlier chapter. We will replace
some of the HTML from the sample with our reusable component.

{title="/app/components/Page.jsx Page component definition", lang=javascript}
~~~~~~~
import React from 'react';
import CardStack from './CardStack.jsx';

export default class Page extends React.Component {
~~~~~~~

**Step 2, 3:** CSS Tricks sample is nicely modularized in HTML and CSS, so this makes it
easier for us to follow the above mentioned workflow.

We quickly put together our new component, mostly copying over the HTML from the sample.
Note that ```class``` attribute name is changed to ```className``` following JSX requirements.

{title="/app/components/Page.jsx render() function", lang=javascript}
~~~~~~~
render() {
  return (
    <div className="wrapper">
      <ul className="navigation">
        <li><a className="brand" href="/">ReactSpeed</a></li>
        <li><a href="/">Home</a></li>
        <li><a href="https://leanpub.com/reactspeedcoding">Book</a></li>
        <li><a href="https://github.com/manavsehgal/reactspeedcoding">Github</a></li>
      </ul>
      <header className="header">Concept to coding React apps, speedily!</header>
      <article className="main">
        <CardStack />
      </article>
      <aside className="aside aside-1">
        <h3>This app is built using code from the book <a href="https://leanpub.com/reactspeedcoding">React Speed Coding</a>.</h3>
      </aside>
      <aside className="aside aside-2">
        <h3>
        ReactSpeed equips you, for your React project requirements,
        with best practices, optimized workflows, and powerful tooling.
        </h3>
      </aside>
      <footer className="footer">
        Copyright (c) 2016, Manav Sehgal. Code is MIT license.
      </footer>
    </div>
  );
}
~~~~~~~

**Step 4:** Note that we replaced some of the sample HTML within ```<article>``` tag with
our reusable ```CardStack``` component instance.

**Step 5:** We copy the CSS styles into two new partials for navigation and page wrapper.

We further reduce the CSS code and make it more reusable by using nesting from ```PostCSS```
and variables from the ```_theme.css``` we defined earlier.

{title="/app/styles/navigation.css Navigation styles", lang=css}
~~~~~~~
.navigation {
  list-style: none;
  margin: 0px;
  background: $blue;

  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;

  .brand {
    font-weight: bolder;
  }

  a {
    text-decoration: none;
    display: block;
    padding: 0.5em;
    color: $white;

    &:hover {
      background: $fadeblue;
    }

  }
}

@media all and (max-width: 800px) {
  .navigation {
    justify-content: space-around;
  }
}
@media all and (max-width: 600px) {
  .navigation {
    flex-flow: column wrap;
    padding: 0;

    a {
      text-align: center;
      padding: 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.3);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    li:last-of-type a {
      border-bottom: none;
    }
  }
}
~~~~~~~

Here is the code for page wrapper. Once you are done adding this partial, you can
update ```/app/style.css``` by adding ```@import <new partial name>;```.

{title="/app/styles/wrapper.css Page Wrapper styles", lang=css}
~~~~~~~
.wrapper {
  display: flex;

  flex-flow: row wrap;
}

.wrapper > * {
  padding: 10px;
  flex: 1 100%;
}

.header {
  background: $lightblue;
}

.footer {
  background: $lightblue;
}

.main {
  text-align: left;
  background: $white;
}

.aside-1 {
  background: $fadesand;
  width: 200px;
}

.aside-2 {
  background: $sand;
  width: 200px;
}

@media all and (min-width: 600px) {
  .aside {
    flex: 1 auto;
  }
}
@media all and (min-width: 800px) {
  .main {
    flex: 6 0px;
  }

  .aside-1 {
    order: 1;
  }

  .main {
    order: 2;
  }

  .aside-2 {
    order: 3;
  }

  .footer {
    order: 4;
  }
}
~~~~~~~

**Step 6:** For this sample we can skip JS integration. However, in earlier chapter on **Production Optimize Webpack** we follow this strategy to integrate ```html5shiv``` JavaScript into ```/app/public/js``` folder.

**Step 7:** Now all that remains is to import the new ```Page``` component into ```index.jsx``` and
update the ```render()``` function to create an instance of our component like so.

{title="/app/index.jsx import and render Page component", lang=javascript}
~~~~~~~
import Page from './components/Page.jsx';

ReactDOM.render(
  <Page />,
  document.getElementById('app')
);
~~~~~~~

That's it! Now you can run your app as usual and see the new sample in action within
your React app.

![ReactSpeed website layout](images/react-speed.jpg)

The ReactSpeed website layout reflects our sample with significant variation in styles,
and addition of ```CardStack``` component capabilities.

## Embed to React (Se)

Many web platforms like Youtube, Flickr, and Twitter offer embed APIs to easily
integrate their platform features into your app.

Strategy for converting embed code to React component is straightforward.

1. Customize the embed code within target platform to suit your site or app styles
and placement.
2. Optionally, parametrize the embed code attributes using React props.
3. Use stateless component as you will most likely not maintain embed UI state
locally within your React component. Embed code will handle its own UI state.

Let us create a reusable component which takes a YouTube video id and renders
a YouTube video embed.

**Step 1:** This is what a custom YouTube embed code looks like. We have reduced size
to fit our ```Card``` component and customized controls, and other attributes
on YouTube platform.

{title="Custom YouTube embed code", lang=html}
~~~~~~~
<iframe width="200" height="113"
  src="https://www.youtube.com/embed/MGuKhcnrqGA?rel=0&amp;controls=0&amp;showinfo=0"
  frameborder="0" allowfullscreen>
</iframe>
~~~~~~~

**Step 2:** Note that the video id is part of URL following ```/embed/```. This turns into
our only property we pass on to the component.

We also need to change the width and height attributes to achieve responsive sizing. So, as we view
the card on different screens, the video viewer scales to card dimensions. A "quick win"
solution is to change width to ```100%``` and height to ```auto```.

**Step 3:** We create a stateless component using pure function definition. The component takes one
property ```videoid``` and renders the embed code.

{title="/app/components/YouTube.jsx YouTube component", lang=html}
~~~~~~~
import React from 'react';

export default function YouTube(props) {
  const source = `https://www.youtube.com/embed/${props.videoid}?rel=0&amp;controls=0&amp;showinfo=0`;
  return (
    <iframe width="100%" height="auto"
      src={source}
      frameborder="0" allowfullscreen>
    </iframe>
  );
}
~~~~~~~

A> ## ES6 Template Literals
A> Notice that we are using another ES6 feature here called [Template Literals][2] for
A> doing string manipulations. The string is wrapped in back ticks or grave accent characters
A> (the key before !/1 key on your keyboard). We are also passing a JavaScript variable
A> within the string using ```${props.videoid}``` syntax.

Now all we need to do is create an instance of this new component within our ```CardStack```, just
like we did for the ```World``` component.

The component is reusable, so if we want to add multiple videos we just create more instances
and pass a different ```videoid```.

{title="/app/components/CardStack.jsx import and render YouTube component", lang=html}
~~~~~~~
#leanpub-start-insert
import YouTube from './YouTube.jsx';
#leanpub-end-insert

// some code ...

return (
  <ul className="stack">
    <li key="world" className="card demo">
      <World />
    </li>
    #leanpub-start-insert
    <li key="youtube" className="card demo">
      <YouTube videoid="MGuKhcnrqGA" />
    </li>
    #leanpub-end-insert
    {renderMessages}
  </ul>
);
~~~~~~~

Run your app and you will notice the video player takes shape and size of the card. It also
scales when the card dimensions change on different screen sizes.

## CSS libraries to React (Sc)

There are some very good CSS libraries and frameworks available which can speed up our React development.

Normally you would bring these CSS libraries into your React project using one of the following ways.

- Use ```<link rel="stylesheet" href="//url/to/library.min.css"/>``` to reference the
library if it is hosted on a CDN.
- Add a popular library as an NPM dependency and ```@import``` it within ```style.css```.
- Add a library that does not change frequently as a partial and ```@import``` it within ```style.css```.

Next you would refer to the library classes within your HTML code.

Using React components you can further speed up your usage of such libraries. If the CSS libraries themselves
have UI components or controls, these can be represented as React components. This enables you
to create shortcuts to using the library code. You can even do custom processing, apply your own styles,
before rendering the CSS library code.

We follow this strategy to convert CSS libraries to React components.

1. Decide how to import or integrate the library within your React app.
2. Identify component(s) from within the library to determine equivalent React components.
3. Optionally, parametrize any style attributes and repeating elements within
the CSS library as React component properties.
4. Reuse the React component in place of CSS library elements within your app.

We can follow this strategy to convert many popular CSS libraries to React components. For this sample,
we have chosen [Font Awesome][3], one of the most popular iconic font and CSS toolkit.

**Step 1:** As Font Awesome is a popular library and is available over a world class CDN (BootstrapCDN by MaxCDN),
easiest way to integrate this CSS library into our app is to add it to ```index_default.html```.

This has  the added benefit of browser caching for performance. Client browsers that already have Font Awesome in their cache, do not need to download it again when they load our app. Another benefit is that we are always using
the latest version of the CSS library without having to update our app.

{title="/app/templates/index_default.html Link Font Awesome CSS library", lang=html}
~~~~~~~
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
~~~~~~~

**Step 2:** Next we identify which elements of Font Awesome library are candidates
for converting to React components. This is a relatively straightforward decision as Font Awesome
is all about icons. So we can create a reusable React component called Icon. Let us go a step further
into the requirements of our app. We would like to display stats and infographics in our cards, so
our icons will also have an associated text message. So let us call our React Component ```IconText``` and
move on to the next step.

**Step 3:** Now we identify repeating elements and configurable attributes of the CSS library,
in order to turn these into our component properties. Font Awesome icons can be configured using
a rich combination of classes to determine size, orientation, icon graphic, among other features.
All these attributes are candidates for converting to React component properties.

Let us see how our new React component is shaping up.

{title="/app/components/IconText.jsx Font Awesome icon and text component", lang=javascript}
~~~~~~~
import React, { PropTypes } from 'react';

export default class IconText extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
    rotate: PropTypes.number,
    flip: PropTypes.oneOf(['horizontal', 'vertical']),
    inverse: PropTypes.bool
  }

  render () {
    let {
      icon, text, className, size, rotate,
      flip, stack, inverse
    } = this.props;

    let variation = "";

    variation += className ? ` ${className}` : "";
    variation += size ? ` fa-${size}` : "";
    variation += rotate ? ` fa-rotate-${rotate}` : "";
    variation += flip ? ` fa-flip-${flip}` : "";
    variation += inverse ? ` fa-inverse` : "";

    const iconClass = `fa fa-${icon}${variation}`;

    return (
      <div>
        <i className={iconClass}></i>
        <h4>{text}</h4>
      </div>
    );
  }
}
~~~~~~~

A> ## ES5/ES7 Destructuring Assignment
A> We are introducing another ES5/ES7 feature in this code to extract properties from
A> ```this.props``` object. Read more about [destructuring assignment at MDN][4].
A> As this feature was standard in ES5 we do not need any new Babel transform plugins.

**Step 4:** Now we reuse our new component within ```CardStack``` to render some
new ```IconText``` inctances.

{title="/app/components/CardStack.jsx Render IconText components", lang=javascript}
~~~~~~~
#leanpub-start-insert
import IconText from './IconText.jsx';
#leanpub-end-insert

// some code...

return (
  <ul className="stack">
#leanpub-start-insert
    <li key="comp-strat" className="card demo">
        <IconText className="blue" icon="globe" size="5x" text="11 Component Creation Strategies" />
    </li>
    <li key="cust-comp" className="card demo">
        <IconText icon="cog" size="5x" text="Nine Custom Components" />
    </li>
    <li key="fire-base" className="card demo">
        <IconText className="red" icon="database" size="5x" text="Firebase React Integration" />
    </li>
#leanpub-end-insert
    <li key="world" className="card demo">
      <World />
    </li>
    <li key="youtube" className="card demo">
      <YouTube videoid="MGuKhcnrqGA" />
    </li>
    {renderMessages}
  </ul>
);
~~~~~~~

Note the advantages of converting the Font Awesome CSS library to React components. Our component can
be reused with multiple variations in optional properties. We also process custom rendering
of the CSS library elements within component code.

## API to React (Sa)

You may want to integrate an existing API from the multitude of web service providers.

## Wireframe to React (Sw)

Start your React component creation journey with a simple wireframe.

## Mock to React (Sm)

You may have designed a mock for your app using tools like Sketch.

## Prototype to React (Sp)

Rapid prototyping tools take mocks a step further by building interactivity.

## Data table to React (St)

Sometimes you may have a dataset that you want to design into a component.

## Real-time stream to React (Sr)

Real-time streams of data like Twitter feeds, app instrumentation data, device sensor information,
can be thought about as a React component.

## Document to React (Sd)

Are you interested in representing a work document, report, or template as a
React component?

## HTML elements to React (Sh)

Do you want to add more capabilities to HTML markup elements? React can help.

I> ## Chapter In Progress
I> We are still writing this chapter. Please watch this space for updates.
I> Plan is to add examples for each of the 10 different ways for speedily
I> starting component design in React.

[1]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[3]: https://fortawesome.github.io/Font-Awesome/
[4]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
