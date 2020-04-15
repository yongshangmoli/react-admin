import React, { Component } from 'react'
import { Button } from "antd"
import { BrowserRouter as Router, Link } from 'react-router-dom'

class Clock extends Component {
    submit = (type) => {
        console.log(333, type)

    }
    render () {
        return (
            <Router>
                <div>
                    <Link to={
                        {
                            pathname: "#/list",
                        }
                    }>
                        <Button type="primary" onClick={(e) => this.submit('list', e)}>
                            查看列表
                        </Button>
                    </Link>

                    <div>2</div>

                    <Link to="#/detail">
                        <Button type="primary" onClick={(e) => this.submit('detail', e)}>
                            查看详情
                        </Button>
                </Link>
                </div>
            </Router>
        )
    } 
}

export default Clock