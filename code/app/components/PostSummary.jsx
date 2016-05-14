import React, { PropTypes } from 'react';
import PostData from '../content/PostData.js';
import Card from './Card.jsx';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

function PostSummary({ posts }) {
  const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit';
  return (
    <div>
      <Helmet
        title={'ReactSpeed Blog'}
        meta={[
          { name: 'description',
            content: 'Latest news about React Speed Coding book and ReactSpeed.com'
          },
          { property: 'og:type', content: 'blog' },
          { property: 'og:image', content: 'https://reactspeed.com/img/roadmap-t.jpg' }
        ]}
        link={[
          { rel: 'canonical', href: 'https://reactspeed.com/blog' }
        ]}
      />
      <h1>ReactSpeed Blog</h1>
      <div className={gridClass}>
        {posts.map(post =>
          <Card key={post.id}>
            <div className="media">
              {post.thumb
                ? (<Link className="image-link" to={`/blog/${post.slug}`}>
                  <img
                    className="media-figure image"
                    src={post.thumb}
                    alt={post.title}
                  />
                </Link>
                )
                : ''
              }
              <div className="media-body">
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="media-title">{post.title}</h3>
                </Link>
                <p>{post.summary}</p>
              </div>
            </div>
            <Link
              to={`/blog/${post.slug}`}
            >
              Read more...
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
PostSummary.propTypes = {
  posts: PropTypes.array
};
PostSummary.defaultProps = {
  posts: PostData
};

export default PostSummary;
