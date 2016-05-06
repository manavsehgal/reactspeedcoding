import React, { PropTypes } from 'react';
import PostsData from '../content/PostsData.js';
import Post from './Post.jsx';

class Blog extends React.Component {
  static propTypes = {
    posts: PropTypes.array
  }
  static defaultProps = {
    posts: [
      {
        id: 1,
        title: `This is my first post`,
        summary: `Summary for the post is here`,
        content: `Content for this first post`
      },
      {
        id: 2,
        title: `This is my second post`,
        summary: `Summary for the second post is here`,
        content: `Content for this second post`
      }
    ]
  }
  render () {
    const posts = this.props.posts;
    const renderPostSummaries = posts.map(post =>
      <Post className="post-summary" key={post.id} title={post.title} summary={post.summary}/>
    );
    return(
      <div className="blog-list">
        {renderPostSummaries}
      </div>
    );
  }
}

export default Blog;
