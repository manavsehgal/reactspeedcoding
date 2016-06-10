import React, { PropTypes } from 'react';

class Post extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
    content: PropTypes.object,
    image: PropTypes.string,
    author: PropTypes.string
  }

  static defaultProps = {
    author: '',
    summary: '',
    content: {},
    image: ''
  }

  render () {
    const {
      title, summary, content, author, image
    } = this.props;

    return (
      <div className="media">
        {image
          ? <img className="media-figure Image" src={image} alt="Post Image" />
          : ''
        }
        <div className="media-body">
          <h2 className="media-title">{title}</h2>
          {author ? <h4>{author}</h4> : ''}
          {summary ? <p><b>{summary}</b></p> : ''}
          {content.start ? <p>{content.start}</p> : ''}
          {content.middle ? <p>{content.middle}</p> : ''}
          {content.end ? <p>{content.end}</p> : ''}
        </div>
      </div>
    );
  }
}

export default Post;
