import React, { Component } from 'react';
import { Button } from 'antd';

class MyButton extends Component {
  render() {
    return (
      <div>
        <Button type={this.props.theme}>登录</Button>
      </div>
    );
  }
}

export default MyButton;
