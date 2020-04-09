import React, {Component} from 'react';
import { Menu, Icon, Button } from 'antd';
import {NavLink,withRouter} from 'react-router-dom'
import menusConfig from '../../config/menusConfig'
import storageUtils from '../../utils/storageUtils'
import {reqRole} from '../../api'
const { SubMenu } = Menu;
class LeftNav extends Component {

    // UNSAFE_componentWillMount(){
    //     //初始化菜单栏的结构  因为初始化是同步的 所以放在该钩子中
    //     this.menus = this.getMenus(menusConfig)
    // }

    state = {
        menus:[]
    }
    componentDidMount(){
        this.getRoleMenus()
    }

    getRoleMenus = async()=> {
        const {role_id,username} = storageUtils.getUser();
        this.username = username
        console.log(this.username)
        if(role_id){    //如果有role_id 即不是admin
            const result = await reqRole(role_id)
            const {data} = result
            //把角色的权限数据挂载到组件的实例化对象上
            this.roleAuth = data.menus
            // this.menus = this.getMenus(menusConfig)
            this.setState({
                menus:this.getMenus(menusConfig)
            })
        }else{      //如果是admin
            this.setState({
                menus:this.getMenus(menusConfig)
            })
        }
    }



    //该函数的作用是根据角色的权限数据 来判断有没有看到item的权限 返回值是true表示有item的权限 false表示没有
    hasAuth = (item)=>{


        // console.log(this.roleAuth)  // ['/admin/category']
        if(this.username==='admin'||item.public||this.roleAuth.includes(item.key)){      //如果权限数组中包含了item的权限
            return true
        } else if(item.children){
            // return this.roleAuth.includes(item.key)
            return item.children.find(cItem=>this.roleAuth.includes(cItem.key))
        }else {
            return false
        }

    }
    getMenus = (menus)=>{
        const {pathname} = this.props.location
        return menus.map(item=>{
            if(item.children){  //如果是可收缩的选项
                //从有子菜单中寻找初始打开的一级菜单
                //  /admin/category ==>  /admin/products

                const result =  item.children.filter(cItem=>pathname===cItem.key)
                if(result.length){  //如果在有children的数组中找到了匹配pathname的key值
                    this.defaultOpenKeys = item.key
                }
                return  <SubMenu
                    key={item.key}
                    title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}
                >
                    {this.getMenus(item.children)}
                </SubMenu>
            }else{  //如果是不可收缩的选项
                return <Menu.Item key={item.key}>
                    <NavLink to={item.key}>
                        <Icon type={item.icon}/>
                        <span>{item.title}</span>
                    </NavLink>
                </Menu.Item>
            }
        })
    }

    render() {
        const {pathname} = this.props.location
        return (
            <Menu
                defaultSelectedKeys={[pathname]}
                defaultOpenKeys={[this.defaultOpenKeys]}
                mode="inline"
                theme="dark"
            >
                {this.state.menus}
            </Menu>
        );
    }
}

export default withRouter(LeftNav)
//如何让非路由组件 具有路由组件的三个属性 history location match
//使用withRouter 高阶组件