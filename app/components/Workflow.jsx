import React, { PropTypes } from 'react';
import IconSvg from './IconSvg.jsx';
import ICONS from '../fixtures/icons.js';
import stepsData from '../fixtures/workflow/workflow.js';

export default class Workflow extends React.Component {
  static propTypes = {
    steps: PropTypes.array.isRequired
  }
  static defaultProps = { steps: stepsData }
  constructor(props) {
    super(props);
    this.state = { stepsIndex: 0 };
    this.cycleSequence = this.cycleSequence.bind(this);
    this.cycleScenario = this.cycleScenario.bind(this);
  }
  cycleSequence() {
    const nextIndex =
      this.state.stepsIndex === (this.props.steps.length - 1)
      ? 0
      : this.state.stepsIndex + 1;

    this.setState({ stepsIndex: nextIndex });
  }

  cycleScenario() {
    const steps = this.props.steps;
    const currentStep = steps[this.state.stepsIndex];
    let stepsCount = 0;
    for (let i = 0; i < steps.length; ++i) {
      if (steps[i].symbol === currentStep.symbol) stepsCount++;
    }
    const currentScenario = currentStep.scenario;
    const loopStart =
      (this.state.stepsIndex + stepsCount) >= steps.length
      ? 0
      : this.state.stepsIndex + 1;
    for (let i = loopStart; i < steps.length; ++i) {
      if (steps[i].scenario !== currentScenario) {
        this.setState({ stepsIndex: i });
        break;
      }
    }
  }

  render() {
    const steps = this.props.steps;
    const currentStep = steps[this.state.stepsIndex];
    let stepsCount = 0;
    for (let i = 0; i < steps.length; ++i) {
      if (steps[i].symbol === currentStep.symbol) stepsCount++;
    }

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
              : <img height="100%" src={currentStep.img} alt={currentStep.scenario} />}
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
              text={currentStep.sequence}
              slim
              left
            />
          </button>
        </div>
      </div>
    );
  }
}
