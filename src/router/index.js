import { createRouter, createWebHistory } from "vue-router";
// eslint-disable-next-line no-unused-vars
import _ from "lodash";
// import Home from '../views/home.vue'

const relativePath = require.context("../views", true, /\.vue$/).keys();
// console.info("relativePath", relativePath);

const routerArr = [];
relativePath.forEach((item) => {
  let path = [],
    name = [],
    component;
  // 去除后缀
  item = item.replace(".vue", "");

  /*
    \[\w+\$] 匹配 [id$]
    \[\w+] 匹配 [id]
    \w+ 匹配 users
   */
  let pathArr = item.match(/\[\w+\$]|\[\w+]|\w+/g); // pathArr中存储了一个目录、二级目录、*目录
  // 全部转化为小写
  // pathArr = pathArr.map((item) => _.lowerFirst(item));

  pathArr.map((pathArrItem) => {
    let pathItem, nameItem;
    if (pathArrItem.startsWith("[") && pathArrItem.endsWith("$]")) {
      pathItem = pathArrItem.replace("[", ":").replace("$]", "?");
      nameItem = pathArrItem.replace("[", "").replace("$]", "");
    } else if (pathArrItem.startsWith("[") && pathArrItem.endsWith("]")) {
      pathItem = pathArrItem.replace("[", ":").replace("]", "");
      nameItem = pathArrItem.replace("[", "").replace("]", "");
    } else {
      pathItem = pathArrItem;
      nameItem = pathArrItem;
    }
    path.push(pathItem);
    name.push(nameItem);
  });

  component = pathArr.join("/");

  const routerChild = {
    path: `/${path.join("/")}`,
    name: name.join("-"),
    component: () => import(`../views/${component}.vue`),
  };
  routerArr.push(routerChild);
});

// console.info("routerArr", routerArr);

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  ...routerArr,
  // error 异常处理
  // {
  //   path: "/404",
  //   component: () => import("@/views/error/404"),
  //   hidden: true,
  // },
  // 404 page must be placed at the end !!!
  // { path: "/:pathMatch(.*)", redirect: "/404", hidden: true },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
