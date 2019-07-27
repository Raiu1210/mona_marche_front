import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/goods_list',
      name: 'goods_list',
      component: () => import('./views/Goods_list.vue')
    },
    {
      path: '/goods_list/:id',
      // name: 'goods_list',
      component: () => import('./views/Goods.vue'),
      props: route => ({
        id: Number(route.params.id)
      })
    },
    {
      path: '/display_goods',
      name: 'display_goods',
      component: () => import('./views/Display_goods.vue')
    },
    {
      path: '/manage_display',
      name: 'manage_display',
      component: () => import('./views/Manage_display.vue')
    },
  ]
})
