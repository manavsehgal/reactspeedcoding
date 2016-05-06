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
        <h1>{title}</h1>
        {author ? <h3>{author}</h3> : ''}
        {summary ? <h2>{summary}</h2> : ''}
        {content ? <p>{content}</p> : ''}
      </article>
    );
  }
}

export default Post;
