import React, { PropTypes } from 'react';
import PostData from '../content/PostData.js';

function PostDetail({ posts, params }) {
  const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit';
  let renderContent = '';
  if (params.slug) {
    for (let i = 0; i < posts.length; ++i) {
      if (posts[i].slug === params.slug) {
        renderContent = (
          <div>
            <h1>{posts[i].title}</h1>
            <div className={gridClass}>
              <div className="media">
                {posts[i].image
                  ? <img
                    className="media-figure image"
                    src={posts[i].image}
                    alt={posts[i].title}
                  />
                  : ''
                }
                <div className="media-body">
                  <p>{posts[i].content.start}</p>
                  <p>{posts[i].content.middle}</p>
                  <p>{posts[i].content.end}</p>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      } else {
        renderContent = (
          <div>
            <h1>Oops! We could not find that...</h1>
            <h2>
              Here is the latest post from our blog.
              Please use top menu to navigate elsewhere.
            </h2>
            <div className={gridClass}>
              <div className="media">
                {posts[posts.length - 1].image
                  ? <img
                    className="media-figure image"
                    src={posts[i].image}
                    alt={posts[i].title}
                  />
                  : ''
                }
                <h1>{posts[posts.length - 1].title}</h1>
                <div className="media-body">
                  <p>{posts[i].content.start}</p>
                  <p>{posts[i].content.middle}</p>
                  <p>{posts[i].content.end}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
  return (renderContent);
}
PostDetail.propTypes = {
  posts: PropTypes.array,
  params: PropTypes.object
};
PostDetail.defaultProps = {
  posts: PostData
};

export default PostDetail;
