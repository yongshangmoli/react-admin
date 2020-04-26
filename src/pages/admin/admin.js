import React, { Component } from 'react';
import { Layout } from 'antd';
// import memeoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils';
import Header from '../../components/header';
import LeftNav from '../../components/left-nav';
import { Redirect } from 'react-router-dom';

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
            content
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
