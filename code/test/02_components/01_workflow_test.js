import React from 'react';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { shallow, mount, render } from 'enzyme';
import Workflow from '../../app/components/Workflow.jsx';

describe('<Workflow />', () => {
  it('[Shallow] should render one .workflow-scenario control', () => {
    const wrapper = shallow(<Workflow />);
    expect(wrapper.find('.workflow-scenario')).to.have.length(1);
  });

  it('[Shallow] should render one .workflow-steps control', () => {
    const wrapper = shallow(<Workflow />);
    expect(wrapper.find('.workflow-steps')).to.have.length(1);
  });

  it('[Static] should render one .workflow-text control', () => {
    const wrapper = render(<Workflow />);
    expect(wrapper.find('.workflow-text')).to.have.length(1);
  });

  it('[Full DOM] should render one .workflow component', () => {
    expect(mount(<Workflow />).find('.workflow').length).to.equal(1);
  });
});
