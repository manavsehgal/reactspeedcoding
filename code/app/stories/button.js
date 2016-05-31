import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('Button', module)
  .add('with text, default color', () => (
    <button className="button default" onClick={action('clicked')}>My First Button</button>
  ))
  .add('with no text, primary color', () => (
    <button className="button primary"></button>
  ));
