import React, {Component} from 'react';
import {
    Card,
    Button,
    Modal,
    Form,
    Input,
    message,
    Table
} from 'antd'
import {reqAddRole,reqRoles,reqUpdateRole} from "../../api"
import UpdateRole from './UpdateRole'
import storageUtils from '../../utils/storageUtils'
import {PAGE_NUMBER} from '../../utils/constants'
export default class Role extends Component {

    constructor(props){
        super(props)
        this.menus = React.createRef()
    }
    state = {
        showAdd:false,  //表示添加角色的界面 默认不显示
        roles:[],    //存放所有的角色
        selectedRowKeys:[],
        showUpdate:false,  //表示修改角色的界面 默认不显示
        role:{},//存储选中的角色
        loading:true,
    }

    componentDidMount(){
        this.getRoles()
    }
    //定义Table组件的表头信息
    columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            render:(create_time)=>{
                // console.log(create_time,typeof create_time);
                return new Date(create_time).toLocaleString()
            }
        },
        {
            title: '授权时间',
            dataIndex: 'auth_time',
            render:(auth_time)=>{       //不加render函数会报错
                // console.log(auth_time)
                if(auth_time){
                    return new Date(auth_time).toLocaleString()
                }
            }
        },
        {
            title: '授权人',
            dataIndex: 'auth_name',
        }
    ];

    getRoles = async()=>{
        this.setState({loading:true})
        const result = await reqRoles()
        this.setState({loading:false})

        // console.log(result)
        const {status,msg,data} = result
        if(status===0){ //如果获取分类成功
            this.setState({roles:data})
        }
    }


    //点击添加界面的ok按钮
    addRole = ()=>{
        this.AddRoleForm = this.form.props.form
        this.AddRoleForm.validateFields(async (err,values)=>{
           if(!err){   //如果通过了前台验证  就向后台发起请求 把角色数据添加到数据库
               const result = await reqAddRole(values) ;// parentId:0  categoryName:男士内衣
               const {status,msg} = result
               console.log(result)
               if(status===0){ //如果添加分类成功  从数据库中获取所有的分类  展示在页面中
                   message.success(msg)
                   this.AddRoleForm.resetFields()
                   this.setState({showAdd: false});
                   this.getRoles()
               }else{
                   message.error(msg)
               }
           }
       })

    }

    //点击修改界面的ok按钮
    updateRole = async ()=>{
        // console.log('更新',this.menus.current.state.selectedKeys)
        const {role} = this.state
        //收集权限信息
        // 授权人信息  从本地中取出
        const user = storageUtils.getUser()
        //授权的时间
        role.auth_time = new Date()
        role.menus = this.menus.current.state.checkedKeys
        role.auth_name = user.username
        const result = await reqUpdateRole(role)

        const {status,msg} = result
        if(status===0){ //如果修改权限成功
            /*
            *   修改角色权限时的判断
            *      1.如果登录用户的角色是程序员 并且修改了程序员的权限  则强制退出
            * */
           if(user.role_id===role._id){
                message.success('登录用户的权限已经修改')
                storageUtils.removeUser()
                this.props.history.replace('/login')
           }else{
               message.success(msg)
               this.setState({showUpdate: false});
               this.getRoles()

           }
        }else{
            message.error(msg)
        }
    }

    handleCancel = e => {
        //清空输入框的数据
        this.setState({
            showAdd: false,
            showUpdate:false
        });
    }

    //设置行属性
    onRow = role => ({
        //点击每一行会触发函数  role为每一行的信息
        onClick: () => this.setState({
            selectedRowKeys:[role._id],
            role
        })
    })

    render() {
        const {roles,role,loading} = this.state
        const title = (
            <span>
               <Button type='primary' icon={'plus'} onClick={()=>this.setState({showAdd:true})}>添加角色</Button>
                <Button
                    type='primary'
                    style={{margin:10}}
                    disabled={!role._id}
                    onClick={()=>this.setState({showUpdate:true})}
                >设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    dataSource={roles}  //数据源
                    columns={this.columns}       //每列的信息
                    rowKey='_id'        //必须要有的
                    bordered
                    loading={loading}
                    rowSelection={{
                        type:'radio',
                        selectedRowKeys:this.state.selectedRowKeys,
                        // onChange:(selectedRowKeys)=>{   //点击单选按钮时触发
                        //   selectedRowKeys  数据源对应的_id
                        //     this.setState({selectedRowKeys})
                        // }
                    }}
                    pagination={{defaultPageSize:PAGE_NUMBER}}    //配置分页器
                    onRow={this.onRow}
                />
                <Modal
                    title="请添加角色"
                    visible={this.state.showAdd}
                    onOk={this.addRole}
                    onCancel={this.handleCancel}
                >
                    <AddRole wrappedComponentRef={(form) => this.form = form}/>
                </Modal>
                <Modal
                    title="请修改角色"
                    visible={this.state.showUpdate}
                    onOk={this.updateRole}
                    onCancel={this.handleCancel}
                >
                    <UpdateRole ref={this.menus} role={role}/>
                </Modal>
            </Card>
        );
    }
}

class AddRole extends Component {
    render(){
        const {getFieldDecorator} = this.props.form
        return (
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('roleName', {
                            rules: [
                                {required: true, message: '角色名不能为空'}
                            ]
                        })(
                            <Input placeholder='请输入角色名称'/>
                        )
                    }

                </Form.Item>
            </Form>
        )
    }
}

AddRole = Form.create()(AddRole);

