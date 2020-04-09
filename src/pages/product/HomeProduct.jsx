import React, { Component } from 'react'
import { Card, Select, Button, Input, Icon, Table } from 'antd'
import { reqProduct,reqSearchProduct } from '../../api'
import Mybutton from '../../components/my-button/my-button'
import {PAGE_NUMBER} from '../../utils/constants'
const { Option } = Select



export default class HomeProduct extends Component {

    state = { 
        products: [],//存放所有的商品列表
        total: 0,   //得到商品的数据
        keyWord: '',//收集Input框中的关键词
        searchType: 'name' //储存搜索的类型
    }
    UNSAFE_componentWillMount() {
        this.initCoumns()
    }
    componentDidMount() {
        //获取第一页的商品数据
        this.getProduct(1)
    }

    //根据页码获取对应的分页数据
        getProduct = async page => {
        const  {keyWord,searchType} = this.state
        let result = null;
        if(keyWord){
         result =  await reqSearchProduct(page,PAGE_NUMBER,keyWord,searchType)
        }else{
           result= await reqProduct(page, PAGE_NUMBER)
        }
        // const result = await reqProduct(page, 3)
        const { data, msg, status } = result
        if (status === 0) {
            const { result, total } = data
            this.setState({
                products: result,
                total
            })
        }
    }

    //初始化每一列的信息
    initCoumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '商品价格',
                dataIndex: 'price',
                render: (price) => `￥${price}元 `
            },
            {
                title: '操作类型',
                width: '300',
                render: (products) => {
                    return (
                        <span>
                            <Mybutton onClick={()=>this.props.history.push({
                                  pathname:'/admin/product/DetailProduct' ,
                                  state:{products}
                            })}>详情</Mybutton>
                            <Mybutton onClick={
                                () =>this.props.history.push({
                                    pathname:'/admin/product/AddUpdata' ,
                                    state:{products}
                                })}>修改</Mybutton>
                        </span>
                    )
                }
            },
        ];
    }
   

    render() {
        const { products, total, keyWord, searchType } = this.state
        const title = (
            <span>
                <Select
                    value={searchType}
                    style={{ width: 200, margin: 10 }}
                    onChange={(value) => this.setState({ searchType: value })}
                >
                    <Option value='name'>按照名称搜索</Option>
                    <Option value='desc'>按照描述搜索</Option>
                </Select>
                <Input placeholder='请输搜索的关键字'
                    style={{ width: 200, margin: 10 }}
                    value={keyWord}
                    onChange={(e) => this.setState({ keyWord: e.target.value })}
                />
                <Button type="primary"onClick={()=>this.getProduct(1)}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={() => this.props.history.push('/admin/product/AddUpdata')}>
                <Icon type='plus' />
                <span>添加商品</span>
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    dataSource={products}  //数据源
                    columns={this.columns}     //每列的信息
                    // loading={loading}   //设置数据是否在加载
                    rowKey={"_id"}   //必须要有的id值
                    pagination={{     //配置分页器属性
                        total,
                        defaultPageSize: PAGE_NUMBER,
                        onChange: (page) => {  //如果要做后台的分页，必需配置
                            this.getProduct(page)
                        }
                    }}  //配置分页器
                    bordered   //增加边框线
                />
            </Card>
        )
    }
}
