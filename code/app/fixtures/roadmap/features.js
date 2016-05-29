import * as actions from '../../actions/roadmap';

const features = [
  { id: 1,
    title: 'Roadmap',
    about: `The app implements a features roadmap for ReactSpeed.
    The app is built using Redux and available live on ReactSpeed website.`,
    category: actions.Categories.APP,
    likes: 3
  },
  { id: 2,
    title: 'Navigation',
    about: `This component renders main menu navigation items. It also
    renders React Router Links as child components.`,
    category: actions.Categories.COMPONENT,
    likes: 1
  },
  { id: 3,
    title: 'Test App Components',
    about: `The chapter discusses ESLint, StyleLint, Browsersync setup using Webpack.
    It also introduces Behavior-Driven Development using Mocha, Chai, and Enzyme.`,
    category: actions.Categories.CHAPTER,
    likes: 15
  }
];

export default features;
