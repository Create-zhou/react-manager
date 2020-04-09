import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {Card, Button} from"antd"
import echarts from 'echarts'


export default class line extends Component {

  state={
      books:[1000,2000,2323,5454,4233,6533,2123],//预销量
      sales:[2313,3423,2313,453,3424,4532,3132],//销量
  }

    getOption1=()=>{
        let options = {
            title:{
            text:'折线图',
            textStyle:{
                color:'pink'
            }
            },
            legend:{ //图例组件
                data:['存货'],
                icon:'triangle'
            },
            xAxis:{ 
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            tooltip: { //提示框组件
              trigger:'item'
            },
            yAxis:{},
            series:[
                {
                    name:'存货',
                    type:'line',
                    data:[1000,2000,1500,3000,2000,1200,800]
                }
            ]
        }
        return options
    }
     
    getOption2=(books,sales)=>{
        let options = {
            title:{
            text:'折线图',
            textStyle:{
                color:'pink'
            }
            },
            legend:{ //图例组件
                data:['订单量','销量'],
                icon:'circle'
            },
            xAxis:{ 
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            tooltip: { //提示框组件
              trigger:'item'
            },
            yAxis:{},
            series:[  //数据源
                {
                    name:'订单量',
                    type:'line',
                    data:books
                },
                {
                    name:'销量',
                    type:'line',
                    data:sales
                }
            ]
        }
        return options
    }

    updataStore=()=>{
        this.setState(state=>({
           books:state.books.map(item=>item+100),
           sales:state.sales.map(item=>item-20)
        }))
    }



    render() {
        const title = <Button type={'primary'}onClick={this.updataStore}>更新数据</Button>
        const {books,sales} = this.state
        return (
           <div>
           <Card >
               <ReactEcharts option={this.getOption1()} />
            </Card>
            <Card title={title}>
               <ReactEcharts option={this.getOption2(books,sales)} />
            </Card>
           </div>
        );
    }
}