import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Workflow from '../components/Workflow.jsx';

storiesOf('Workflow', module)
  .add('default', () => (
    <Workflow />
  ));
