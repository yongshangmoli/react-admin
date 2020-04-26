import axios from 'axios';
import { message } from 'antd';

export default function ajax(url, data = {}, method = 'GET') {
  return new Promise(function (resolve, reject) {
    let promise;
    if (method === 'GET') {
      promise = axios.get(url, { params: data });
    } else {
      promise = axios.post(url, data);
    }
    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => {
        message.error('请求错误: ' + e.message);
      });
  });
}
