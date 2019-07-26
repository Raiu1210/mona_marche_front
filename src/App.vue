<template>
  <div id="app">
    <div id="nav">
      <nav>
        <ul>
          <router-link tag="li" to="/" exact><a>ホーム</a></router-link>
          <router-link tag="li" to="/goods_list"><a>商品一覧</a></router-link>
          <router-link tag="li" to="/display_goods"><a>出品する</a></router-link>
          <router-link tag="li" to="/manage_display"><a>出品管理</a></router-link>
        </ul>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Methods from '@/api/methods'

export default {
  data() {
    return {
      goods_list: null
    }
  },
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 0px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

nav {
  background-color: #eef118;
}
ul > li {
  display: inline-block;
  margin: 0;
  padding: 0;
  width: 100px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
ul > li > a {
  display: block;
  text-decoration: none;
  color: #fff;
  transition: all .3s ease-in-out;
}
.router-link-active > a,
ul > li > a:hover {
  background-color: #fff;
  color: #4fc08d;
}
</style>
