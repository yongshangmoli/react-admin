import React, { Component } from 'react';
import './index.less';
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import LinkButton from '../link-button';
import menuList from '../../config/menuConfig';
import { reqWeather } from '../../api';
import { formateDate } from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

class Header extends Component {
  state = {
    sysTime: formateDate(Date.now()),
    dayPictureUrl: '', // 天 气 图 片 的 url
    weather: '',
  };

  getWeatherInfo = async () => {
    const { dayPictureUrl, weather } = await reqWeather('成都');
    this.setState({
      dayPictureUrl,
      weather,
    });
  };

  getSysTime = () => {
    this.intervalId = setInterval(() => {
      this.setState({
        sysTime: formateDate(Date.now()),
      });
    }, 1000);
  };

  logout = () => {
    Modal.confirm({
      content: '确定退出吗？',
      onOk: () => {
        storageUtils.removeUser();
        memoryUtils.user = {};
        this.props.history.replace('/login');
      },
      onCancel() {},
    });
  };

  // TODO: 递归查找
  getTitle = (path) => {
    let title;
    menuList.map((menu) => {
      if (menu.key === path) {
        title = menu.title;
      } else if (menu.children) {
        menu.children.map((item) => {
          if (path.indexOf(item.key) === 0) {
            title = item.title;
          }
        });
      }
    });
    return title;
  };

  componentDidMount() {
    this.getSysTime();
    // this.getWeatherInfo()
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { sysTime, dayPictureUrl, weather } = this.state;
    const user = memoryUtils.user;
    const path = this.props.location.pathname;
    const title = this.getTitle(path);

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {user.username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{sysTime}</span>
            {/* <img src={dayPictureUrl} alt="weather"/> */}
            <span>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

// export default Header;
export default withRouter(Header);
