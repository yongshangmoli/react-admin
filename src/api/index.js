import ajax from './request';
import jsonp from 'jsonp';

export const reqLogin = (username, password) =>
  ajax('/login', { username, password }, 'POST');

export const reqWeather = (city) => {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p4 9MVra6urFRGOT9s8UBWr`;
  return new Promise((resolve, reject) => {
    jsonp(
      url,
      {
        param: 'callback',
      },
      (error, res) => {
        if (!error && res.status === 'success') {
          const { dayPictureUrl, weather } = res.results[0].weather_data[0];
          resolve({ dayPictureUrl, weather });
        } else {
          alert('获取天气信息失败');
          reject(error);
        }
      }
    );
  });
};

export const reqCategorys = (parentId) =>
  ajax('/manage/category/list', { parentId });

export const reqAddCategory = (categoryName, parentId) =>
  ajax('/manage/category/add', { parentId, categoryName }, 'POST');

export const reqUpdateCategory = ({ categoryId, categoryName }) =>
  ajax('/manage/category/update', { categoryId, categoryName }, 'POST');
