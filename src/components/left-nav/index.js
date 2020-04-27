import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  // UsergroupAddOutlined,
  // TableOutlined,
  SafetyOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import menuConfig from '../../config/menuConfig';
import logo from '../../assets/images/logo.png';
import './index.less';

const SubMenu = Menu.SubMenu;
const CompMap = {
  home: HomeOutlined,
  appstore: AppstoreOutlined,
  bars: BarsOutlined,
  cart: ShoppingCartOutlined,
  user: UserOutlined,
  // 'user': UsergroupAddOutlined,
  safety: SafetyOutlined,
  'area-chart': AreaChartOutlined,
  'bar-chart': BarChartOutlined,
  'line-chart': LineChartOutlined,
  'pie-chart': PieChartOutlined,
};

class LeftNav extends Component {
  getMenuNodes = (menuList) => {
    const path = (this.props.location && this.props.location.pathname) || '';
    const ItemComp = (menu) => {
      let Icon = menu.item.icon && CompMap[menu.item.icon];
      return (
        <span>
          {Icon ? <Icon></Icon> : null}
          <span>{menu.item.title}</span>
        </span>
      );
    };
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <ItemComp item={item}></ItemComp>
            </Link>
          </Menu.Item>
        );
      } else {
        if (item.children.find((cItem) => path.indexOf(cItem.key) === 0)) {
          this.openKey = item.key;
        }
        pre.push(
          <SubMenu key={item.key} title={<ItemComp item={item}></ItemComp>}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
      return pre;
    }, []);
  };

  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuConfig);
  }

  render() {
    const path = (this.props.location && this.props.location.pathname) || '';
    const openKey = this.openKey;

    return (
      <div className="left-nav">
        <Link to="/home" className="logo-link">
          <img src={logo} alt="logo" />
          <h1>后台系统</h1>
        </Link>

        <Menu
          mode="inline"
          theme="dark"
          selectedKey={[path]}
          defaultOpenKeys={[openKey]}
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

export default LeftNav;
