import React from 'react';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { shallow } from 'enzyme';
import Card from '../../app/components/Card.jsx';

describe('<Card />', () => {
  it('should render one .card component', () => {
    const wrapper = shallow(<Card />);
    expect(wrapper.find('.card')).to.have.length(1);
  });
});
