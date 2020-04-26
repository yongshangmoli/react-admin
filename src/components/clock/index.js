import React, { Component } from 'react';
import Button from './button';
// import { ThemeContext } from '../../pages/admin/Context'

class Clock extends Component {
  // static contextType = ThemeContext

  componentWillMount() {
    console.log('查看context', this.context);
  }
  render() {
    return (
      <div>
        <Button theme={this.context}></Button>
      </div>
    );
  }
}

export default Clock;
