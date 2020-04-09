import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import {Card,} from"antd"
import option from'../../option/Records'

export default class Records extends Component {

UNSAFE_componentWillMount() {
    this.option = option
}

    render() {
        return (
           <Card>
               <ReactEcharts option={this.option } style={{height:'600px'}}/>
           </Card>
        )
    }
}
