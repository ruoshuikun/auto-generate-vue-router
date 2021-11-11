import { createRouter, createWebHistory } from "vue-router";
import _ from "lodash";
// var _ = require('lodash')
// import Home from '../views/home.vue'

/*
router: {
  // 基本路由
  // 文件树如下：
  pages/
  --| user/
  -----| index.vue
  -----| one.vue
  --| index.vue
  会自动生成：
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
  // 动态路由
  // 文件树如下：
  pages/
  --| _slug/
  -----| comments.vue
  -----| index.vue
  --| user/
  -----| _id.vue
  --| index.vue
  会自动生成：
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
 */

const relativePath = require.context("../views", true, /\.vue$/).keys();

const routerArr = [];
relativePath.forEach((item) => {
  let path, name, component;
  // 去除后缀
  item = item.replace(".vue", "");
  // 根据
  let pathArr = item.match(/[_a-zA-Z0-9]+/g); // pathArr中存储了一个目录、二级目录、*目录

  // 全部转化为小写
  pathArr = pathArr.map((item) => _.lowerFirst(item));

  path = pathArr.join("/");
  path = "/" + path;
  // 如果包含_，就是动态的路由。把 _ 替换为 :
  if (path.includes("_")) {
    path = path.replace("_", ":");
  }

  name = pathArr.map((item) => item.replace("_", ""));
  name = name.join("-");

  component = pathArr.join("/");

  const routerChild = {
    path,
    name,
    component: () => import(`../views/${component}.vue`),
  };
  routerArr.push(routerChild);
});

console.info("routerArr", routerArr);

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  ...routerArr,
  // error 异常处理
  {
    path: "/404",
    component: () => import("@/views/error/404"),
    hidden: true,
  },
  // 404 page must be placed at the end !!!
  { path: "/:pathMatch(.*)", redirect: "/404", hidden: true },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
