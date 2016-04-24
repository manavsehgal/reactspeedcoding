import React, {PropTypes} from 'react';

export default class Workflow extends React.Component {
  static propTypes = {
    steps: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {stepsIndex: 0}
    this.cycleSequence = this.cycleSequence.bind(this);
    this.cycleScenario = this.cycleScenario.bind(this);
  }

  static defaultProps = {
    steps: [
      {symbol: 'Se', scenario: 'Embed to React', sequence: 1,
        text: `Customize the embed code within target platform to suit
        your site or app styles and placement.`},
      {symbol: 'Se', scenario: 'Embed to React', sequence: 2,
        text: `Optionally, parametrize the embed code attributes using React props.`},
      {symbol: 'Se', scenario: 'Embed to React', sequence: 3,
        text: `Use stateless component as you will most likely not maintain embed UI state
        locally in your component.`},
      {symbol: 'Ss', scenario: 'Sample to React', sequence: 1,
        text: `Identify root level component name that represents your sample.
        Define component.`},
      {symbol: 'Ss', scenario: 'Sample to React', sequence: 2,
        text: `Split sample code HTML, CSS, JavaScript into separate files.`},
      {symbol: 'Ss', scenario: 'Sample to React', sequence: 3,
        text: `Copy HTML DOM that renders the sample UI, into render() method
        of root component.`},
      {symbol: 'Ss', scenario: 'Sample to React', sequence: 4,
        text: `Optionally, replace some of the HTML with existing reusable
        components in your app.`},
      {symbol: 'Ss', scenario: 'Sample to React', sequence: 5,
        text: `Copy CSS into new or existing partial.`},
      {symbol: 'Ss', scenario: 'Sample to React', sequence: 6,
        text: `Copy JS to /app/public/js folder.`},
      {symbol: 'Ss', scenario: 'Sample to React', sequence: 7,
        text: `JS over CDN is referred in <script> tag from /app/templates/*.html.`},
      {symbol: 'Ss', scenario: 'Sample to React', sequence: 8,
        text: `Import the new component into your index.jsx and create an
        instance in render() method.`},
    ]
  }

  cycleSequence() {
    let nextIndex =
      this.state.stepsIndex === (this.props.steps.length - 1)
      ? 0
      : this.state.stepsIndex + 1;

    this.setState({stepsIndex: nextIndex});
  }

  cycleScenario() {
    const steps = this.props.steps;
    const currentStep = steps[this.state.stepsIndex];
    let stepsCount = 0;
    for(let i = 0; i < steps.length; ++i){
      if(steps[i].symbol === currentStep.symbol) stepsCount++;
    }
    let currentScenario = currentStep.scenario;
    const loopStart =
      (this.state.stepsIndex + stepsCount) >= steps.length
      ? 0
      : this.state.stepsIndex + 1;
    for(let i = loopStart; i < steps.length; ++i){
      if(steps[i].scenario != currentScenario) {

        this.setState({stepsIndex: i});

        break;
      };
    }
  }

  render () {
    const steps = this.props.steps;
    const currentStep = steps[this.state.stepsIndex];
    let stepsCount = 0;
    for(let i = 0; i < steps.length; ++i){
      if(steps[i].symbol === currentStep.symbol) stepsCount++;
    }

    return (
      <div className="workflow">
        <div className="workflow-scenario">
          {currentStep.scenario}
        </div>
        <div className="workflow-text">
          {currentStep.text}
        </div>
        <div className="workflow-nav">
          <div onClick={this.cycleScenario} className="symbol">
            <i className="fa fa-caret-left"></i> {currentStep.symbol}
          </div>
          <div className="steps">
            {stepsCount}
          </div>
          <div onClick={this.cycleSequence} className="sequence">
            {currentStep.sequence} <i className="fa fa-caret-right"></i> 
          </div>
        </div>
      </div>
    );
  }
}
