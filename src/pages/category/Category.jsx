import React, { Component } from 'react';
import { Card, Button, Icon, Modal, message, Table } from 'antd';
import AddCategory from './AddCategory'
import { reqAddCategory, reqCategorys,reqUpdataCategorys } from '../../api'
import Mybutton from '../../components/my-button/my-button';
import UpdateCategory from'./updateCategory';


export default class Category extends Component {
    //定义初始状态
    state = {
        visible: false, //表示添加分类的界面 默认不显示
        showUpdate:false,//表示修改的界面 默认不显示 
        categorys: [],//存放所有的一级分类
        loading: true, //记录组件的状态是否在加载中
        parentId:'0', //表示记录tabel组件显示的是一级分类的数据还是二级的数据
        subCategorys:[], //记录所有的二级分类
        parentName:'', //记录点击查看子分类名称
    }


    //异步加载获取到分类的数据
    componentDidMount() {
        this.getCategorys()
    }

    //同步加载表头样式
    UNSAFE_componentWillMount() {
        this.initCoumns()
    }

    //初始化每一列的信息
    initCoumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 200,
                render: (category) => {
                    return (
                        <span>
                            <Mybutton onClick={()=>this.updataCategory(category)}>修改分类名</Mybutton>
                            {
                              this.state.parentId==='0'? <Mybutton onClick={()=>this.showSubCategory(category)}>查看子分类</Mybutton>:null
                            }
                        </span>
                    )
                }
            },
        ];
    }

    //展示添加分类的界面
    showAdd = () => {
        this.setState({ visible: true })
    } 

    //点击进入修改分类名称界面
    updataCategory = (category) => {
        this.category = category
         this.setState({showUpdate:true})
    }


    //获取所有的一级分类
    getCategorys = async (parentId) => {
        //初始加载数据
        this.setState({ loading: true })
        //const {parentId} = this.state
        parentId = parentId||this.state.parentId        
        const result = await reqCategorys(parentId)
        //数据加载完成
        this.setState({ loading: false })
        const { msg, data, status } = result
        if (status === 0) { //获取分类成功
            // message.success(msg)
            if(parentId==='0'){ //如果要显示的是一级分类集合
              this.setState({categorys:data})
            }else{  //如果是要显示某个一级分类下的二级分类集合
                this.setState({ subCategorys: data })
            }
           
        } else {
            message.error(msg)
        }
    }


    //点击确定  需要得到添加的数据
    onOk = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {  //如果通过前台验证 就向后台发起请求 把分类数据添加到数据库
                const result = await reqAddCategory(values); //parentId:'0',categoryName
                const { msg, data, status } = result
                if (status === 0) {  //如果添加分类成功了 从数据库中获取所有的分类 展示在页面中
                    message.success(msg)
                    //如果添加分类成功 清空输入框中的内容
                    this.form.resetFields()
                    this.setState({ visible: false })
                    //在显示二级分类中添加一级分类
                    if(values.parentId===this.state.parentId){  //如果下拉框收集的parentId和组件的parentId相等
                        this.getCategorys()
                    }else if(values.parentId==='0'){  //如果下拉框收集的parentId是0 是’0‘表示新增一个一级分类
                        this.getCategorys('0')
                    }
                    
                } else {
                    message.error(msg)
                    this.setState({ visible: true })
                }
            }
        })
    }

    //点击取消
    onCancel = () => {
        //点击取消时清空输入的内容
        this.form.resetFields()
        this.setState({ 
            visible: false,
            showUpdate:false
        })
    }


    //点击获取子分数据
    showSubCategory=(category)=>{
       this.setState({   //把组件的parentId 改成电脑的id值 setSate的函数是异步的
           parentId:category._id,
           parentName:category.name
       },()=>{  //修改好parentId之后 在执行函数
        this.getCategorys();
       })
      
    }

    //点击返回一级分类
    showCategorys=()=>{
        this.setState({  //点击将parentId和parentName重置
            parentId:'0',
            parentName:'',
            subCategorys:[] //每次离开子分类之后清空子分类得到的数据
        })
    }

    //修改分类名称
    updataOkay=()=>{
        this.form.validateFields(async (err, values) => {
              if(!err){
                    values._id = this.category._id
              const result = await reqUpdataCategorys(values);
              const { msg, data, status } = result
              if(status===0){
                  message.success(msg)
                  this.form.resetFields()
                  this.setState({ showUpdate: false })
                  this.getCategorys()
              }else{
                  message.error(msg)
              }
              }
        })
    }


    render() {
        const { categorys, loading,subCategorys,parentId,parentName } = this.state
        let CategoryName;
        if(this.category){
            CategoryName = this.category.name
        }else{
            CategoryName = '';
        }
        const title = parentId==='0'?'一级分类':(
            <span>
                 <Mybutton onClick={this.showCategorys}>一级分类</Mybutton>
                <Icon type='arrow-right'/>
                {parentName}
            </span>
        )
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <Icon type='plus' />
                <span>添加按钮</span>
            </Button>
        )


        return (
            <Card title={title} extra={extra}>
                <Table
                    dataSource={parentId==='0'?categorys:subCategorys}  //数据源
                    columns={this.columns}     //每列的信息
                    loading={loading}   //设置数据是否在加载
                    rowKey={"_id"}   //必须要有的id值
                    pagination={{ defaultPagesSize: 10 }}  //配置分页器
                    bordered   //增加边框线
                />
                <Modal
                    title="请添加分类"
                    visible={this.state.visible}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                >
                    <AddCategory
                        categorys={categorys}
                        parentId={parentId}
                        setForm={(form) => this.form = form} />
                </Modal>

                <Modal
                    title="请修改分类"
                    visible={this.state.showUpdate}
                    onOk={this.updataOkay}
                    onCancel={this.onCancel}
                >
                    <UpdateCategory
                    CategoryName={CategoryName}
                     setForm={(form) => this.form = form}
                    />
                </Modal>
            </Card>
        );
    }
}