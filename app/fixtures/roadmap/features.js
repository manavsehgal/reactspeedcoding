import * as actions from '../../actions/roadmap';

const features = [
  { id: 11,
    title: 'Animated Basic Charts in D3 and React',
    about: `React and D3 are match made in heaven. In this article we will
    create basic pie, bar, line charts with event driven animation using D3
    for visualization and React for the view, data, and state management.`,
    category: actions.Categories.CHAPTER,
    likes: 43,
    link: 'https://medium.com/reactspeed/animated-basic-charts-in-d3-and-react-e131635229c#.sovnu2z1r'
  },
  { id: 1,
    title: 'Roadmap',
    about: `The app implements a features roadmap for ReactSpeed.
    The app is built using Redux and available live on ReactSpeed website.`,
    category: actions.Categories.APP,
    likes: 32,
    link: 'https://github.com/manavsehgal/reactspeedcoding/blob/master/app/components/Roadmap/index.jsx'
  },
  { id: 2,
    title: 'Navigation',
    about: `This component renders main menu navigation items. It also
    renders React Router Links as child components.`,
    category: actions.Categories.COMPONENT,
    likes: 23,
    link: 'https://github.com/manavsehgal/reactspeedcoding/blob/master/app/components/Navigation.jsx'
  },
  { id: 3,
    title: 'Test App Components',
    about: `The chapter discusses ESLint, StyleLint, Browsersync setup using Webpack.
    It also introduces Behavior-Driven Development using Mocha, Chai, and Enzyme.`,
    category: actions.Categories.CHAPTER,
    likes: 15,
    link: 'http://reactspeed.com/blog/test-react-components-new-chapter'
  },
  { id: 4,
    title: 'Routing Component Layouts',
    about: `The chapter explains React Router and creates more than 10 custom
    React components for defining layout of a blog app.`,
    category: actions.Categories.CHAPTER,
    likes: 12,
    link: 'http://localhost:8080/blog/routing-component-layouts-new-chapter'
  },
  { id: 5,
    title: 'GitHub',
    about: `This component demonstrates jQuery integration within React component
    lifecycle methods and calling external REST API using AJAX.`,
    category: actions.Categories.COMPONENT,
    likes: 13,
    link: 'https://github.com/manavsehgal/reactspeedcoding/blob/master/app/components/GitHub.jsx'
  },
  { id: 6,
    title: 'Card',
    about: `Card component is very versatile and used extensively throughout ReactSpeed.com
    website for rendering custom components using FlexBox grid system.`,
    category: actions.Categories.COMPONENT,
    likes: 10,
    link: 'https://github.com/manavsehgal/reactspeedcoding/blob/master/app/components/Card.jsx'
  },
  { id: 7,
    title: 'Browsersync and Webpack For Testing Web Apps Across Multiple Devices',
    about: `Browsersync is a powerful tool that enables us to do that.
    It plays nicely with Webpack and Hot Reloading, while adding synchronized
    browsing of your app across connected devices.`,
    category: actions.Categories.CHAPTER,
    likes: 7,
    link: 'https://medium.com/reactspeed/browsersync-and-webpack-for-testing-web-apps-across-multiple-devices-64e7f7fa62f2#.rrbcepjw4'
  },
  { id: 8,
    title: 'ESLint Install and Configure for React Apps',
    about: `ESLint is very capable and powerful. It can help automate many
    of the concerns described here and do so in an elegant non-intrusive manner
    completely configurable to individual developer or team preferences.`,
    category: actions.Categories.CHAPTER,
    likes: 2,
    link: 'https://medium.com/reactspeed/eslint-install-and-configure-for-react-apps-f7c3a28c5573#.m4vkxngtw'
  },
  { id: 9,
    title: 'News',
    about: `The news app demonstrates nested routing, search engine friendly URLs,
    React Router Link component, and data fixtures.`,
    category: actions.Categories.APP,
    likes: 1,
    link: 'http://reactspeed.com/blog'
  },
  { id: 10,
    title: 'ReactSpeed',
    about: `The ReactSpeed website is coded in React using concepts described in the
    book React Speed Coding. It presents an interactive library of custom React components
    for the users.`,
    category: actions.Categories.APP,
    likes: 1,
    link: 'http://reactspeed.com'
  }
];

export default features;
