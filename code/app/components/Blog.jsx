import React, { PropTypes } from 'react';
import PostData from '../content/PostData.js';
import Post from './Post.jsx';

class Blog extends React.Component {
  static propTypes = {
    posts: PropTypes.array
  }
  static defaultProps = {
    posts: PostData
  }
  render () {
    const posts = this.props.posts;
    const renderPostSummaries = posts.map(post =>
      <Post className="post-summary" key={post.id} title={post.title} summary={post.summary}/>
    );
    return(
      <div className="blog-list">
        <h1>ReactSpeed Blog</h1>
        {renderPostSummaries}
      </div>
    );
  }
}

export default Blog;
