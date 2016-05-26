# Route Component Layouts (R)

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
- NavLink component.
- Search engine friendly URLs.
- Refactoring layouts with routing.
- Routing for nesting components.
- Refactoring blog with routing.
- Handling router exceptions.
- Refactoring CardStack with routing.

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

    const renderActiveClass = this.props.brand
      ? "" : renderClass + " active";

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

The behavior we are intending with ```renderActiveClass``` is to ensure that
when brand link is clicked there is no active link indicator, otherwise we
get an active link indicator.

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

## Search engine friendly URLs

Right now as you have noticed we are using hash-bang (#) based cryptic URLs. This works
fine out of the box on our development environment. However this is not search engine friendly
or even user friendly.

React Router's solution requires using [HTML5 pushState][2] browser API for handling URL history.
Once you implement search engine friendly URLs, which is a matter of simply
replacing ```hashHistory``` with ```browserHistory```, the links will navigate just fine. However,
if you load any of the deeper links directly by refreshing or bookmarking these, these will fail.

{title="/app/index.jsx using browserHistory", lang=javascript}
~~~~~~~
import React from 'react';
import ReactDOM from 'react-dom';
import BlogPage from './components/BlogPage.jsx';
import HomePage from './components/HomePage.jsx';

import { Router, Route, browserHistory } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={HomePage}/>
    <Route path="/blog" component={BlogPage}/>
  </Router>,
  document.getElementById('app')
);
~~~~~~~

What is going on is that the single page app you have just written is handling the URL just fine
as long as it is coming from the router, it is redirecting to index.html, and the JavaScript modules
bundled within index.html handles the request correctly.
When you call the deeper link urls directly, the HTTP server tries to
look for that URL to serve, and does not find it. The request fails as index.html is no longer involved.

This according, to React Router documentation, unfortunately requires a server-side solution. We say
"unfortunately" because so far we were just fine building a single page app entirely on the front-end.
It will definitely not be an optimum solution to plan a server-side strategy just on the basis
of search engine friendly URLs requirement.

There is hope. One of the reasons we are choosing Firebase as our hosting provider is because
Firebase knows how to work well with Single Page Apps. Although Firebase is comparable to
other static website servers, it does allow for powerful server-side configuration.

Firebase also implements and distinguishes correctly between search engine friendly URLs and clean URLs.

Removing cryptic hash-bang based URLs and following human-readable URLs is **search engine friendly strategy**.

Removing .html at the end of a URL and serving it like you were serving a folder with default index.html is
a **strategy called clean URLs**.

Right now we need the former. Here's how we implement it. Within the ```firebase.json``` config file
we add rules for ```rewrites```. The rule in plain English says - "if server gets a request from any URL
then treat it as a request meant for /index.html".

{title="/firebase.json search engine friendly url config", lang=json}
~~~~~~~
{
  "firebase": "reactspeed",
  "public": "build",
  "ignore": [
    "firebase.json",
    "**/.*",
    "**/node_modules/**"
  ],
  "rewrites": [ {
    "source": "**",
    "destination": "/index.html"
  } ]
}
~~~~~~~

That's it! You will now be serving search engine friendly URLs instead of cryptic hash-bang ones.

If you are not using Firebase hosting then there might still be another solution. The [connect-history-api-fallback][3] NPM package offers a middleware to "proxy requests through a specified index page, useful for Single Page Applications that utilise the HTML5 History API". We have not tried it, however if you want to give it a go and let us know, we will be happy to add such insights for our readers.

{pagebreak}

## Refactoring layouts with routing

Let us continue refactoring and enhancing this app for more advanced use cases.
We want to achieve these objectives in the sections that follow.

- Reuse only one main layout component and render content specific to a route.
- Only display post summaries on blog page. Link to post details.
- Add search engine friendly URLs to our app.
- Handle routes that do not exist.
- Handle URLs that do not exist.

Let us start by refactoring our ```HomePage``` layout component so that we do not
need ```BlogPage``` at all. We instead render content that is different for Home or
Blog based on routes definition.

{title="/app/components/HomePage.jsx refactored for routing", lang=javascript}
~~~~~~~
import React from 'react';
import LeanPub from './LeanPub.jsx';
import Navigation from './Navigation.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Aside from './Aside.jsx';
import Footer from './Footer.jsx';
import SiteData from '../content/SiteData.js';

