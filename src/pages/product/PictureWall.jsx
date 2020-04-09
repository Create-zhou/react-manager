import React, { Component } from 'react'
import { Upload, Icon, Modal, message } from 'antd';
import {reqDeleteimg} from '../../api/index'
import {BASE_URL}from '../../utils/constants'

export default class PictureWall extends Component {
 constructor(props){
   super(props)

   const {imgs} = this.props   //如果是添加页面 是undefined 如果是修改页面 imgs是数组
   console.log(imgs)
   let fileList=[]
   if(imgs){   //如果是修改页面
    fileList = imgs.map((item,index)=>({
             uid:-index,
             name:item,
             status:'done',
             url:BASE_URL + item 
       }))
   }
   this.state = {
    previewVisible: false,  //是否在预览图片
    previewImage: '',  //预览图片的路径
    fileList //图片存放的路径
  }
 }

    //根据filelist 生成图片名字组成的数据
    getImgs=()=>this.state.fileList.map(item=>item.name)

      //在一定的时间内监听图片的上传进度   如果file对象的status值是done uploading表示上传中
    handleChange = async({file, fileList }) =>{ 
        //file跟fileList不是用一个数据，虽然这两个返回的结果一直，
        //但是我们需要的是fileList的数据
     
        //上传图片成功后，给本次上传的图片添加url属性 修改name
          if(file.status==='done'){   //图片上传完成
              
                file = fileList[fileList.length-1]
                const {status,data,msg} = file.response
                message.success(msg)

                file.name = data.name
                file.url = data.url
          }else if(file.status==='removed'){  //删除后台图片
               const result = await reqDeleteimg(file.name)
               const {msg} = result
               message.success(msg)
          }
          this.setState({ 
            fileList 
        });
        }

    //点击叉号时接触该函数
    handleCancel = () => this.setState({ previewVisible: false });


    //监听图片预览时触发该函数
    handlePreview = async file => {

        //当图片上传完成后 添加url属性 修改name
      this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
      });
    };



    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        console.log(this.props.imgs)
        const uploadButton = (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        );
        return (
          <div className="clearfix">
            <Upload
              action="/img/uploads"
              listType="picture-card"
              fileList={fileList}
              name='image'
              accept='image/*'  //接受上传文件的类型  png 和jpg  jpeg webp  image/*表示接受所有的图片类型
             onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton} 
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        );
      }
    }
    
