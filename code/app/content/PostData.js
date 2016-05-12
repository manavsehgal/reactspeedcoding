const PostData = [
  {
    id: 1,
    title: 'ReactSpeed book is Reddit top trending for Reactjs',
    slug: 'reactspeed-book-reddit-top-tending-reactjs',
    summary: `It is a proud moment for us to be listed as top trending
    news on Reddit Reactjs.`,
    image: '/img/reddit-trending.jpg',
    thumb: '/img/reddit-trending-t.jpg',
    content: {
      start: `Reddit is one of the most respected news sources for developers.
      React subreddit is frequented by more that 10,000 developers voting on
      their favorite React news and trends. Recently ReactSpeed book enjoyed
      trending as top voted news in React for a day! We are so proud and excited.`,

      middle: `We enjoy following Reddit news and users' reactions.
      This gives us valuable insights on what is trending in React community.
      It also guides us on what to write in our React Speed Coding book.`,

      end: `As learning from the Reddit community we are enhancing
      focus on Redux related content, adding visualiation APIs to our
      component todo list, and improving our Angular 2 v React section.`
    }
  },
  {
    id: 2,
    title: 'New Roadmap App For ReactSpeed Readers',
    slug: 'new-roadmap-reactspeed-readers',
    summary: `Roadmap app helps our readers vote on ReactSpeed features,
    components, and book content.`,
    image: '/img/roadmap.jpg',
    thumb: '/img/roadmap-t.jpg',
    content: {
      start: `To help understand how to wire multiple components in React,
      let us create a relatively complex app to manage the the roadmap for ReactSpeed
      book and companion code. We want to list upcoming and recent content and code features.
      Users should have the capability to Like features they want to see first.`,

      middle: `Our roadmap app will require a component to render the individual feature.
      It will also require a component to manage a list of feature components. We would
      also add a search box. A filter component will list features by categories
      like components, styles, chapters, sections, and strategies.`,

      end: `You will note that various components within this app will interact with each
      other (blue dashed lines in the wireframe). Changing filters will interact
      with search, reducing the scope of
      what can be searched. Search will interact with features, showing only features
      that match the text entered in search. Number of likes will interact with order of features.
      Our app will also maintain several UI states. Some candidate states could be,
      active filter, order of features, search text, and last Like clicked.`
    }
  },
  {
    id: 3,
    title: 'Test App Components New Chapter',
    slug: 'test-react-components-new-chapter',
    summary: `This chapter will walk you through multiple testing tools and
    strategies to make your React app more reliable, robust, and performant.`,
    content: {
      start: `Our single page app is mobile-web friendly.
      It responds to smaller or larger screen sizes and adapts the UI accordingly.
      As you continue mobile-web app development, you may want to test your
      app across multiple devices.
      Browsersync is a powerful tool that enables us to do that.
      It plays nicely with Webpack and Hot Reloading,
      while adding synchronized browsing of your app across connected devices.`,

      middle: `Eslint combined with Atom editor package and Webpack is a
      really powerful first-line-of-defense to make
      your React code more readable and reliable. Really fast, while you code each line!
      This will save
      you significant time in downstream testing, team on-boarding, releases, and refactoring.`,

      end: `Just like the awesome ESLint tool for JavaScript,
      we have StyleLint for CSS.`
    }
  },
  {
    id: 4,
    title: 'Routing Component Layouts New Chapter',
    slug: 'routing-component-layouts-new-chapter',
    summary: `So far we have been developing using a single layout.
    For more complex apps you may want
    to use multiple layouts. In order to switch from one layout to another using links or
    page URLs, we will use routing.`,
    content: {
      start: `You will create several new components in this chapter.
      Actually 10 new components!`,

      middle: `Learn about component layout strategies and create HomePage component.
      Develop Aside component. Create Footer component. Header component. Sidebar component.
      BlogPage layout component. Blog component. Post component. Router configuration.
      Navigation component. NavLink component.`,

      end: `React Router can help us map navigation tree with our component tree.
      Right now our intent
      is to have Blog and Home as same level menus and represent different layout components.`
    }
  }
];

export default PostData;
