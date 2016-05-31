import React from 'react';
import { storiesOf } from '@kadira/storybook';
import PostSummary from '../components/PostSummary.jsx';

storiesOf('PostSummary', module)
  .add('default', () => (
    <PostSummary />
  ));
