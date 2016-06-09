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
      {
        symbol: 'Se',
        scenario: 'Embed to React',
        sequence: 1,
        text: `Customize the embed code ...
        your site or app styles and placement.`
      },
      {
        symbol: 'Se',
        scenario: 'Embed to React',
        sequence: 2,
        text: `Optionally, parametrize the embed
        code attributes using React props.`
      },
      {
        symbol: 'Ss',
        scenario: 'Sample to React',
        sequence: 1,
        text: `Identify root level component
        name that represents your sample...`
      },
      {
        symbol: 'Ss',
        scenario: 'Sample to React',
        sequence: 2,
        text: `Split sample code HTML, CSS,
        JavaScript into separate files.`
      }
    ]
  }

  cycleSequence() {
    let nextIndex =
      this.state.stepsIndex
        === (this.props.steps.length - 1)
      ? 0
      : this.state.stepsIndex + 1;

    this.setState({stepsIndex: nextIndex});
  }

  cycleScenario() {
    const steps = this.props.steps;
    const currentStep = steps[this.state.stepsIndex];
    let stepsCount = 0;
    for(let i = 0; i < steps.length; ++i){
      if(steps[i].symbol
        === currentStep.symbol) stepsCount++;
    }
    let currentScenario = currentStep.scenario;
    const loopStart =
      (this.state.stepsIndex + stepsCount)
        >= steps.length
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
      if(steps[i].symbol
          === currentStep.symbol) stepsCount++;
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
            {currentStep.symbol}
          </div>
          <div className="steps">
            {stepsCount}
          </div>
          <div onClick={this.cycleSequence} className="sequence">
            {currentStep.sequence}
          </div>
        </div>
      </div>
    );
  }
}
