# Routing Component Layouts

So far we have been developing using a single layout. For more complex apps you may want
to use multiple layouts. In order to switch from one layout to another using links or
page URLs, we will use routing.

You will create several new components in this chapter. Actually 10 new components!

- Learn about component layout strategies and create HomePage component.
- Develop Aside component.
- Create Footer component.
- Header component.
- Sidebar component.
- BlogPage layout component.
- Blog component.
- Post component.
- Router configuration.
- Navigation component.

{pagebreak}

## Component layout strategies

To demonstrate routing, let us build a ```BlogPage``` layout
component based on our ```Page``` component. First we will refactor ```Page``` layout component
to turn it into a composition of more reusable components. This way we will reuse most of
these components in the new ```BlogPage``` layout component. We will also rename the ```Page```
component to ```HomePage``` which is more appropriate for the function it performs.

We apply following strategies for creating reusable layout components.

- Identify a data store for page specific content. In our example we create ```/content/SiteData.js``` module
as a simple JSON data store.
- Identify native component compositions that can be encapsulated as custom components.
Group by single responsibility principle. In our example we are able
to identify ```Header```, ```Sidebar```, ```Aside```, ```Footer```, and ```Navigation``` components this way.
- As in our case identifying custom components is straightforward if we have modularized our CSS styles already.
Each style module will correspond to a custom component in most cases.
- Use properties for passing page or layout instance or route specific data.
- Use ```this.props.children``` where appropriate to pass HTML content.

These strategies have several benefits.

- You components are more reusable. They can handle multiple scenarios, where props are passed, not passed, child nodes
are available, or not available.
- Your content is more reusable. Copyright messages, promos that repeat across your website can be edited in one place
to update entire site.
- You layout component is simpler. Compare HomePage with Page component we wrote earlier. It has nearly fifty percent less
code but does much more.
- It makes routing fairly straightforward.
- Using JSON object we also simplify the props passed to components that need multiple related values. Like in case of
the ```Header``` component where we only pass ```promo``` JSON object subtree.

{title="/app/components/HomePage.jsx refactor Page layout", lang=javascript}
~~~~~~~
import React from 'react';
import CardStack from './CardStack.jsx';
import LeanPub from './LeanPub.jsx';
import Navigation from './Navigation.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Aside from './Aside.jsx';
import Footer from './Footer.jsx';
import SiteData from '../content/SiteData.js';

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="holygrail">
        <Navigation />
        <Header promo={SiteData.home.header} />
        <main className="holygrail-body">
          <article className="holygrail-content">
            <CardStack />
          </article>
          <Sidebar data={SiteData.home.sidebar} />
          <Aside tagline={SiteData.tagline}>
            <LeanPub bookid="reactspeedcoding" />
          </Aside>
        </main>
        <Footer copyright={SiteData.copyright} />
      </div>
    );
  }
}
~~~~~~~

This is what our JSON data store looks like.

{title="/app/content/SiteData.js JSON data store", lang=javascript}
~~~~~~~
const SiteData = {
  copyright:
    `Copyright (c) 2016, Manav Sehgal.
    Book and blog text is CC BY-NC-ND 2.0 license.
    Code is MIT license.`,

  tagline:
    `ReactSpeed equips you with best practices,
    optimized workflows, and powerful tooling.`,

  home: {
    header: {
      message: `Learn how this web app is coded in React.`,

      promoButton: {
        url: 'https://leanpub.com/reactspeedcoding',
        label: 'Get React Speed Book'
      }
    },
    sidebar: {
      messages: [
      `Learn to build your own custom UI library in React, Flexbox, and PostCSS.`,
      `Apply new ES6 features to make your React code more reliable.`,
      `Master component design workflow
      with several strategies for reusable, reliable, and rapid coding in React.`,
      `Connect to a real-time database using Firebase.`,
      `Speed up your React development workflow using Webpack.`,
      `Download and reuse fully tested source code from GitHub. Run demo app and components live
      at ReactSpeed website.`
      ],

      promoButton: {
        url: 'https://leanpub.com/reactspeedcoding',
        label: `Read React Speed Coding`
      }
    }
  }
}

export default SiteData;
~~~~~~~

