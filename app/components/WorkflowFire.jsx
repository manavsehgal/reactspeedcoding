import React from 'react';
import IconSvg from './IconSvg.jsx';
import ICONS from '../fixtures/icons.js';
import rsdb from '../fixtures/rsdb.js';
const steps = require('../fixtures/workflow/steps.json');

export default class WorkflowFire extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stepsIndex: 0, steps: Object.values(steps), firebase: false };
    this.cycleSequence = this.cycleSequence.bind(this);
    this.cycleScenario = this.cycleScenario.bind(this);
  }
  componentDidMount() {
    rsdb.ref('steps').once('value', (snap) => {
      this.setState({ steps: snap.val() });
      this.setState({ firebase: true });
    });
  }
  cycleSequence() {
    const nextIndex =
      this.state.stepsIndex === (this.state.steps.length - 1)
      ? 0
      : this.state.stepsIndex + 1;

    this.setState({ stepsIndex: nextIndex });
  }
  cycleScenario() {
    const stepsList = this.state.steps;
    const currentStep = stepsList[this.state.stepsIndex];
    let stepsCount = 0;
    for (let i = 0; i < stepsList.length; ++i) {
      if (stepsList[i].symbol === currentStep.symbol) stepsCount++;
    }
    const currentScenario = currentStep.scenario;
    const loopStart =
      (this.state.stepsIndex + stepsCount) >= stepsList.length
      ? 0
      : this.state.stepsIndex + 1;
    for (let i = loopStart; i < stepsList.length; ++i) {
      if (stepsList[i].scenario !== currentScenario) {
        this.setState({ stepsIndex: i });
        break;
      }
    }
  }
  render() {
    const stepsList = this.state.steps;
    const currentStep = stepsList[this.state.stepsIndex];
    return (
      <div className="workflow">
        <div className="grid large-grid-full med-grid-full small-grid-full">
          <div className="grid-cell workflow-scenario">
            {currentStep.scenario}
          </div>
        </div>
        <div className="grid large-grid-full med-grid-full small-grid-full">
          <div className="grid-cell workflow-text u-textCenter">
            {currentStep.text
              ? currentStep.text
              : <img width="80%" src={currentStep.img} alt={currentStep.scenario} />}
          </div>
        </div>
        <div className="grid grid-full large-grid-fit med-grid-fit">
          <button onClick={this.cycleScenario} className="grid-cell button primary">
            <IconSvg
              icon={ICONS.REFRESH}
              color="white-text"
              text={currentStep.symbol}
              slim
            />
          </button>
          <div className="grid-cell workflow-steps">
            {currentStep.workflow}
          </div>
          <button onClick={this.cycleSequence} className="grid-cell button default">
            <IconSvg
              icon={ICONS.ARROW_RIGHT}
              color="white-text"
              text={`${currentStep.sequence}`}
              slim
              left
            />
          </button>
        </div>
        <div>
          <p className="call-to-action">
            Data Source: {this.state.firebase ? 'Firebase' : 'Local'}
          </p>
        </div>
      </div>
    );
  }
}
