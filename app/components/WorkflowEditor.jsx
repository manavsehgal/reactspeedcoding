import React, { PropTypes } from 'react';

import Card from './Card.jsx';
import Select from 'react-select';
import WorkflowFire from './WorkflowFire.jsx';
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
  static propTypes = { route: PropTypes.object.isRequired }
  constructor(props) {
    super(props);
    this.state = {
      workflow: 'Start',
      stepsCount: 0,
      strategy: 'Sample to React',
      text: '',
      img: '',
      sequence: 0,
      symbol: 'Ss',
      strategyOptions: strategyOptions.Start,
      login: '',
      password: '',
      loginError: '',
      auth: false
    };
    this.login = this.login.bind(this);
    this.loginChange = this.loginChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.addStep = this.addStep.bind(this);
    this.strategyChange = this.strategyChange.bind(this);
    this.workflowChange = this.workflowChange.bind(this);
    this.symbolChange = this.symbolChange.bind(this);
    this.textChange = this.textChange.bind(this);
    this.sequenceChange = this.sequenceChange.bind(this);
  }
  componentDidMount() {
    const getStepCount = (snap) => {
      this.setState({
        stepsCount: snap.numChildren()
      });
    };
    this.props.route.rsdb.ref('steps').on('value', getStepCount);
  }
  login() {
    this.setState({ loginError: '', auth: true });
    this.props.route.firebaseApp.auth()
      .signInWithEmailAndPassword(this.state.login, this.state.password)
      .catch((error) => {
        this.setState({ loginError: error.message, auth: false });
        return;
      });
  }
  loginChange(event) {
    this.setState({ login: event.target.value });
  }
  passwordChange(event) {
    this.setState({ password: event.target.value });
  }
  addStep() {
    if (this.state.auth) {
      this.props.route.rsdb.ref(`steps/${this.state.stepsCount}`).set({
        workflow: this.state.workflow,
        strategy: this.state.strategy,
        text: this.state.text,
        symbol: this.state.symbol,
        sequence: this.state.sequence
      });
    } else {
      this.setState({ loginError: 'You need to login to add workflow step.' });
    }
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
        <p className="default-text">Demonstrates integration with Firebase
        using authentication. Visual editing enables review of results
        using component connected with realtime database. As new workflow steps
        are added, the component re-renders with new items reactively.
        Also demonstrates linked form fields which auto-fill based on other fields.
          <br />
        Future releases can enable auto-filling of Form values while navigating the
        component visually, for editing existing data.
        </p>
        {!this.state.auth
          ? <div>
            <div className={gridClass}>
              <Card>
                <div className="grid grid-fit">
                  <div className="input grid-cell">
                    <span className="input-label">Login</span>
                    <input
                      className="input-field"
                      type="email"
                      placeholder="Enter login email"
                      value={this.state.login}
                      onChange={this.loginChange}
                    />
                  </div>
                  &nbsp;
                  <div className="input grid-cell">
                    <span className="input-label">Password</span>
                    <input
                      className="input-field"
                      type="password"
                      placeholder="Enter password"
                      value={this.state.password}
                      onChange={this.passwordChange}
                    />
                    <button className="button primary" onClick={this.login}>Login</button>
                  </div>
                </div>
              </Card>
            </div>
            {this.state.loginError
              ? <p className="danger-text">{this.state.loginError}</p>
              : <p className="default-text">
                You need to login for adding steps to the workflow.
              </p>}
          </div>
          : <p className="success-text">
          You successfully logged in as &nbsp;
            <b>{this.props.route.firebaseApp.auth().currentUser.email}</b>.
          </p>
        }
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
            <WorkflowFire steps={steps} rsdb={this.props.route.rsdb} realtime />
          </Card>
        </div>
      </div>
    );
  }
}