A> ## Safe Coding HTML
A> Unlike many other JS frameworks, React makes it difficult to inject HTML directly from a data source.
A> This is done to avoid situations where you might be using a third party library
A> which may introduce XSS attacks.
A>
A> Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise
A> benign and trusted web sites. XSS attacks occur when an attacker uses a web application to send malicious code,
A> generally in the form of a browser side script, to a different end user.
A>
A> Our strategy of separating page content into non-HTML JSON data tree and HTML from ```this.props.children``` has
A> dual benefits of avoiding XSS attacks and making your components way more reusable.

Next let us look at the components making up our layout component.

{pagebreak}

## Aside component

Here is the new ```Aside``` component. Note that it can take node children as well
as only a tagline, or both.

{title="/app/components/Aside.jsx component", lang=javascript}
~~~~~~~
import React, { PropTypes } from 'react';

class Aside extends React.Component {
  static propTypes = {
    tagline: PropTypes.string
  }
  static defaultProps = {
    tagline: ''
  }
  render () {
    return (
      <aside className="holygrail-ads u-textCenter">
        {this.props.children}
        {this.props.tagline ? <h3>{this.props.tagline}</h3> : ''}
      </aside>
    );
  }
}

export default Aside;
~~~~~~~

{pagebreak}

## Footer component

The ```Footer``` component is similar to ```Aside``` component we designed earlier.

{title="/app/components/Footer.jsx component", lang=javascript}
~~~~~~~
import React, { PropTypes } from 'react'

class Footer extends React.Component {
  static propTypes = {
    copyright: PropTypes.string
  }
  static defaultProps = {
    copyright: ''
  }
  render () {
    return (
      <footer className="holygrail-footer">
        <div className="Footer">
          {this.props.copyright ? <p>{this.props.copyright}</p> : ''}
          {this.props.children}
        </div>
      </footer>
    );
  }
}

export default Footer;
~~~~~~~

{pagebreak}

## Header component

The ```Header``` component processes ```promo``` JSON object subtree passed using single JSX attribute.

{title="/app/components/Header.jsx component", lang=javascript}
~~~~~~~
import React, { PropTypes } from 'react';

class Header extends React.Component {
  static propTypes = {
    promo: PropTypes.object
  }
  static defaultProps = {
    promo: {}
  }
  render () {
    const promo = this.props.promo;
    return (
      <header className="holygrail-header">
        <div className="header header-cozy" role="banner">
          { promo
            ? <div>
                {promo.message}&nbsp;
                <a href={promo.promoButton.url} className="button success">
                  {promo.promoButton.label}
                </a>
              </div>
            : ''
          }
          {this.props.children}
        </div>
      </header>
    );
  }
}

export default Header;
~~~~~~~

{pagebreak}

## Sidebar component

The ```Sidebar``` component uses an iterator to display multiple messages.

{title="/app/components/Sidebar.jsx component", lang=javascript}
~~~~~~~
import React, { PropTypes } from 'react';

class Sidebar extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }
  static defaultProps = {
    data: {}
  }

  render () {
    const data = this.props.data;
    return(
      <nav className="holygrail-nav u-textCenter">
        {
          (data && data.messages)
            ? data.messages.map((message, i) => <p key={i}>{message}</p>)
            : ''
        }
        {
          (data && data.promoButton)
            ? <a href={data.promoButton.url}
                className="button success">{data.promoButton.label}</a>
            : ''
        }
        {this.props.children}
      </nav>
    );
  }
}

export default Sidebar;
~~~~~~~

{pagebreak}

## BlogPage layout component

Before we hit the ```Navigation``` component, let us create our ```BlogPage``` layout component
and configure our routes.

{title="/app/components/BlogPage.jsx layout component", lang=javascript}
~~~~~~~
import React from 'react';
import CardStack from './CardStack.jsx';
import LeanPub from './LeanPub.jsx';
import Navigation from './Navigation.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Aside from './Aside.jsx';
import Footer from './Footer.jsx';
import SiteData from '../content/SiteData.js';

import Blog from './Blog.jsx';

