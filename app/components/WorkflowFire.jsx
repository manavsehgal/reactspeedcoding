import React, { PropTypes } from 'react';
import IconSvg from './IconSvg.jsx';
import ICONS from '../fixtures/icons.js';

export default class WorkflowFire extends React.Component {
  static propTypes = {
    steps: PropTypes.object.isRequired,
    rsdb: PropTypes.object.isRequired,
    realtime: PropTypes.bool,
    stepChange: PropTypes.func
  }
  static defaultProps = { realtime: false }
  constructor(props) {
    super(props);
    this.state = {
      stepsIndex: 0,
      steps: Object.values(this.props.steps),
      firebase: false,
      stepsCount: Object.values(this.props.steps).length };
    this.cycleSequence = this.cycleSequence.bind(this);
    this.cycleScenario = this.cycleScenario.bind(this);
  }
  componentDidMount() {
    const getSteps = (snap) => {
      this.setState({
        steps: snap.val(),
        firebase: true,
        stepsCount: snap.numChildren()
      });
    };
    if (this.props.realtime) {
      this.props.rsdb.ref('steps').on('value', getSteps);
    } else {
      this.props.rsdb.ref('steps').once('value').then(getSteps);
    }
  }
  cycleSequence() {
    const nextIndex =
      this.state.stepsIndex === (this.state.steps.length - 1)
      ? 0
      : this.state.stepsIndex + 1;

    if (this.props.stepChange) {
      const stepsList = this.state.steps;
      const nextStep = stepsList[nextIndex];
      this.props.stepChange(nextStep.workflow, nextStep.strategy, nextStep.sequence);
    }

    this.setState({ stepsIndex: nextIndex });
  }
  cycleScenario() {
    const stepsList = this.state.steps;
    const currentStep = stepsList[this.state.stepsIndex];
    let stepsCount = 0;
    for (let i = 0; i < stepsList.length; ++i) {
      if (stepsList[i].symbol === currentStep.symbol) stepsCount++;
    }
    const currentScenario = currentStep.strategy;
    const loopStart =
      (this.state.stepsIndex + stepsCount) >= stepsList.length
      ? 0
      : this.state.stepsIndex + 1;
    for (let i = loopStart; i < stepsList.length; ++i) {
      if (stepsList[i].strategy !== currentScenario) {
        if (this.props.stepChange) {
          const nextStep = stepsList[i];
          this.props.stepChange(nextStep.workflow, nextStep.strategy, nextStep.sequence);
        }

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
            {currentStep.strategy}
          </div>
        </div>
        <div className="grid large-grid-full med-grid-full small-grid-full">
          <div className="grid-cell workflow-text u-textCenter">
            {currentStep.text
              ? currentStep.text
              : <img width="80%" src={currentStep.img} alt={currentStep.strategy} />}
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
            &nbsp;| Steps count: {this.state.stepsCount}
          </p>
        </div>
      </div>
    );
  }
}
