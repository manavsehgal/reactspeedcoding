import React from 'react';

import Card from './Card.jsx';
import IconSvg from './IconSvg.jsx';
import ICONS from '../fixtures/icons.js';
import Select from 'react-select';

const options = [
  { value: 'c01', label: 'Setup React Webpack' },
  { value: 'c02', label: 'ES6 React Guide' },
  { value: 'c03', label: 'Production Optimize Webpack' },
  { value: 'c04', label: 'ReactSpeed UI' },
  { value: 'c05', label: 'Start Component Design' },
  { value: 'c06', label: 'Define Component Internals' },
  { value: 'c07', label: 'Wire Multiple Components' },
  { value: 'c08', label: 'Route Component Layouts' },
  { value: 'c09', label: 'Refactor Existing Components' },
  { value: 'c10', label: 'Test App Components' },
  { value: 'c11', label: 'Redux State Container' },
  { value: 'c12', label: 'Component Design Workflow' },
  { value: 'c13', label: 'Firebase React Integration' },
  { value: 'c14', label: 'React Developer Experience' }
];

const CardStackForm = () => {
  const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit';
  return (
    <div>
      <h1>Form Controls</h1>
      <div className={gridClass}>
        <Card>
          <p>Custom controls</p>
          <Select
            name="form-field-name"
            value="c01"
            options={options}
          />
          <br />
          <div className="input">
            <span className="input-label">Name</span>
            <input className="input-field" placeholder="Placeholder for name" />
          </div>
          <div className="input">
            <input className="input-field" placeholder="Just a field" />
          </div>
        </Card>
        <Card>
          <p>Beautiful forms</p>
          <div className="input">
            <button className="button success">
              <IconSvg
                icon={ICONS.SEARCH}
                color="white-text"
              />
            </button>
            <input
              className="input-field"
              placeholder="Search something"
            />
          </div>
          <div className="input">
            <span className="input-label">
              <IconSvg
                icon={ICONS.ENVELOPE}
                color="default-text"
              />
            </span>
            <input
              className="input-field"
              placeholder="Send a message"
            />
            <button className="button warning">Send</button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CardStackForm;
