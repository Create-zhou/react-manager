import React, { Component } from 'react';
import './Login.less';
 import 'antd/dist/antd.css';
 import { Form, Icon, Input, Button, message} from 'antd';
 import {reqLogin} from'../../api/index';
import storageUtils from '../../utils/storageUtils';

 class Login extends Component {

        handleSubmit = e => {
         // e.preventDefault();
          this.props.form.validateFields(async(err, values) => {
            if (!err) { //如果通过前台校验规则 就把用户的信息发送给后台
            const result = await reqLogin(values);
            const {msg,data,status} = result;
            if(status===0){ 
                //如果用户登录成功 跳转到admin组件
                //如果人为定义跳转 是不可以的

                //解决方案 登录成功的时候将方案储存到本地，本地有数据 可以进
                //本地如果没有数据 重定向到登录界面
                storageUtils.saveUser(data)
                message.success(msg);
                this.props.history.push('/Admin');
            }else{
                message.error(msg)
            }
            }
          });
        };
      

    render() {
        //该函数可以收集表单数据getFieldDecorator
        //通过高阶组价的属性代理返回的属性之一 可以console.log(this.props.form)
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login'>
                <h2 className='login-h2'>React后台管理系统</h2>

<Form.Item>
    {
        getFieldDecorator('username',{
            rules:[
                {max:12,message:"最大长度不能超过12"},
                {min:5,message:"最小长度不能少于5"},
                {required:true,message:'账号不能为空'}
            ]
        })(
            <Input
            prefix={<Icon type="user"
             style={{ color: 'rgba(0,0,0,.25)' }} 
             />}
            placeholder="请输入用户名"

          />
        )
    }
            
        </Form.Item>
        <Form.Item>
            {
                getFieldDecorator('password',{
                    rules:[
                        {max:12,message:"最大长度不能超过12"},
                        {min:5,message:"最小长度不能少于5"},
                        {required:true,message:'密码不能为空'}
                    ]
                })(
                    <Input
                    prefix={<Icon type="lock"
                     style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                  />
                )
            }
           
        </Form.Item>
        <Button type="primary" 
         htmlType="submit"
         className="login-form-button"
         onClick={this.handleSubmit}
          block
         >
           登录
          </Button>
            </div>
        )
    }
}
const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm;
/*
 高阶组价是一个接受组件A返回组件B的函数
 接受了login组件
 返回了WrappedNormalLoginForm
 特性 ：属性代理
*/