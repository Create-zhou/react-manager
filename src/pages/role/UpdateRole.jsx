import React, {Component} from 'react';
import { Tree,Form,Input } from 'antd';
import menusConfig from '../../config/menusConfig'

const { TreeNode } = Tree;
const { Item } = Form;

// UpdateRole该组件每次显示与隐藏  并没有销毁
export default class UpdateRole extends Component {

    state = {
        // checkedKeys 设置复选框是否选中    selectedKeys 设置文字是否选中
        checkedKeys:this.props.role.menus //存放的角色的权限信息
    }

    UNSAFE_componentWillMount(){
        //初始化菜单栏的结构  因为初始化是同步的 所以放在该钩子中
        this.treeNodes = this.getTreeNodes(menusConfig)
    }

    //当组件接受的属性变化时  更改状态中的checkedKeys值
    UNSAFE_componentWillReceiveProps(nextProps){
        // console.log(nextProps)
        const {menus} = nextProps.role
        this.setState({checkedKeys:menus})
    }
    onCheck = (checkedKeys)=> this.setState({checkedKeys})
    getTreeNodes = (menusConfig)=>{
        return menusConfig.reduce((pre,next)=>{
            if(next.children){
                pre.push(
                    <TreeNode title={next.title} key={next.key}>
                        {this.getTreeNodes(next.children)}
                    </TreeNode>
                )
            }else{  //如果没有子节点的
                pre.push( <TreeNode title={next.title} key={next.key}  />)
            }
            return pre
        },[])
    }
    render() {
        const {role} = this.props
        // console.log(role)
        return (
            <Form>
                <Item label={'角色名称'}>
                    <Input disabled value={role.name}/>
                </Item>
                <Item>
                    <Tree
                        checkable
                        defaultExpandAll={true}
                        checkedKeys={this.state.checkedKeys}
                        onCheck={this.onCheck}
                    >
                        {this.treeNodes}
                    </Tree>
                </Item>
            </Form>

        );
    }
}