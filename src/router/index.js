import { createRouter, createWebHistory } from "vue-router";
import _ from "lodash";
// var _ = require('lodash')
// import Home from '../views/home.vue'

/*
router: {
  // 基本路由
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
}
 */

const relativePath = require.context("../views", true, /\.vue$/).keys();

const routerArr = [];
relativePath.forEach((item) => {
  // 去除后缀
  item = item.replace(".vue", "");
  // 根据
  let paths = item.match(/[a-zA-Z0-9]+/g); // paths中存储了一个目录、二级目录、*目录
  paths = paths.map((item) => _.lowerFirst(item));

  let path = paths.join("/");
  path = "/" + path;

  let name = paths.map((item) => _.upperFirst(item));
  name = name.join("");

  const routerChild = {
    path,
    name,
    component: () => import(`../views${path}.vue`),
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