export default class BlogPage extends React.Component {
  render() {
    return (
      <div className="holygrail">
        <Navigation />
        <Header promo={SiteData.blog.header} />
        <main className="holygrail-body">
          <article className="holygrail-content">
            <Blog />
          </article>
          <Sidebar data={SiteData.home.sidebar} />
          <Aside tagline={SiteData.tagline}>
            <LeanPub bookid="reactspeedcoding" />
          </Aside>
        </main>
        <Footer copyright={SiteData.copyright} />
      </div>
    );
  }
}
~~~~~~~

Notice how similar the ```BlogPage``` layout component is to the ```HomePage``` component.
The only major difference is the ```Blog``` component used within ```article``` node.

{pagebreak}

## Blog component

Let us create our ```Blog``` component as well.

{title="/app/components/Blog.jsx component", lang=javascript}
~~~~~~~
import React, { PropTypes } from 'react';
import PostData from '../content/PostData.js';
import Post from './Post.jsx';
import Card from './Card.jsx';

class Blog extends React.Component {
  static propTypes = {
    posts: PropTypes.array
  }
  static defaultProps = {
    posts: PostData
  }
  render () {
    const gridClass = "grid grid-gutters grid-full grid-flex-cells large-grid-fit";
    const posts = this.props.posts;
    const renderPostSummaries = posts.map(post =>
      <Card key={post.id}>
        <Post
          title={post.title}
          summary={post.summary}
          image={post.image}
          content={post.content}
        />
      </Card>
    );
    return(
      <div>
        <h1>ReactSpeed Blog</h1>
        <div className={gridClass}>
          {renderPostSummaries}
        </div>
      </div>
    );
  }
}

export default Blog;
~~~~~~~

We are keeping the ```Blog``` component
simple for now. Following our strategy for separating content into a JSON data store, we
also create the ```PostData.js``` data store for blog posts.

{title="/app/content/PostData.js data store", lang=javascript}
~~~~~~~
const PostData = [
  {
    id: 1,
    title: `ReactSpeed book is Reddit top trending for Reactjs`,
    summary: `It is a proud moment for us to be listed as top trending
    news on Reddit Reactjs.`,
    image: '/img/reddit-trending.jpg',
    content: {
      start: `Some content...`,
      middle: `Some more content...`,
      end: `And some more...`,
    }
  },
  {
    id: 2,
    title: `New Roadmap App For ReactSpeed Readers`,
    summary: `Roadmap app helps our readers vote on ReactSpeed features,
    components, and book content.`,
    image: '/img/roadmap.jpg',
    content: {
      start: `Some content...`,
      middle: `Some more content...`,
      end: `And some more...`,
    }
  }
];

export default PostData;
~~~~~~~

{pagebreak}

## Post component

Let us create our ```Post``` component to display the blog posts.

{title="/app/components/Post.jsx component", lang=javascript}
~~~~~~~
import React, { PropTypes } from 'react';

class Post extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
    content: PropTypes.object,
    image: PropTypes.string,
    author: PropTypes.string
  }

  static defaultProps = {
    author: '',
    summary: '',
    content: {},
    image: ''
  }

  render () {
    const {
      title, summary, content, author, image
    } = this.props;

    return (
      <div className="media">
        {image
          ? <img className="media-figure Image" src={image} alt="Post Image" />
          : ''
        }
        <div className="media-body">
          <h2 className="media-title">{title}</h2>
          {author ? <h4>{author}</h4> : ''}
          {summary ? <p><b>{summary}</b></p> : ''}
          {content.start ? <p>{content.start}</p> : ''}
          {content.middle ? <p>{content.middle}</p> : ''}
          {content.end ? <p>{content.end}</p> : ''}
        </div>
      </div>
    );
  }
}

export default Post;
~~~~~~~

Notice how ```Post``` component reuses ```Card``` component to render blog posts
using familiar card based layout.

{pagebreak}

## Router configuration

It is now time to configure our router. We do this by modifying our root component ```app```
within ```index.jsx``` file.

{title="/app/index.jsx root component", lang=javascript}
~~~~~~~
import React from 'react';
import ReactDOM from 'react-dom';
import BlogPage from './components/BlogPage.jsx';
import HomePage from './components/HomePage.jsx';

import { Router, Route, hashHistory } from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={HomePage}/>
    <Route path="/blog" component={BlogPage}/>
  </Router>,
  document.getElementById('app')
);
~~~~~~~

Note that we are using the awesome [React Router][1] for creating and managing our routes
within React app. To use React Router we add it using NPM.

