import React, { Component } from 'react'
import { Form, Select, Input } from 'antd';

const { Option } = Select;
class AddCategory extends Component {
    UNSAFE_componentWillMount() {
        this.props.setForm(this.props.form)
    }
    //子组件向父组件传递数据

    render() {
        const { getFieldDecorator } = this.props.form
        const {categorys,parentId} = this.props
        return (
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('parentId', {  //收集的是Option的values
                            initialValue: parentId,       //默认显示value值在Select框中
                            rules: [
                                { required: true, message: '分类名不能为空' }
                            ]
                        })(
                            <Select>
                                   <Option value="0">一级分类</Option>
                             {
                                categorys.map(item=>{
                                return <Option 
                                key={item._id}
                                value={item._id}>{item.name}</Option>
                                })
                             }
                            </Select>
                        )
                    }

                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('categoryName', {
                            rules: [
                                { required: true, message: '分类名不能为空' }
                            ]
                        })(
                            <Input placeholder='请输入分类名称' />
                        )
                    }

                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(AddCategory)