// import React from 'react'
// import { renderRoutes } from 'react-router-config'
import listPage from '../pages/list.js'
import detailPage from '../pages/detail'


// 路由配置
// export default {
//     // 默认选中路由
//     defaultSelectedKey: '/',
//     data: [
//         {
//             path: '/detail',
//             name: '审核',
//             routes: [
//                 {
//                     path: '/detail',
//                     name: '',
//                     component: () => import('../pages/detail')
//                 }
//             ]
//         },
//         {
//             path: '/list',
//             name: '审核列表',
//             routes: [
//                 {
//                     path: '/list',
//                     name: '',
//                     component: () => import('../pages/list')
//                 }
//             ]
//         }
//     ]
// }
const routes = [
    { 
        path: "/list",
        component: listPage,
        exact: true,
        key: 'list',
    },
    {
        path: "/detail",
        component: detailPage,
        exact: true,
        routes: [
            {
                path: "/page1/",
                component: listPage,
                exact: true,
                key: 'page1',
            }
        ],
        key: 'detail'
    }
];

export default routes
