import React, { PropTypes } from 'react';

class Post extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.string,
    className: PropTypes.string
  }

  static defaultProps = {
    author: '',
    summary: '',
    content: ''
  }

  render () {
    const {
      title, summary, content, author, className
    } = this.props;

    return (
      <article className={className}>
        <h2>{title}</h2>
        {author ? <h4>{author}</h4> : ''}
        {summary ? <h3>{summary}</h3> : ''}
        {content ? <p>{content}</p> : ''}
      </article>
    );
  }
}

export default Post;
