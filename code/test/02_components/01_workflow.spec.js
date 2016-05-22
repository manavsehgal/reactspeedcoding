import React from 'react';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import Workflow from '../../app/components/Workflow.jsx';

describe('<Workflow />', () => {
  it('[Shallow] should render one .workflow component', () => {
    const wrapper = shallow(<Workflow />);
    expect(wrapper.is('.workflow')).to.equal(true);
  });

  it('[Shallow] should define a prop for steps', () => {
    const wrapper = shallow(<Workflow />);
    /* eslint-disable no-unused-expressions */
    expect(wrapper.props().steps).to.be.defined;
    /* eslint-enable no-unused-expressions */
  });

  it('[Static] should render one .workflow-text control', () => {
    const wrapper = render(<Workflow />);
    expect(wrapper.find('.workflow-text')).to.have.length(1);
  });

  it('[Full DOM] should increment state on clicking step button', () => {
    const wrapper = mount(<Workflow />);
    wrapper.find('button.default').simulate('click');
    expect(wrapper.state('stepsIndex')).to.equal(1);
  });

  it('[Full DOM] should render new sequence number on clicking step button', () => {
    const wrapper = mount(<Workflow />);
    wrapper.setState({ stepsIndex: 1 });
    wrapper.find('button.default').simulate('click'); // stepsIndex = 2
    expect(wrapper.find('button.default').text())
      .to.contain('3'); // Sequence = stepsIndex + 1
  });

  it('[Sinon, Full DOM] should call cycleScenario on clicking scenario button', () => {
    sinon.spy(Workflow.prototype, 'cycleScenario');
    const wrapper = mount(<Workflow />);
    wrapper.find('button.primary').simulate('click');
    expect(Workflow.prototype.cycleScenario.calledOnce).to.equal(true);
  });
});
