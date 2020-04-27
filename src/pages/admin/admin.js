import React, { Component } from 'react';
import { Layout } from 'antd';
// import memeoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils';
import Header from '../../components/header';
import LeftNav from '../../components/left-nav';
import Home from '../home/';
import Category from '../category';
import Product from '../product';
import Role from '../role';
import User from '../user';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';

import { Redirect, Route, Switch } from 'react-router-dom';

const { Footer, Sider, Content } = Layout;
export default class Admin extends Component {
  render() {
    const user = JSON.parse(storageUtils.getUser());
    if (!user._id) {
      return <Redirect to="/login" />;
    }

    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header>header</Header>
          <Content
            style={{
              background: 'white',
            }}
          >
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/role" component={Role}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/charts/bar" component={Bar}></Route>
              <Route path="/charts/line" component={Line}></Route>
              <Route path="/charts/pie" component={Pie}></Route>
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              color: '#aaa',
            }}
          >
            推荐使用谷歌浏览器， 可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
