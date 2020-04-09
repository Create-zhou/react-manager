import React, { Component } from 'react'
import { Card, Select, Button, Icon, Input, Form, Cascader, message } from 'antd'
import Mybutton from '../../components/my-button/my-button'
import { reqCategorys, reqAddProduct ,reqUptateProduct} from '../../api/index'
import PictureWall from './PictureWall'
import RichTextEditon from './RichTextEditon'
const { TextArea } = Input

class AddUpdata extends Component {

    constructor(props) {
        super(props)
        this.imgs = React.createRef()//创建标记对象 {current:null}
        this.details = React.createRef()
    }


    state = {
        options: [],//存放所有的一级分类
    };

   UNSAFE_componentWillMount(){
       if(this.props.location.state){   //如果有值 就是修改页面
             this.updata = true
             this.products = this.props.location.state.products
       }else{
           this.updata = false
           this.products = {}
       }
   }



    componentDidMount() {
        this.getCategory()
    }

    getCategory = async()=>{
        const result = await reqCategorys('0')
        const {status,data} = result
        const {pCategoryId} = this.products
        const options = this.formateData(data,true)
        if(status===0){ //如果获取分类成功
            //如果是修改页面  并且分类的数组长度是2
            if(this.updata&&pCategoryId!=='0'){
                const targetOption = options.find(item=>item.value==pCategoryId)
                const index = options.findIndex(item=>item.value===targetOption.value)
                const result = await reqCategorys(targetOption.value)
                let {data,status} = result
                if(status===0){ //如果获取到二级分类
                    // data = this.formateData(data,false)
                    targetOption.children = this.formateData(data,false)
                }else{  //如果没有获取到二级分类 则该一级分类就是叶子
                    targetOption.isLeaf = true;
                }
               options[index]=targetOption
            }
                this.setState({options})
        }
    }

    //点击第一级选项时 触发  selectedOptions是对应的点击项
    loadData = async selectedOptions => {
        const targetOption = selectedOptions[0];
        // console.log(targetOption)
        //加载第二级分类   true表示数据正在加载
        targetOption.loading = true;
        const result = await reqCategorys(targetOption.value)
        targetOption.loading = false;
        let {data,status} = result
        if(status===0){ //如果获取到二级分类
            // data = this.formateData(data,false)
            targetOption.children = this.formateData(data,false)
        }else{  //如果没有获取到二级分类 则该一级分类就是叶子
            targetOption.isLeaf = true;
        }
        this.setState({
            options: [...this.state.options],
        });
    };

    //把数据转换成cascader组件需要的数据格式
    formateData = (data,bool)=>{
        return data.map(item=>({
            value: item._id,
            label: item.name,
            isLeaf: bool?false:true,
        }))
    }

    handleSubmit = () => {
        this.props.form.validateFields(async (err, values) => {
            //如何调用子组件的方法
            const imgs = this.imgs.current.getImgs()
            console.log(imgs)
            const details = this.details.current.getDetails()
            const { category, name, desc, price } = values
            let pCategoryId, categoryId
            if (category.length === 1) {   //如果是长度为1的数组
                pCategoryId = '0'
                categoryId = category[0]
                // [categoryId,pCategoryId='0'] = category
            } else {
                pCategoryId = category[0]
                categoryId = category[1]
            //    [ pCategoryId,categoryId  ]  = category
         }
            const productInfo = { name, desc, price, pCategoryId, categoryId, imgs, details }
            let result = null;
            if(this.updata){ //如果是修改页面  就执行修改商品的接口函数
                productInfo._id = this.products._id
               result = await reqUptateProduct(productInfo)
            }else{    //如果是添加页面  就执行添加商品的接口请求函数
              result = await reqAddProduct(productInfo)
            }
             const {status,data,msg} = result
             if(status===0){  //如果添加成功      
                 message.success(msg)
                 this.props.history.push('/admin/product')
             }else{
                 message.error(msg)
             }
        })
    }

    render() {
        const {categoryId,pCategoryId,desc,imgs,name,price,details} = this.products
        console.log(imgs)
        console.log(this.products)
        const category=[]
        if(pCategoryId==='0'){ //如果是一级分类
              category.push(categoryId)
        }else{
            category.push(pCategoryId,categoryId)
        }
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                sm: { span: 8 }
            },
            wrapperCol: {
                sm: { span: 12 }
            }
        }

        const title = (
            <span>
                <Mybutton onClick={this.props.history.goBack}>
                    <Icon type='arrow-left' />
                </Mybutton>
                <span>
                    {
                        this.updata?'修改商品页面':'添加商品页面'
                    }
                </span>
            </span>
        )
        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Form.Item label={'商品名称'}>
                        {
                            getFieldDecorator('name', {
                                rules: [
                                    { required: true, message: '商品名称不能为空' }
                                ],
                                initialValue:name
                            })(
                                <Input placeholder='请输入商品名称' />
                            )
                        }
                    </Form.Item>
                    <Form.Item label={'商品描述'}>
                        {
                            getFieldDecorator('desc', {
                                rules: [
                                    { required: true, message: '商品描述不能为空' }
                                ],
                                initialValue:desc
                            })(
                                <TextArea
                                    placeholder="请输入商品描述"
                                />
                            )
                        }
                    </Form.Item>
                    <Form.Item label={'商品价格'}>
                        {
                            getFieldDecorator('price', {
                                rules: [
                                    { required: true, message: '商品价格不能为空' }
                                ],
                                initialValue:price
                            })(
                                <Input
                                    type='number'
                                    placeholder="请输入商品价格"
                                    addonAfter='元'
                                    min={1}
                                />
                            )
                        }
                    </Form.Item>
                    <Form.Item label={'商品分类'}>
                        {
                            getFieldDecorator('category', {
                                rules: [
                                    { required: true, message: '商品分类不能为空' }
                                ],
                                initialValue:category
                            })(    //收集的是options的value值
                                <Cascader
                                    options={this.state.options}
                                    loadData={this.loadData}
                                    onChange={this.onChange}
                                    placeholder='请选择商品分类'
                                    changeOnSelect
                                />
                            )
                        }
                    </Form.Item>
                    <Form.Item label={'商品图片'}>
                        <PictureWall ref={this.imgs} imgs={imgs}/>
                    </Form.Item>
                    <Form.Item label={'商品详细描述'}>
                        <RichTextEditon ref={this.details} details={details} />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' onClick={this.handleSubmit}>提交</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
export default Form.create()(AddUpdata)