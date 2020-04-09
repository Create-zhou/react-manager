import React, { Component } from 'react'
import storageUtils from '../../utils/storageUtils'
import { Redirect,Route,Switch } from 'react-router-dom'
import { Layout} from 'antd';
import LeftNav from '../../components/LeftNav/leftNav';
import Home from "../home/Home"
import Category from "../category/Category"
import Product from "../product/Product"
import User from "../user/User"
import Role from "../role/Role"
import Bar from "../charts/Bar"
import Line from "../charts/Line"
import Pie from "../charts/Pie"
import Records from "../charts/Records"
import Car from "../charts/Car"
import Parallel from "../charts/Parallel"
import Header from '../../components/header/header'

const { Footer, Sider, Content } = Layout;


export default class Admin extends Component {
    render() {
        const user = storageUtils.getUser()
        if (!user._id) {  //如果没有该用户信息 就重定向 
            return <Redirect to='/Login' />
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider collapsed>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header></Header>
                    <Content style={{backgroundColor:'#fff',margin:20}}>
                        <Switch>
                            <Route path='/Admin/home' component={Home} />
                            <Route path='/Admin/category' component={Category} />
                            <Route path='/Admin/product' component={Product} />
                            <Route path='/Admin/user' component={User} />
                            <Route path='/Admin/role' component={Role} />
                            <Route path='/Admin/charts/bar' component={Bar} />
                            <Route path='/Admin/charts/line' component={Line} />
                            <Route path='/Admin/charts/pie' component={Pie} />
                            <Route path='/Admin/charts/Records' component={Records} />
                            <Route path='/Admin/charts/Car' component={Car} />
                            <Route path='/Admin/charts/Parallel' component={Parallel} />
                        </Switch>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}
