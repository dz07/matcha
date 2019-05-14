import React, { Component } from 'react'
import FlashMessagesList from './Flash/FlashMessagesList'
import {Layout, Menu, Icon} from 'antd'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logoutUser} from '../actions/userActions'
import PropTypes from 'prop-types'

class HeaderNav extends Component {
    logout = () => {
        this.props.logoutUser();
    };

    toggleBurgerMenu = () => {
        const inputToggle = document.querySelector('input.toggle-menu');
        if (inputToggle.checked) {
            document.querySelector('input.toggle-menu').checked = false;
        }
    };

    render() {
        const {Header} = Layout;
        const {auth} = this.props.user;
        const linkStyle = {
            textDecoration: 'none',
            zIndex: '2'
        };

        const navNoteExistStyle = {
            display: 'block'
        };
        const navNoteNoneStyle = {
            display: 'none'
        };

        let tab;
        const _urlArr = (window.location.href).split('/');
        if(_urlArr.length){
            const _curl = _urlArr[_urlArr.length - 1];
            if (_curl === '') {
                tab = '1';
            } else if (_curl === 'search' || Number.isInteger(Number(_curl))) {
                tab = '2';
            } else if (_curl === 'match') {
                tab = '3';
            } else if (_curl === 'messenger') {
                tab = '4';
            } else if(_curl === 'notifications') {
                tab = '5';
            }
        };

        const unreadMsg = this.props.chatUnread || [];
        const unreadNotes = this.props.historyUnread || [];
    return (
      <div>
          <label className="toggle-menu"> {auth ? '☰ Menu': ''}</label>
          {auth && <input type="checkbox" name="toggle" id="menu" className="toggle-menu"/>}
          <Header>
              {auth &&
              <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={[tab]}
                  style={{ lineHeight: '64px' }}>
                  <Menu.Item key="1"><Link to='/' onClick={this.toggleBurgerMenu} style={linkStyle}>
                      <Icon type="home" />Home</Link></Menu.Item>
                  <Menu.Item key="2" onClick={this.toggleBurgerMenu}><Link to='/search' style={linkStyle}>
                      <Icon type="search"/>Search</Link></Menu.Item>
                  <Menu.Item key="3">
                      <Link to='/match' onClick={this.toggleBurgerMenu} style={linkStyle}>
                          <Icon type="heart-o" />Match</Link></Menu.Item>
                  <Menu.Item key="4"><Link to='/messenger' onClick={this.toggleBurgerMenu} style={linkStyle}>
                      <span className="nav-note"
                            style = {unreadMsg.length && tab !== '4' ? navNoteExistStyle : navNoteNoneStyle}>&#9679;</span>
                      <Icon type="message" />Messenger</Link></Menu.Item>
                  <Menu.Item key="5"><Link to='/notifications' onClick={this.toggleBurgerMenu} style={linkStyle}>
                      <span className="nav-note"
                            style = {unreadNotes.length && tab !== '5' ? navNoteExistStyle : navNoteNoneStyle}>&#9679;</span>
                      <Icon type="notification" /> Notifications</Link></Menu.Item>
                  <Menu.Item key="6"><Link to='/' onClick={this.logout} style={linkStyle}>
                      <Icon type="logout" />Logout</Link></Menu.Item>
              </Menu>
              }
          </Header>
          <FlashMessagesList/>
      </div>
    );
  }
};

function mapStateToProps({user, chat, history}) {
    return {user,
            chatUnread: chat.unread,
            historyUnread: history.unread};
};

HeaderNav.propTypes = {
    user: PropTypes.object,
    chatUnread: PropTypes.array,
    historyUnread: PropTypes.array,
    logoutUser: PropTypes.func
};

export default connect(mapStateToProps, {logoutUser})(HeaderNav);
