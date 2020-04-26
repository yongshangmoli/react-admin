import React, { Component } from 'react';
import Clock from '../../components/clock';
import { Button } from 'antd';

// const ThemeContext = React.createContext('ds')
import { ThemeContext } from './Context';
export default class Admin extends Component {
  // render () {
  //     return (
  //         <div>
  //             <p>admin</p>
  //             <ThemeCtx.Provider value="primary">
  //                 <Clock></Clock>
  //             </ThemeCtx.Provider>
  //         </div>
  //     )
  // }

  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="primary">
        <Clock />
        {/* <Toolbar></Toolbar> */}
      </ThemeContext.Provider>
    );
  }
}

Admin.contextType = ThemeContext;
// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  componentWillMount() {
    console.log('测试context', this.context);
  }
  render() {
    return <Button type={this.context}>邓肯</Button>;
  }
}
// Admin.contextType = 'testCtx'
