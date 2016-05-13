import React, { PropTypes } from 'react';
import NavigationSidebar from './NavigationSidebar.jsx';

class Sidebar extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    children: PropTypes.node
  }
  static defaultProps = {
    data: {}
  }
  render() {
    const data = this.props.data;
    return (
      <nav className="holygrail-nav u-textCenter">
        <NavigationSidebar />
        {
          (data && data.messages)
            ? data.messages.map((message, i) => <p key={i}>{message}</p>)
            : ''
        }
        {
          (data && data.promoButton)
            ? <a
              href={data.promoButton.url}
              className="button success"
            >{data.promoButton.label}</a>
            : ''
        }
        {this.props.children}
      </nav>
    );
  }
}

export default Sidebar;
