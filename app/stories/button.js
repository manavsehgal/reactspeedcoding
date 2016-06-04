import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('Button', module)
  .add('with text, default color', () => (
    <button className="button default" onClick={action('clicked')}>My First Button</button>
  ))
  .add('with icon, primary color', () => (
    <button className="button primary"><i className="fa fa-rocket"></i></button>
  ));