```
npm install --save react-router
```

React Router can help us map navigation tree with our component tree. Right now our intent
is to have Blog and Home as same level menus and represent different layout components.

Once we have a hierarchy of menus, like menus for blog categories, we could use nesting of these
routes to map navigation nesting with component nesting. In that scenario we will call nested
components with ```this.props.children``` and router will swap the appropriate component depending
on the menu clicked.

Finally, once we have configured our router, we can go ahead and create our ```Navigation``` component
and create links to render various layout components.

{pagebreak}

## Navigation component

The ```Navigation``` component uses ```Link``` to replace normal links with router specific links.

{title="/app/components/Navigation.jsx component", lang=javascript}
~~~~~~~
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class Navigation extends React.Component {
  render () {
    return (
      <ul className="navigation grid grid-gutters large-grid-fit med-grid-fit small-grid-1of2">
        <li className="grid-cell">
          <Link className="navigation-link navigation-brand" to="/">
            ReactSpeed
          </Link>
        </li>
        <li className="grid-cell">
          <a className="navigation-link"
            href="https://leanpub.com/reactspeedcoding">
              <i className="fa fa-book"></i> Book
          </a>
        </li>
        <li className="grid-cell">
          <a className="navigation-link"
            href="https://github.com/manavsehgal/reactspeedcoding">
              <i className="fa fa-github"></i> Code
          </a>
        </li>
        <li className="grid-cell">
          <Link className="navigation-link" to="/blog">
            <i className="fa fa-comments"></i> Blog
          </Link>
        </li>
      </ul>
    );
  }
}

export default Navigation;
~~~~~~~

Now clicking on ReactSpeed menu and Blog menu will bring up the respective layout components.

Let us also use React Router to indicate active menu. To do this we change the ```Link``` component
and add ```activeClassName``` prop like so. We add a CSS modifier ```active``` to indicate
that this menu is active.

{title="/app/components/Navigation.jsx active link", lang=javascript}
~~~~~~~
<Link
  className="navigation-link"
  activeClassName="navigation-link active"
  to="/blog"
>
  <i className="fa fa-comments"></i> Blog
</Link>
~~~~~~~

{pagebreak}

## NavLink component

We can extract another component to make our navigation links less verbose.
Let us write ```NavLink``` component to encapsulate rendering of ```Link```
based on associated style modules, modifier (brand link), and props (href or to).

{title="/app/components/NavLink.jsx component", lang=javascript}
~~~~~~~
import React, {PropTypes} from 'react';
import { Link } from 'react-router';

export default class NavLinks extends React.Component {
  static propTypes = {brand: PropTypes.bool}
  static defaultProps = {brand: false}

  render() {
    const renderClass = this.props.brand
      ? "navigation-link navigation-brand"
      : "navigation-link";

    const renderActiveClass = renderClass +
      (this.props.to && this.props.brand) ? " active" : "";

    return (
      <li className="grid-cell">
        {
          this.props.to
          ? <Link
              {...this.props}
              className={renderClass}
              activeClassName={renderActiveClass}
            />
          : <a {...this.props} className="navigation-link" />
        }
      </li>
    );
  }
}
~~~~~~~

Note that we are using ```{...this.props}``` JSX spread attributes to pass remaining
attributes and children. Saves us some typing this way.

Our ```Navigation``` links are now much simpler.

{title="/app/components/Navigation.jsx active link", lang=javascript}
~~~~~~~
// some code...
<NavLink to="/" brand>ReactSpeed</NavLink>
<NavLink href="https://leanpub.com/reactspeedcoding">
  <i className="fa fa-book"></i> Book
</NavLink>
<NavLink href="https://github.com/manavsehgal/reactspeedcoding">
  <i className="fa fa-github"></i> Code
</NavLink>
<NavLink to="/blog">
  <i className="fa fa-comments"></i> Blog
</NavLink>
// some code...
~~~~~~~


{pagebreak}

## Next steps

You can continue refactoring and enhancing this app for more advanced use cases. Some of the
ideas include following features.

- Only display post summaries on blog page. Link to post details.
- Convert the JSON data stores to Firebase data store.
- Add search engine friendly URLs to our app.

[1]: https://github.com/reactjs/react-router
