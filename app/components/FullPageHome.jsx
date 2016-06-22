import React from 'react';

import Card from './Card.jsx';
import Workflow from './Workflow.jsx';

import IconSvg from './IconSvg.jsx';
import ICONS from '../fixtures/icons.js';

export default function FullPageHome() {
  const gridClass = 'stripe grid grid-gutters grid-full grid-flex-cells large-grid-fit';
  return (
    <div>
      <div className={gridClass}>
        <Card blank className="u-large-1of2 u-med-full u-small-full u-textCenter">
          <a className="image-link" href="https://leanpub.com/reactspeedcoding">
            <img src="/img/ibook-cover-w300.jpg" alt="React Speed Book" />
          </a>
          <p className="call-to-action-ibooks">Read sample chapters at LeanPub</p>
        </Card>
        <Card blank className="u-textCenter">
          <h1>Develop Awesome Apps</h1>
          <p>Join 100s of readers learning latest React ES6 concepts.
            Develop custom UI library of reusable React components.
            Speed up your development workflow. Develop single page app using
            Redux.
          </p>
          <div className="grid">
            <div className="grid-cell">
              <a
                className="image-link"
                href="//geo.itunes.apple.com/us/book/react-speed-coding/id1123718637?mt=11"
              >
                <img
                  src="//linkmaker.itunes.apple.com/images/badges/en-us/badge_ibooks-lrg.svg"
                  alt="React Speed iBook"
                  width="112px"
                  height="40px"
                />
              </a>
              <p className="call-to-action-ibooks">Buy Book on iTunes</p>
            </div>
            <div className="grid-cell">
              <a className="image-link" href="//www.amazon.com/dp/B01GLC0Z5K">
                <img src="/img/kindle-white-h40.jpg" height="40px" alt="React Speed Kindle" />
              </a>
              <p className="call-to-action-ibooks">Buy Book on Amazon</p>
            </div>
          </div>
        </Card>
      </div>
      <div className={`${gridClass} default-light-back`}>
        <Card blank shade="default" className="u-textLeft">
          <h1>React Workflow Strategies</h1>
          <p>The book covers workflows and strategies for starting, defining, wiring, testing,
            routing, and refactoring React apps. These make
            your React code more reliable, robust, and reusable.
          </p>
          <a href="http://eepurl.com/b5rx09" className="button success medium">
            Get React Strategies
          </a>
          <p className="stripe-call-to-action">Exclusive subscriber access</p>
        </Card>
        <Card className="u-large-1of3 u-med-full u-small-full u-textCenter">
          <Workflow />
        </Card>
      </div>
      <div className={gridClass}>
        <Card blank className="u-textCenter">
          <IconSvg
            size={70}
            icon={ICONS.DATABASE}
            color="default-text"
            text={`Multiple data strategies using fixtures,
              Redux store, real-time database, and AJAX REST APIs`}
          />
        </Card>
      </div>
      <div className={`${gridClass} default-light-back`}>
        <Card>
          <p>Download code from the book. We dedicate two chapters
            to setup React development environment for production use case.
          </p>
          <pre className="stipes-code">
            <code>
              git clone https://github.com/manavsehgal/reactspeedcoding.git<br />
              npm install<br />
              npm start
            </code>
          </pre>
          <p>
            Read <a href="https://medium.com/reactspeed/speed-start-react-es6-essentials-writing-your-first-react-app-cc7c329d72f0#.vjnyzoshb">
            quick setup instructions
            </a> in our blog.
          </p>
        </Card>
        <Card blank shade="default" className="u-textLeft">
          <h1>Speed Coding</h1>
          <p>More than 3,000 lines of reusable code, 30 custom React components,
            3 single page apps.
          </p>
          <a href="https://github.com/manavsehgal/reactspeedcoding" className="button default medium">
            ReactSpeed GitHub Repo
          </a>
          <p className="stripe-call-to-action">Fork, clone, and please star!</p>
        </Card>
      </div>

      <div className={gridClass}>
        <Card blank className="u-textCenter">
          <IconSvg
            color="black-text"
            icon={ICONS.GLOBE}
            size={70}
            text={`We sincerely hope React Speed Coding can contribute
            to your journey in mastering the React ecosystem of technologies.
            Here's to moving from Concept to Code to Cash, speedily!`}
          />
        </Card>
      </div>
    </div>
  );
}
