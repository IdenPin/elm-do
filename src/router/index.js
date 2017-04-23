import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
// http://vuejssellapp.t.imooc.io/#!/goods
// https://simonzhangiter.github.io/VueDemo_Sell_Eleme/#/goods
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: App,
      component: App,
      redirect: '/goods'
    }, {
      path: '/goods',
      name: 'Goods',
      component: Goods
    }, {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    }, {
      path: '/seller',
      name: 'Seller',
      component: Seller
    }
  ],
  // 设置a标签高亮的active
  linkActiveClass: 'v-active'
})
