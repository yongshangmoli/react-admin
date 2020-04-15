import React from 'react'
import 'antd/dist/antd.css'

import { BrowserRouter, Switch, Route } from "react-router-dom"

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

function App() {
    return (
		<div className="App">
			<BrowserRouter>
				<Switch> {/*只匹配其中一个*/}
					<Route path='/login' component={Login}></Route>
					<Route path='/' component={Admin}></Route>
				</Switch>
			</BrowserRouter>
		</div>
    );
}

export default App;
