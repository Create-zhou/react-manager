import React, { Component } from 'react'
import './header.less'
import storageUtils from '../../utils/storageUtils'
import { Modal, Button } from 'antd';
import {withRouter}from"react-router-dom";
import {prediction} from"../../api/index";
import  menusConfig from"../../config/menusConfig";
import Mybutton from'../my-button/my-button'
const { confirm } = Modal;
 class Header extends Component {
     state={
         currenTime:new Date().toLocaleString(),//初始化时间
         weatherInfo:{}  //初始化天气
     }
    UNSAFE_componentWillMount(){
        this.user = storageUtils.getUser()
    }
    //每隔一秒更新时间
    componentDidMount(){
     this.timer = setInterval(() => {
           this.setState({
               currenTime:new Date().toLocaleString()
           })
       },1000);
       this.getWeather();
       this.getHeaderTitle()
    }
 //header组件的标题
 getHeaderTitle=()=>{
     const {pathname} = this.props.location;
    //  console.log(menusConfig.filter(item=>{
    //      return pathname===item.key
    //  }))
    let title='';
    menusConfig.forEach(item=>{  //先遍历第一城菜单
        if(pathname===item.key){
            title = item.title
        }
        if(item.children){  //再从二级菜单里面找
            const result = item.children.find(cItem=>pathname.includes(cItem.key))
              if(result){ //防止重复
                title = result.title
              }
          }
    })
    return title
 }



    //获取天气接口数据
    getWeather=async(city)=>{
        const result = await prediction("潮南");
         this.setState({weatherInfo:result})
    }
    //退出登录
    loginOut=()=>{
        confirm({
            title: '确认退出吗',
            onOk:()=>{  //点击ok按钮 退出登录状态 路径变成/login 删除本地数据
              storageUtils.removeUser()
              this.props.history.push('/Login');
            },
            onCancel() {
              console.log('取消');
            },
          });
        }
        componentWillUnmount(){
            clearInterval( this.timer);
        }
    render() {
        const {currenTime,weatherInfo} = this.state
        const {dayPictureUrl,temperature,weather,wind} = weatherInfo
        return (
              <div className='Header'>
              <div className='header-top'>
               <span>欢迎,{this.user.username}</span>
                  <Mybutton onClick={this.loginOut}>退出</Mybutton>
              </div>
              <div className='header-bottom'>
        <span className='header-bottom-left'>{this.getHeaderTitle()}</span>
              <div className='header-bottom-right'>
               <span>{currenTime}</span>
              <img src={dayPictureUrl}alt=''/>
               <span>{temperature}</span>
                <span>{weather}</span>
                <span>{wind}</span>
              </div>
              </div>
            </div>
        )
    }
}
export default withRouter(Header)