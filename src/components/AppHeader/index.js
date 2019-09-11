import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabList from '../TabList';
import Tab from '../Tab';
import Dropdown from './Dropdown';
import UserInfo from './UserInfo';
import eclipse from '../../assets/ellipsis-h-solid.svg';
import './index.scss';

class AppHeader extends Component {
  constructor() {
    super();
    this.state = {
      isDropdownOpen: false,
    };
  }

  switchDropdown = isOpen => {
    this.setState({
      isDropdownOpen: isOpen,
    });
  };

  render() {
    const dropdownOptions = [
      '新增專案',
      '儲存此專案',
      '刪除此專案',
      '分享此專案',
    ];
    return (
      <header className="AppHeader">
        <div className="AppHeader__logo-wrap">LOGO</div>
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
        {this.props.isDropdownVisible ? (
          <Dropdown
            icon={eclipse}
            options={dropdownOptions}
            isOpen={this.state.isDropdownOpen}
            swichOptionHandler={this.switchDropdown}
          />
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
  isDropdownVisible: PropTypes.bool,
};
AppHeader.defaultProps = {
  currentActiveTab: 'html',
};
export default AppHeader;
