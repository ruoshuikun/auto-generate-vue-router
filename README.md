# auto-generate-vue-router

## router采用约定式路由
### 动态路由
约定 `[]` 包裹的文件或文件夹为动态路由。

比如：

- `src/views/users/[id].vue` 会成为 `/users/:id`
- `src/views/users/[id]/settings.vue` 会成为 `/users/:id/settings`

比如文件结构如下：

```bash
.
  └── views
    └── [post]
      ├── index.vue
      └── comments.vue
    └── users
      └── [id].vue
    └── index.vue
```

会生成路由配置如下：

```javascript

```



## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

