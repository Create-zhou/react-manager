import ajax from'./ajax';
import jsonp from"jsonp";
import {message} from"antd"

//暴露请求登陆的接口函数
export const reqLogin = (userInfo) =>ajax('/Login',userInfo,"post")

//暴露请求添加分类信息的接口函数
export const reqAddCategory = (categoryInfo)=>ajax('/category/add',categoryInfo,'post')

//暴露请求所有的分类信息的接口函数  如果parentId是0，表示获取所有的一级分类 如果不是0，表示获取所有的二级分类
export const reqCategorys = parentId =>ajax('/category/list',{parentId})

//暴露请求所有修改之后的分类信息的接口函数  如果parentId是0，表示获取所有的一级分类 如果不是0，表示获取所有的二级分类
export const reqUpdataCategorys = categoryInfo =>ajax('/category/updata',categoryInfo,'post')

//请求删除后台图片的接口函数
export const reqDeleteimg = (name)=>ajax('/img/delete',{name},'post')

//请求添加商品的接口请求函数
export const reqAddProduct = productInfo=>ajax('/product/add',productInfo,'post')

//请求修改商品的接口请求函数
export const reqUptateProduct = productInfo=>ajax('/product/uptate',productInfo,'post')


//请求获取指定页码数和指定商品数据量的接口请求函数
export const reqProduct = (page,num)=>ajax('/product/list',{page,num})

//请求根据搜索的关键词以及不同的搜索类型的接口函数
export const reqSearchProduct = (page,num,keyWord,searchType)=>ajax('/product/Search',{
    page, //1
    num, //3
    [searchType]:keyWord
})

//请求分类的id查找分类信息的接口函数
export const reqCategoryInfo = categoryId=>ajax('/category/Info',{categoryId})

//请求添加角色信息的接口函数
export const reqAddRole = roleInfo=>ajax('/role/add',roleInfo,'post')

//请求所有的角色集合的接口函数
export const reqRoles = ()=>ajax('/role/list')

//请求单个角色的接口函数
export const reqRole = (roleId)=>ajax('/role/info',{roleId})


//请求修改角色信息的接口函数
export const reqUpdateRole = (roleInfo)=>ajax('/role/update',roleInfo,'post')

//请求添加用户信息的接口函数
export const reqAddUser = uesrInfo=>ajax('/user/add',uesrInfo,'post')

//请求所有的用户集合的接口函数
export const reqUsers = ()=>ajax('/user/list')

//请求修改用户信息的接口函数
export const reqUpdateUser = (userInfo)=>ajax('/user/update',userInfo,'post')


//请求删除用户信息的接口函数
export const reqDeleteUser = (userInfo)=>ajax('/user/delete',userInfo,'post')




//暴露请求天气信息的接口函数
export const prediction=(city)=>{
    const url = 'http://api.map.baidu.com/telematics/v3/weather?location='+city+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2&callback=__jp1'
    return new Promise(res=>{
        jsonp(url,{},function(err,data){
            if(data.status==="success"){
                data=data.results[0].weather_data[0]
                res(data)
            }else{
                message.error('无此城市')
                //res('非法的城市名')
            }
            
        })
    })
   
}