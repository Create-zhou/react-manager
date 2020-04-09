/*
  这个文件来封装axios  同一'get'以及‘post'格式
*/
import axios from 'axios'

//设置axios响应数据的统一格式
axios.interceptors.response.use(res=>res.data)


//暴露一个名字是axios的函数
export default function ajax(url, data = {}, method = 'get') {
    /*
      url请求地址
      data请求数据 默认为空
      method 请求方式 默认是“get"    
    */
    return new Promise(resolve => {
        let p = null
        if (method === 'get') {
         p = axios.get(url, {
                params: data
            })
        } else {
            p = axios.post(url, data)
        }
        p.then(res => {
          resolve(res)
        })
    })
}