export default function HomePage(props) {
  return (
    <div className="holygrail">
      <Navigation />
      <Header promo={SiteData.home.header} />
      <main className="holygrail-body">
        <article className="holygrail-content">
          {props.children}
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
HomePage.propTypes = {
  children: React.PropTypes.node
};
~~~~~~~

The new ```HomePage``` component looks different. We have done a few things in this refactor.
We have made the component a stateless component based on ESLint recommendations.
We have also removed ```CardStack``` component and instead added ```props.children```
in its place.

This is where the React Router magic takes place. What React Router can do
is help us configure what to render in place of ```props.children``` based on
routes definition.

{pagebreak}

## Routing for nesting components

Let us revisit our routes definition.

{title="/app/index.jsx refactored for routing", lang=javascript}
~~~~~~~
import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage.jsx';
import PostSummary from './components/PostSummary.jsx';
import PostDetail from './components/PostDetail.jsx';
import CardStack from './components/CardStack.jsx';
import MissingRoute from './components/MissingRoute.jsx';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={HomePage}>
      <IndexRoute component={CardStack} />
      <Route path="/blog" component={PostSummary} />
      <Route path="/blog/:slug" component={PostDetail} />
    </Route>
    <Route path="*" component={HomePage}>
      <IndexRoute component={MissingRoute} />
    </Route>
  </Router>,
  document.getElementById('app')
);
~~~~~~~

Our ```index.jsx``` looks very different as well.
Let us explain what is going on here focusing on ```HomePage``` route first,
followed by other routes and components in later sections within this chapter.

We have created child routes for HomePage, starting with the ```IndexRoute```
which says, if the user visits the HomePage directly, render ```CardStack```
in place of ```this.props.children``` within the HomePage component.

We have also moved the ```/blog``` route as a child of ```/``` route. Instead of
displaying ```BlogPage``` we are now just rendering the ```PostSummary``` component
which lists blog posts, in place of ```this.props.children``` within the HomePage layout component.

Finally, we have added a new ```PostDetail``` component to handle display of
specific posts. We are using the ```/blog/:slug``` routing params feature to indicate
we will be navigating to specific posts based on the post slug. We will see how in the section
below that explains the ```PostDetail``` component.

{pagebreak}

## Refactoring blog with routing

Our blog code looks very different as well. We have changed the ```Blog``` component
to a more appropriate ```PostSummary``` component. We no longer need the ```BlogPage```
component so that goes away. Instead we will reuse the ```HomePage``` component
to display blog content based on routing.

{title="/app/components/PostSummary.jsx refactored for routing", lang=javascript}
~~~~~~~
import React, { PropTypes } from 'react';
import PostData from '../content/PostData.js';
import Card from './Card.jsx';
import { Link } from 'react-router';

function PostSummary({ posts }) {
  const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit';
  return (
    <div>
      <h1>ReactSpeed Blog</h1>
      <div className={gridClass}>
        {posts.map(post =>
          <Card key={post.id}>
            <div className="media">
              {post.thumb
                ? (<Link className="image-link" to={`/blog/${post.slug}`}>
                  <img
                    className="media-figure image"
                    src={post.thumb}
                    alt={post.title}
                  />
                </Link>
                )
                : ''
              }
              <div className="media-body">
                <Link className="image-link" to={`/blog/${post.slug}`}>
                  <h3 className="media-title">{post.title}</h3>
                </Link>
                <p>{post.summary}</p>
              </div>
            </div>
            <Link
              to={`/blog/${post.slug}`}
            >
              Read more...
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
PostSummary.propTypes = {
  posts: PropTypes.array
};
PostSummary.defaultProps = {
  posts: PostData
};

export default PostSummary;
~~~~~~~

We are using ```Link``` component from React Router to navigate based on unique post slugs.

The ```PostDetail``` component handles rendering specific post when we click on a Link.

{title="/app/components/PostDetail.jsx refactored for routing", lang=javascript}
~~~~~~~
import React, { PropTypes } from 'react';
import PostData from '../content/PostData.js';

function PostDetail({ posts, params }) {
  const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit';
  let renderContent = '';
  if (params.slug) {
    for (let i = 0; i < posts.length; ++i) {
      if (posts[i].slug === params.slug) {
        renderContent = (
          <div>
            <h1>{posts[i].title}</h1>
            <div className={gridClass}>
              <div className="media">
                {posts[i].image
                  ? <img
                    className="media-figure image"
                    src={posts[i].image}
                    alt={posts[i].title}
                  />
                  : ''
                }
                <div className="media-body">
                  <p>{posts[i].content.start}</p>
                  <p>{posts[i].content.middle}</p>
                  <p>{posts[i].content.end}</p>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      } else {
        renderContent = (
          <div>
            <h1>Oops! We could not find that...</h1>
            <h2>
              Here is the latest post from our blog.
              Please use top menu to navigate elsewhere.
            </h2>
            <div className={gridClass}>
              <div className="media">
                {posts[posts.length - 1].image
                  ? <img
                    className="media-figure image"
                    src={posts[i].image}
                    alt={posts[i].title}
                  />
                  : ''
                }
                <h1>{posts[posts.length - 1].title}</h1>
                <div className="media-body">
                  <p>{posts[i].content.start}</p>
                  <p>{posts[i].content.middle}</p>
                  <p>{posts[i].content.end}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
  return (renderContent);
}
PostDetail.propTypes = {
  posts: PropTypes.array,
  params: PropTypes.object
};
PostDetail.defaultProps = {
  posts: PostData
};

export default PostDetail;
~~~~~~~

We are using React Router provided ```this.props.params.slug``` to match
the specific post from our data store.

Notice that we are also handling exceptions where the slug does not match or the user has
mistyped the direct url to the blog post.

{pagebreak}

## Handling router exceptions

So far we have encountered two exceptions scenarios when using routes. User could mistype
a blog post url and this case is handled by ```PostDetail``` component itself.

Another exception is when user types a missing route itself. This can be handled
in the routes definition as a general case like so.

{title="/app/index.jsx refactored for routing", lang=javascript}
~~~~~~~
// some code ...
import MissingRoute from './components/MissingRoute.jsx';

// some code ...
ReactDOM.render(
  <Router history={browserHistory}>
    // some code ...
    <Route path="*" component={HomePage}>
      <IndexRoute component={MissingRoute} />
    </Route>
  </Router>,
  document.getElementById('app')
);
~~~~~~~

We are using ```path="*"``` and defining a new ```MissingRoute``` component to
render when the route does not exist.

{title="/app/components/MissingRoute.jsx handles missing route exception", lang=javascript}
~~~~~~~
import React from 'react';
import CardStack from './CardStack.jsx';

function MissingRoute() {
  return (
    <div>
      <h1>Oops! We Could Not Find That...</h1>
      <h2>
        Here's the latest in ReactSpeed UI.
        Please use top menu to navigate elsewhere.
      </h2>
      <CardStack redirect />
    </div>
  );
}

export default MissingRoute;
~~~~~~~

All this component is doing is calling ```CardStack``` component with a new prop ```redirect```
so that ```CardStack``` can decide not to render the title meant for home page.

{title="/app/components/CardStack.jsx handles missing route exception", lang=javascript}
~~~~~~~
{!this.props.redirect ? <h1>ReactSpeed UI Components</h1> : ''}
~~~~~~~

To handle cases where user reaches a route that is not defined or directly accesses a route,
we also modify our webpack configuration to specify the ```publicPath``` so
that ```html-webpack-plugin``` inserts our script modules with absolute paths
and not relative paths to a missing or active route.

{title="Webpack config changes to handle missing route exception", lang=javascript}
~~~~~~~
output: {
  // some code ...
  publicPath: '/'
},
~~~~~~~

A> ## Minimizing Bundle Size
A> React router documents strategy to minimize bundle size for the JS modules
A> by directly referencing components we need from their respective public API modules.
A> Read more [here][4], but please do NOT follow before reading this.
A>
A> We tried doing so and compared the bundle sizes before and after. We notice no
A> difference. In fact the overall bundle size of our JS modules is few bytes
A> lighter when just importing directly from the main react router library.
A> This is the **Webpack bundling magic** for you!
A>
A> Behind the scenes React Router node_modules
A> is >500KB in size. Our overall bundle sizes for app.js and vendor.js which include
A> React, ReactDOM, and React Router modules used by the app are <40 KB and 190KB respectively!
A> Webpack optimally extracts,
A> minifies, and bundles our dependencies and imports, automatically for us,
A> while we focus on writing simple, readable code.

This wraps up advanced usage of React Router. There are few more tricks we may use
in other chapters including the following.

- Using ids with routing.
- Rendering multiple components based on single route.
- Passing properties to components from routing configuration.
- Separating reusable routing configuration.

{pagebreak}

## Refactoring CardStack with routing

We now repeat the refactoring strategies we applied to reusing HomePage for blog features. This time
we go one level deeper into our component hierarchy and address the ```CardStack``` component.

We want the home page to be "light" on first load and provide a sampling of components in the
ReactSpeed UI library. We want to create a side navigation of UI library categories, grouping
UI components by these categories. So, duplicating and refactoring our ```CardStack``` component
we create category specific container components for showcasing button controls, forms, media components,
AJAX components, and infographics.

{title="/app/components/CardStackAjax.jsx extracted from CardStack component", lang=javascript}
~~~~~~~
import React from 'react';
import Card from './Card.jsx';
import GitHub from './GitHub.jsx';

function CardStackAjax() {
  const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit u-textCenter';
  return (
    <div>
      <h1>AJAX Components</h1>

      <div className={gridClass}>
        <Card><GitHub repo="facebook/react" /></Card>
        <Card><GitHub repo="reactjs/redux" /></Card>
      </div>
      <div className={gridClass}>
        <Card><GitHub repo="manavsehgal/reactspeedcoding" /></Card>
      </div>

    </div>
  );
}

export default CardStackAjax;
~~~~~~~

Note that this is a functional component now. As a result ```CardStack``` component
does not have to make AJAX calls when rendering on first page load for our app. Same principle
extracts the Media components into their own ```CardStackMedia``` component, and so on.

Our new router configuration looks like this.

{title="/app/index.jsx refactored router configuration", lang=javascript}
~~~~~~~
import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage.jsx';
import PostSummary from './components/PostSummary.jsx';
import PostDetail from './components/PostDetail.jsx';
import CardStack from './components/CardStack.jsx';
import CardStackAjax from './components/CardStackAjax.jsx';
import CardStackInfo from './components/CardStackInfo.jsx';
import CardStackMedia from './components/CardStackMedia.jsx';
import CardStackButton from './components/CardStackButton.jsx';
import CardStackForm from './components/CardStackForm.jsx';
import MissingRoute from './components/MissingRoute.jsx';

import { Route, Router, IndexRoute, browserHistory } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={HomePage}>
      <IndexRoute component={CardStack} />
      <Route path="/ajax" component={CardStackAjax} />
      <Route path="/infographics" component={CardStackInfo} />
      <Route path="/media" component={CardStackMedia} />
      <Route path="/forms" component={CardStackForm} />
      <Route path="/buttons" component={CardStackButton} />
      <Route path="/blog" component={PostSummary} />
      <Route path="/blog/:slug" component={PostDetail} />
    </Route>
    <Route path="*" component={HomePage}>
      <IndexRoute component={MissingRoute} />
    </Route>
  </Router>,
  document.getElementById('app')
);
~~~~~~~

We now refactor ```Navigation``` and ```NavLink``` components slightly to handle ```className``` passing as
props. This will make ```NavLink``` reusable for the new ```NavigationSidebar``` component.

{title="/app/components/NavigationSidebar.jsx component", lang=javascript}
~~~~~~~
import React from 'react';
import NavLink from './NavLink.jsx';

function NavigationSidebar() {
  return (
    <ul className="sidenav grid grid-gutters large-grid-full">
      <NavLink className="sidenav-link" to="/forms">
        <i className="fa fa-list-alt"></i> Forms
      </NavLink>
      <NavLink className="sidenav-link" to="/buttons">
        <i className="fa fa-hand-pointer-o"></i> Buttons
      </NavLink>
      <NavLink className="sidenav-link" to="/media">
        <i className="fa fa-youtube-play"></i> Media
      </NavLink>
      <NavLink className="sidenav-link" to="/infographics">
        <i className="fa fa-eye"></i> Infographics
      </NavLink>
      <NavLink className="sidenav-link" to="/ajax">
        <i className="fa fa-cloud-download"></i> AJAX
      </NavLink>
    </ul>
  );
}

export default NavigationSidebar;
~~~~~~~

We add the routing links to our new sidebar navigation component and render this as
part of our existing ```Sidebar``` component.

Now the Home page is wired to display two levels of navigation and our component hierarchy
is well represented across easy to navigate categories.

[1]: https://github.com/reactjs/react-router
[2]: https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState().C2.A0method
[3]: https://github.com/bripkens/connect-history-api-fallback
[4]: https://github.com/reactjs/react-router/blob/master/docs/guides/MinimizingBundleSize.md
