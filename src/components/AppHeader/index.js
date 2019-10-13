import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabList from '../TabList';
import Tab from '../Tab';
import UserInfo from './UserInfo';
import logo from '../../assets/codio_logo.png';
import './index.scss';

class AppHeader extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <header className="AppHeader">
        <div className="AppHeader__logo-wrap">
          <img className="codio_logo" src={logo} />
        </div>
        {this.props.isTabVisible ? (
          <TabList className="AppHeader__tablist">
            <Tab
              selected={this.props.currentActiveTab === 'html'}
              tabIndex="0"
              handleTabClick={() => this.props.handleTabClick('html')}
            >
              HTML
            </Tab>
            <Tab
              selected={this.props.currentActiveTab === 'css'}
              tabIndex="1"
              handleTabClick={() => this.props.handleTabClick('css')}
            >
              CSS
            </Tab>
            <Tab
              selected={this.props.currentActiveTab === 'js'}
              tabIndex="2"
              handleTabClick={() => this.props.handleTabClick('js')}
            >
              JS
            </Tab>
            <Tab
              selected={this.props.currentActiveTab === 'logs'}
              tabIndex="3"
              handleTabClick={() => this.props.handleTabClick('logs')}
            >
              Console
            </Tab>
          </TabList>
        ) : null}
        <UserInfo />
      </header>
    );
  }
}
AppHeader.propTypes = {
  currentActiveTab: PropTypes.string,
  handleTabClick: PropTypes.func,
  isTabVisible: PropTypes.bool,
};
AppHeader.defaultProps = {
  currentActiveTab: 'html',
};
export default AppHeader;
