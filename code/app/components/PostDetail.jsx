import React, { PropTypes } from 'react';
import PostData from '../content/PostData.js';
import PostDetailData from '../content/PostDetailData.js';
import ReactDisqusThread from 'react-disqus-thread';
import marked from 'marked';

function PostDetail({ posts, details, params }) {
  const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit';
  let renderContent = '';
  let activeDetail = 0;

  // Set options for marked parser here.
  // marked.setOptions({ });

  if (params.slug) {
    for (let i = 0; i < posts.length; ++i) {
      if (posts[i].slug === params.slug) {
        // Match post detail with active post summary id
        for (let j = 0; j < details.length; ++j) {
          if (details[j].id === posts[i].id) {
            activeDetail = j;
            break;
          }
        }
        renderContent = (
          <div>
            <h1>{posts[i].title}</h1>
            <div className={gridClass}>
              <div className="media grid-cell">
                {posts[i].image
                  ? <img
                    className="media-figure image"
                    src={posts[i].image}
                    alt={posts[i].title}
                  />
                  : ''
                }
                <div className="media-body">
                  {/* Not recommended for user input content to avoid XSS attacks.
                    Ok to get content from app controlled data store.
                    Refer: https://facebook.github.io/react/tips/dangerously-set-inner-html.html */}
                  <span
                    className="post-content"
                    dangerouslySetInnerHTML={
                      { __html: marked(details[activeDetail].content) }
                    }
                  />
                </div>
                <br /><br />
                <ReactDisqusThread
                  shortname="reactspeed"
                  identifier={posts[i].slug}
                  title={posts[i].title}
                  url={`https://reactspeed.com/blog/${posts[i].slug}`}
                />
              </div>
            </div>
          </div>
        );
        break;
      } else {
        // Match post detail with active post summary id
        for (let j = 0; j < details.length; ++j) {
          if (details[j].id === posts[0].id) {
            activeDetail = j;
            break;
          }
        }
        renderContent = (
          <div>
            <h1>Oops! We could not find that...</h1>
            <h2>
              Here is the latest post from our blog.
              Please use top menu to navigate elsewhere.
            </h2>
            <div className={gridClass}>
              <div className="media grid-cell">
                {posts[0].image
                  ? <img
                    className="media-figure image"
                    src={posts[0].image}
                    alt={posts[0].title}
                  />
                  : ''
                }
                <h1>{posts[0].title}</h1>
                <div className="media-body">
                  <span
                    className="post-content"
                    dangerouslySetInnerHTML={
                      { __html: marked(details[activeDetail].content) }
                    }
                  />
                </div>
                <ReactDisqusThread
                  shortname="reactspeed"
                  identifier={posts[0].slug}
                  title={posts[0].title}
                  url={`https://reactspeed.com/blog/${posts[0].slug}`}
                />
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
  details: PropTypes.array,
  params: PropTypes.object
};
PostDetail.defaultProps = {
  posts: PostData,
  details: PostDetailData
};

export default PostDetail;
