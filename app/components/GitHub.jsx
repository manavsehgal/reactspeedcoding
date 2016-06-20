const $ = require('jquery/src/core');
require('jquery/src/ajax');
require('jquery/src/ajax/xhr');

import React, { PropTypes } from 'react';
import IconSvg from './IconSvg.jsx';
import ICONS from '../fixtures/icons.js';

export default class GitHub extends React.Component {
  static propTypes = {
    repo: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      full_name: '',
      stargazers_count: 0,
      open_issues: 0
    };
  }

  componentDidMount() {
    const sourceRepo =
      `https://api.github.com/repos/${this.props.repo}`;

    this.serverRequest = $.get(sourceRepo, (result =>
      this.setState({
        full_name: result.full_name,
        stargazers_count: result.stargazers_count,
        open_issues: result.open_issues
      })
    ));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    return (
      this.state.full_name
        ? <div>
          <IconSvg
            icon={ICONS.GITHUB}
            color="default-text"
            text={this.state.full_name}
            size={30}
            slim
          />
          <br />
          <IconSvg
            icon={ICONS.STAR}
            color="primary-text"
            text={`${this.state.stargazers_count} stars`}
            size={20}
            slim
          />
          <br />
          <IconSvg
            icon={ICONS.BUG}
            color="danger-text"
            text={`${this.state.open_issues} issues`}
            size={20}
            slim
          />
        </div>
        : <p>Loading Live Stats...</p>
    );
  }
}
