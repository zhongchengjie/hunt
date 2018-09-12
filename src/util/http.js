import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8809';
//axios.defaults.baseURL = 'http://120.79.129.124:8809';
axios.defaults.timeout = 5000;

 //添加一个请求拦截器
axios.interceptors.request.use(function(config){
  //console.log(config);
  //在请求发出之前 添加token验证
  const accessToken = localStorage.getItem("token");
  config.headers.common['Authorization'] = `Bearer ${accessToken}`;

  return config;
},function(err){
  //Do something with request error
  return Promise.reject(err);
});


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
      .then(response => {
        var result = response.data;
        if(result.status=="succ"){
          resolve(result);
        }
        else{
          console.log(`Error msg: ${result.msg}`);
          layer.msg(result.msg,{icon:7});
          reject(result.msg);
        }
      })
      .catch(err => {
        console.log(`Error occured when get '${url}', ${err}`);
        layer.msg('请求出错了，请稍候重试！',{icon:7});
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.post(url,data)
      .then(response => {
        var result = response.data;
        if(result.status=="succ"){
          resolve(result);
        }
        else{
          console.log(`Error msg: ${result.msg}`);
          layer.msg(result.msg,{icon:7});
          reject(result.msg);
        }
      },err => {
        console.log(`Error occured when post '${url}', ${err}`);
        layer.msg('请求出错了，请稍候重试！',{icon:7});
        reject(err)
      })
  })
}
