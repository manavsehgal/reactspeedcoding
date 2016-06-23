const stepsData = [
  { workflow: 'Start', symbol: 'Se', scenario: 'Embed to React', sequence: 1,
    img: 'img/embed-to-react-w300.jpg' },
  { workflow: 'Start', symbol: 'Se', scenario: 'Embed to React', sequence: 2,
    text: `Customize the embed code within target platform to suit
    your site or app styles and placement.` },
  { workflow: 'Start', symbol: 'Se', scenario: 'Embed to React', sequence: 3,
    text: `Optionally, parametrize the embed code attributes
    using React props.` },
  { workflow: 'Start', symbol: 'Se', scenario: 'Embed to React', sequence: 4,
    text: `Use stateless component as you will most likely not maintain embed UI state
    locally in your component.` },
  { workflow: 'Define', symbol: 'Df', scenario: 'Naming conventions', sequence: 1,
    img: 'img/webpack-workflow-w300.jpg' },
  { workflow: 'Define', symbol: 'Df', scenario: 'Naming conventions', sequence: 2,
    text: `Use .jsx extension for React
    components.` },
  { workflow: 'Define', symbol: 'Df', scenario: 'Naming conventions', sequence: 3,
    text: `Entry point for app is
    /app/index.jsx file.` },
  { workflow: 'Wire', symbol: 'We', scenario: 'Events', sequence: 1,
    text: `As event handlers often manipulate state,
    they are best defined where state is defined.` },
  { workflow: 'Wire', symbol: 'We', scenario: 'Events', sequence: 2,
    text: `Define the event handler in outermost owner
    component.` },
  { workflow: 'Wire', symbol: 'We', scenario: 'Events', sequence: 3,
    text: `Consume on<Event> property within owned components
    down the multi-component hierarchy.` }
];

export default stepsData;
