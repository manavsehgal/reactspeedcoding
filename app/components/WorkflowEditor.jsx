import React from 'react';

import Card from './Card.jsx';
import Select from 'react-select';
import WorkflowFire from './WorkflowFire.jsx';
import rsdb from '../fixtures/rsdb.js';
const steps = require('../fixtures/workflow/steps.json');

const workflowOptions = [
  { value: 'Start', label: 'Start Component Design' },
  { value: 'Define', label: 'Define Component Internals' },
  { value: 'Wire', label: 'Wire Multiple Components' },
  { value: 'Route', label: 'Route Component Layouts' },
  { value: 'Refactor', label: 'Refactor Existing Components' },
  { value: 'Test', label: 'Test App Components' },
  { value: 'Redux', label: 'Redux State Container' }
];

const strategyOptions = {
  Start: [
    { value: 'Sample to React', label: 'Sample to React' },
    { value: 'Embed to React', label: 'Embed to React' }
  ],
  Define: [
    { value: 'Naming conventions', label: 'Naming conventions' },
    { value: 'Imports and exports', label: 'Imports and exports' }
  ],
  Wire: [
    { value: 'Events', label: 'Events' },
    { value: 'Composition', label: 'Composition' },
    { value: 'Presentational and Containers', label: 'Presentational and Containers' }
  ]
};

export default class WorkflowEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workflow: 'Start',
      stepsCount: 0,
      strategy: 'Sample to React',
      text: '',
      sequence: 0,
      symbol: 'Ss',
      strategyOptions: strategyOptions.Start
    };
    this.strategyChange = this.strategyChange.bind(this);
    this.workflowChange = this.workflowChange.bind(this);
    this.symbolChange = this.symbolChange.bind(this);
    this.addStep = this.addStep.bind(this);
    this.textChange = this.textChange.bind(this);
    this.sequenceChange = this.sequenceChange.bind(this);
  }
  componentDidMount() {
    const getStepCount = (snap) => {
      this.setState({
        stepsCount: snap.numChildren()
      });
    };
    rsdb.ref('steps').on('value', getStepCount);
  }
  addStep() {
    rsdb.ref(`steps/${this.state.stepsCount}`).set({
      workflow: this.state.workflow,
      strategy: this.state.strategy,
      text: this.state.text,
      symbol: this.state.symbol,
      sequence: this.state.sequence
    });
  }
  workflowChange(value) {
    let newSymbol = '';
    newSymbol = value.substring(0, 1)
      + strategyOptions[value][0].value.substring(0, 1).toLowerCase();
    this.setState({
      workflow: value,
      symbol: newSymbol,
      strategyOptions: strategyOptions[value],
      strategy: strategyOptions[value][0].value
    });
  }
  strategyChange(value) {
    let newSymbol = '';
    newSymbol = this.state.workflow.substring(0, 1)
      + value.substring(0, 1).toLowerCase();
    this.setState({
      strategy: value,
      symbol: newSymbol
    });
  }
  textChange(event) {
    this.setState({ text: event.target.value });
  }
  symbolChange(event) {
    // Update state only if symbol is manually changed
    if (event.target.value !== this.state.symbol) {
      this.setState({ symbol: event.target.value });
    }
  }
  sequenceChange(event) {
    if (event.target.value) {
      this.setState({ sequence: parseInt(event.target.value, 10) });
    }
  }
  render() {
    const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit';
    return (
      <div>
        <h1>Workflow Editor</h1>
        <div className={gridClass}>
          <Card>
            <Select
              name="form-field-workflow"
              value={this.state.workflow}
              options={workflowOptions}
              onChange={this.workflowChange}
            />
            <br />
            <Select
              name="form-field-strategy"
              value={this.state.strategy}
              options={this.state.strategyOptions}
              onChange={this.strategyChange}
            />
            <br />
            <div className="input">
              <textarea
                className="input-field"
                placeholder="Step text"
                value={this.state.text}
                onChange={this.textChange}
              />
            </div>

            <div className="grid grid-fit">
              <div className="input grid-cell">
                <span className="input-label">Sym</span>
                <input
                  className="input-field"
                  placeholder="Ss"
                  value={this.state.symbol}
                  onChange={this.symbolChange}
                />
              </div>
              &nbsp;
              <div className="input grid-cell">
                <span className="input-label">Seq</span>
                <input
                  className="input-field"
                  placeholder="1"
                  value={this.state.sequence}
                  onChange={this.sequenceChange}
                />
              </div>
            </div>
            <button
              className="button default medium"
              onClick={this.addStep}
            >
              Add Workflow Step
            </button>
          </Card>
          <Card className="u-textCenter">
            <WorkflowFire steps={steps} rsdb={rsdb} realtime />
          </Card>
        </div>
      </div>
    );
  }
}
