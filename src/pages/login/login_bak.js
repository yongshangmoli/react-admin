import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import logo from '../../assets/images/logo.png';
import './login.less';

import SmartForm from '../../components/smartForm';
// const Item = Form.Item

export default class Login extends Component {
  onValuesChange = (changedValues, allValues) => {
    this.formData = { ...allValues };
    console.log(444, changedValues, this.formData, allValues);
  };

  render() {
    const that = this;

    let formData = { username: 'aaaa' };

    const formConfig = [
      {
        control: 'Input',
        name: 'username',
        label: '用户名',
        controlAttrs: {
          placeholder: '请输入用户名',
        },
        formItemAttrs: {},
        rules: [{ required: true }],
      },
      {
        control: 'Input',
        name: 'password',
        label: '密码',
        controlAttrs: {
          placeholder: '请输入密码',
        },
        formItemAttrs: {},
        rules: [{ required: true }],
      },
    ];

    const buttons = [
      {
        text: '提交',
        attrs: {
          type: 'primary',
          // htmlType: 'submit'
        },
        handler: (ctx) => {
          console.log(333, that.refs.loginForm.clearFieldHandle());
        },
      },
    ];

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React练习：后台管理项目</h1>
        </header>
        <section className="login-content">
          <h3>用户登录</h3>
          <SmartForm
            ref="loginForm"
            initialValues={formData}
            formConfig={formConfig}
            buttons={buttons}
            onValuesChange={this.onValuesChange}
          ></SmartForm>
        </section>
      </div>
    );
  }
}
