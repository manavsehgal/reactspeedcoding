import React, { PropTypes } from 'react';
import PostData from '../content/PostData.js';
import Post from './Post.jsx';
import Card from './Card.jsx';

class Blog extends React.Component {
  static propTypes = {
    posts: PropTypes.array
  }
  static defaultProps = {
    posts: PostData
  }
  render () {
    const gridClass = "grid grid-gutters grid-full grid-flex-cells large-grid-fit";
    const posts = this.props.posts;
    const renderPostSummaries = posts.map(post =>
      <Card key={post.id}>
        <Post
          title={post.title}
          summary={post.summary}
          image={post.image}
          content={post.content}
        />
      </Card>
    );
    return(
      <div>
        <h1>ReactSpeed Blog</h1>
        <div className={gridClass}>
          {renderPostSummaries}
        </div>
      </div>
    );
  }
}

export default Blog;
