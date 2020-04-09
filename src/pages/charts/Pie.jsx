import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {Card, Button} from"antd"
import echarts from 'echarts'


export default class pie extends Component {

    getOption1=()=>{
        let options = {
            title:{
            text:'饼图',
            textStyle:{
                color:'pink'
            }
            },
            legend:{ //图例组件
                data:['周一','周一','周二','周三','周四','周五','周六','周日'],
                icon:'triangle',
                orient:'vertical',
                right:20,
                top:20
            },

            tooltip: { //提示框组件
              trigger:'item',
              formatter:'{a}<br>{b}:{c}({d}%)'
            },
            series:[
                {
                    name:'存货',
                    type:'pie',
                    data:[{
                    name:'周一',
                    value:1000
                    },{
                        name:'周二',
                        value:1000
                    },{
                        name:'周三',
                    value:2000
                    },{
                        name:'周四',
                        value:1500
                    },{
                        name:'周五',
                        value:4000
                    },{
                        name:'周六',
                        value:2300
                    },{
                        name:'周日',
                        value:5600
                    }]
                }
            ]
        }
        return options
    }
     
    getOption2=()=>{
        let options = {
            title:{
            text:'饼图',
            textStyle:{
                color:'pink'
            }
            },
            legend:{ //图例组件
                data:['周一','周一','周二','周三','周四','周五','周六','周日'],
                icon:'triangle',
                orient:'vertical',
                left:20,
                top:20
            },

            tooltip: { //提示框组件
              trigger:'item',
              formatter:'{a}<br>{b}:{c}({d}%)'
            },
            series:[
                {
                    name:'存货',
                    type:'pie',
                    radius:['50%','100%'],
                    data:[{
                    name:'周一',
                    value:1000
                    },{
                        name:'周二',
                        value:1000
                    },{
                        name:'周三',
                    value:2000
                    },{
                        name:'周四',
                        value:1500
                    },{
                        name:'周五',
                        value:4000
                    },{
                        name:'周六',
                        value:2300
                    },{
                        name:'周日',
                        value:5600
                    }]
                }
            ]
        }
        return options
    }


    getOption3=()=>{
        let options = {
            title:{
            text:'饼图',
            textStyle:{
                color:'pink'
            }
            },
            legend:{ //图例组件
                data:['周一','周一','周二','周三','周四','周五','周六','周日'],
                icon:'triangle',
                orient:'vertical',
                left:20,
                top:20
            },

            tooltip: { //提示框组件
              trigger:'item',
              formatter:'{a}<br>{b}:{c}({d}%)'
            },
            series:[
                {
                    name:'存货',
                    type:'pie',
                    //radius:['50%','100%'],
                    roseType:'redius',
                    data:[{
                    name:'周一',
                    value:1000
                    },{
                        name:'周二',
                        value:1000
                    },{
                        name:'周三',
                    value:2000
                    },{
                        name:'周四',
                        value:1500
                    },{
                        name:'周五',
                        value:4000
                    },{
                        name:'周六',
                        value:2300
                    },{
                        name:'周日',
                        value:5600
                    }].sort((a,b)=>a.value-b.value)
                }
            ]
        }
        return options
    }
    render() {
        return (
           <div>
           <Card >
               <ReactEcharts option={this.getOption1()} />
            </Card>
            <Card>
               <ReactEcharts option={this.getOption2()} />
            </Card>
            <Card>
               <ReactEcharts option={this.getOption3()} />
            </Card>
           </div>
        );
    }
}