import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import {Card,message} from"antd"
import option from'../../option/Parallel' 

export default class Records extends Component {

UNSAFE_componentWillMount() {
    this.option = option
    message.error("本页开发材料及技术不足，暂停研究")
}

    render() {
        return (
           <Card>
               <ReactEcharts option={this.option }
                style={{height:'600px',width:'100%'}}
                />
           </Card>
        )
    }
}