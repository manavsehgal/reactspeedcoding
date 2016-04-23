import React, {PropTypes} from 'react';

export default class GitHub extends React.Component {
  static propTypes = {
    repo: PropTypes.string.isRequired
  }

  constructor (props) {
    super (props);
    this.state = {
      full_name: '',
      stargazers_count: 0,
      open_issues: 0
    };
  }

  componentDidMount() {
    const sourceRepo =
      `https://api.github.com/repos/${this.props.repo}`;

    this.serverRequest = $.get(sourceRepo, function (result) {
      this.setState({
        full_name: result.full_name,
        stargazers_count: result.stargazers_count,
        open_issues: result.open_issues
      });
    }.bind(this));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    return (
      this.state.full_name
        ? <div>
            <h4><i className="fa fa-github"></i> {this.state.full_name}</h4>
            <p><i className="fa fa-star blue"></i> {this.state.stargazers_count} stars</p>
            <p><i className="fa fa-bug red"></i> {this.state.open_issues} issues</p>
          </div>
        : <p>Loading Live Stats...</p>
    );
  }
};
