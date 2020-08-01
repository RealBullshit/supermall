import axios from 'axios'

export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: '不告诉你嘿嘿',
    timeout: 5000
  })

  //2.axios的拦截器
  //2.1.请求拦截的作用
  //拦截请求
  instance.interceptors.request.use(config => {
    return config//不能把config拦截下来，要返回出去
  }, error => {
    // console.log(error);
  })

  //2.2.响应拦截
  //拦截响应
  instance.interceptors.response.use(result => {
    // console.log(result);
    // 真正有用的 result.data
    return result.data
  }, error => {
    console.log(error);
  })

  //发送真正的网络请求
  return instance(config)//返回一个Promise
}

