<template>
  <div id="nav">
    <p v-for="(item, index) in routes" :key="index">
      <router-link :to="item.path">{{ item.name }}</router-link>
    </p>
  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      routes: [],
    };
  },
  created() {
    let routes = this.$router.options.routes;
    routes.map((item) => {
      item.path = item.path.replace(":name?", "parameter");
      item.path = item.path.replace(":post", "post");
      item.path = item.path.replace(":id?", "");
      item.path = item.path.replace(":cid", "123");
    });
    this.routes = routes;
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0 10px;
  }

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
