import React, { Component } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, message } from 'antd';
import logo from '../../assets/images/logo.png';
import './login.less';
import { reqLogin } from '../../api/';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

export default class Login extends Component {
  handleFormSubmit = async (values) => {
    console.log('Received values of form: ', values);
    let { username, password } = values;
    const result = await reqLogin(username, password);
    if (result.status === 0) {
      message.success('登录成功');
      // memoryUtils.user = memoryUtils.hideNavigationBarLoading()
      const user = result.data;
      storageUtils.saveUser(user);
      memoryUtils.user = user;
      this.props.history.replace('/');
    } else {
      message.error(result.msg);
    }
  };

  render() {
    const rules = {
      username: [
        { required: true, whitespace: true, message: '用户名必须输入' },
        { min: 4, message: '用户名至少4位' },
        { max: 12, message: '用户名最多12位' },
        {
          pattern: /^[a-zA-Z0-9_]+$/,
          message: '用户名必须是英文、数字或下划线组成',
        },
      ],
      password: [
        {
          validator: (rule, value) => {
            if (!value) {
              return Promise.reject('密码必须输入');
            } else if (value.length < 4) {
              return Promise.reject('密码长度不能小于4位');
            } else if (value.length > 12) {
              return Promise.reject('密码长度不能大于12位');
            } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
              return Promise.reject('密码必须是英文、数字或下划线组成');
            } else {
              return Promise.resolve(); // 验证通过
            }
          },
        },
      ],
    };

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React练习：后台管理项目</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            name="loginForm"
            className="login-form"
            initialValues={{ username: 'admin' }}
            onFinish={this.handleFormSubmit}
          >
            <Form.Item name="username" rules={rules['username']}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
                style={{ color: 'rgba(0,0,0,.25)' }}
              ></Input>
            </Form.Item>
            <Form.Item name="password" rules={rules['password']}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="密码"
                style={{ color: 'rgba(0,0,0,.25)' }}
                type="password"
              ></Input>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
