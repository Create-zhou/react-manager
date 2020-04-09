import React, { Component } from 'react'
import { Form, Input } from 'antd';

class UpdateCategory extends Component {
    UNSAFE_componentWillMount() {
        this.props.setForm(this.props.form)
    }


    //子组件向父组件传递数据
    render() {
        const { getFieldDecorator } = this.props.form
        const {CategoryName} =this.props
        return (
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('CategoryName', {
                            rules: [
                                { required: true, message: '分类名不能为空' }
                            ],
                            initialValue:CategoryName
                        })(
                            <Input placeholder='请输入分类名称' />
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(UpdateCategory)