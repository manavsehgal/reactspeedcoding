import React, {PropTypes} from 'react';
import { Link } from 'react-router';

export default class NavLinks extends React.Component {
  static propTypes = {brand: PropTypes.bool}
  static defaultProps = {brand: false}

  render() {
    return (
      <li className="grid-cell">
        {
          this.props.to
          ? <Link
              {...this.props}
              className={
                this.props.brand
                  ? "navigation-link navigation-brand"
                  : "navigation-link"
                }
              activeClassName={
                this.props.brand
                  ? "navigation-link navigation-brand active"
                  : "navigation-link active"
              }
            />
          : <a {...this.props} className="navigation-link" />
        }
      </li>
    );
  }
}
