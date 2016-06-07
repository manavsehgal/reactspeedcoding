import React, { PropTypes } from 'react';

import Card from './Card.jsx';

import IconSvg from './IconSvg.jsx';
import ICONS from '../fixtures/icons.js';

export default class CardStack extends React.Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    redirect: PropTypes.bool
  }

  static defaultProps = {
    messages: [
      'Responsive Design',
      'Customizable Theme',
      'Reusable Components'
    ],
    redirect: false
  }

  render() {
    const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit u-textCenter';

    return (
      <div>
        {!this.props.redirect ? <h1>React Speed Coding</h1> : ''}
        <div className={gridClass}>
          <Card>
            <a className="image-link" href="https://leanpub.com/reactspeedcoding">
              <img src="/img/react-speed-t.jpg" alt="React Speed Book" />
            </a>
          </Card>
          <Card>
            <IconSvg
              color="secondary-text"
              icon={ICONS.COMPONENTS}
              size={70}
              text={`Growing library of 30+ reusable custom React components.
                Test with Enzyme and ESLint.`}
            />
          </Card>
          <Card>
            <IconSvg
              size={70}
              icon={ICONS.ROCKET}
              color="warning-text"
              text={`Speed optimize every aspect of development workflow.
                Faster builds. Webpack payloads. ES6.`}
            />
          </Card>
        </div>
        <div className={gridClass}>
          <Card blank>
            <IconSvg
              size={70}
              icon={ICONS.DATABASE}
              color="default-text"
              text={`Multiple data strategies using fixtures,
                Redux store, real-time database, and AJAX REST APIs`}
            />
          </Card>
        </div>
        <div className={gridClass}>
          <Card>
            <IconSvg
              color="danger-text"
              icon={ICONS.ROAD}
              size={70}
              text="Roadmap app created using Redux and Enzyme"
            />
          </Card>
          <Card>
            <IconSvg
              color="primary-text"
              icon={ICONS.GITHUB}
              size={70}
              text={`Popular GitHub repository with complete and
                tested source code`}
            />
          </Card>
          <Card>
            <IconSvg
              color="secondary-text"
              icon={ICONS.LINE_CHART}
              size={70}
              text="Infographics, charts, and visualization components in progress"
            />
          </Card>
        </div>

        <div className={gridClass}>
          <Card blank>
            <IconSvg
              color="default-text"
              icon={ICONS.CSS}
              size={70}
              text="ReactSpeed UI is efficient. CSS 4.6KB Gzip, 21KB Minified."
            />
          </Card>
        </div>
      </div>
    );
  }
}
