<template>
<div id="app">
  <v-header :seller=seller></v-header>
  <div class="tab border-1px">
    <div class="tab-item">
      <router-link :to="{path:'/goods',activeClass:'v-active'}">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link :to="{path:'/ratings'}">评论</router-link>
    </div>
    <div class="tab-item">
      <router-link :to="{path:'/seller'}">商家</router-link>
    </div>
  </div>
  <router-view :seller="seller"></router-view>
  </transition>
</div>
</template>

<script>
import vHeader from './components/header/header'
const ERR_OK = 0

export default {
  name: 'app',
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this.$http.get('/api/seller').then((res) => {
      if (res.body.errno === ERR_OK) {
        this.seller = res.body.data
      }
    })
  },
  components: {
    vHeader
  }
}
</script>

<style lang='scss'>
@import './common/style/app';
@import "./common/style/mixin";
.tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
    @include border-1px(rgba(7, 17, 27, 0.2));
    .tab-item {
        flex: 1;
        text-align: center;
        a {
            text-decoration: none;
            color: #333;
            display: block;
        }
        .v-active {
            color: #f01414;
        }
    }
}
</style>
