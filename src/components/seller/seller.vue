<template lang="html">
  <div class="seller">
    <div class="seller-wrapper">
      <div class="seller-info border-1px">
        <div class="name-and-star">
          <h1 class="name">{{seller.name}}</h1>
          <div class="wrapper">
            <star :size="36" :score="seller.score"></star>({{seller.ratingCount}})
            <span class="sell-count">月售{{seller.sellCount}}单</span>
          </div>
        </div>
        <div class="collect" @click="addCollect">
          <span class="icon-favorite" :class="{'active':collectToggle}"></span>
          <span class="text">收藏</span>
        </div>
      </div>
      <div class="seller-delivery">
        <div class="itme">
          <div class="text">起送价</div>
            <span class="unit">{{seller.minPrice}}<span class="pre">元</span></span>
        </div>
        <div class="itme">
            <div class="text">商家配送</div>
            <span class="unit">{{seller.deliveryPrice}}<span class="pre">元</span></span>
        </div>
        <div class="itme">
            <div class="text">平均配送时间</div>
            <span class="unit">{{seller.deliveryTime}}<span class="pre">分钟</span></span>
        </div>
      </div>
    </div>
  <split></split>
  <div class="seller-com seller-bulletins">
    <h1 class="title">公告与活动</h1>
    <div class="content">
      <div class="warm-tip">
        {{seller.bulletin}}
      </div>
      <ul class="activity-type">
        <li v-for="(v,index) in seller.supports" class="border-1px">
          <span class="icon" :class="classMap[v.type]"></span>
          <span class="text">{{v.description}}</span>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
import split from '../split/split'
import star from '../star/star'
const ERR_OK = 0

export default {
  data() {
    return {
      seller: {},
      collectToggle: false
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/seller').then((res) => {
      if (res.body.errno === ERR_OK) {
        this.seller = res.body.data
      }
    })
  },
  methods: {
    addCollect() {
      this.collectToggle = !this.collectToggle
    }
  },
  components: {
    split,
    star
  }
}
</script>

<style lang="scss">
@import "../../common/style/mixin";
.seller {
    .seller-wrapper {
        padding: 18px;
        .seller-info {
            display: flex;
            @include border-1px(rgba(7, 17, 27, 0.1));
            .name-and-star {
                flex: 1;
                .name {
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 14px;
                    color: rgb(7, 17, 27);
                }
                .wrapper {
                    margin-top: 8px;
                    margin-bottom: 15px;
                    color: rgb(77, 85, 93);
                    font-size: 10px;
                    .star {
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 8px;
                        .star-item {
                            margin-left: 3px;
                        }
                    }
                    .sell-count {}
                }
            }
            .collect {
                flex: 0 0 30px;
                width: 30px;
                text-align: center;
                .icon-favorite {
                    font-size: 24px;
                    line-height: 24px;
                    color: #d4d6d9;
                    &.active {
                        color: #f01414;
                    }
                }
                .text {
                    margin-top: 4px;
                    display: block;
                    font-size: 10px;
                }
            }
        }
        .seller-delivery {
            display: flex;
            margin-top: 18px;
            .itme {
                flex: 1;
                text-align: center;
                border-right: 1px solid rgba(7, 17, 27, .1);
                &:last-child {
                    border-right: none;
                }
                .text {
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                    line-height: 20px;
                    margin-bottom: 4px;
                }
                .unit {
                    font-size: 24px;
                    line-height: 24px;
                    font-weight: 200;
                    color: rgb(7, 17, 27);
                    .pre {
                        font-size: 12px;
                    }
                }
            }
        }
    }
    .seller-bulletins {
        .warm-tip {
            font-size: 12px;
            font-weight: 200px;
            color: rgb(240, 20, 20);
            line-height: 24px;
        }
        .activity-type {
            li {
                @include border-1px(rgba(7, 17, 27, 0.1));
                padding: 16px 11px;
                height: 16px;
                .text {
                    font-size: 12px;
                    font-weight: 200;
                    color: rgb(7,17,27);
                }
                .icon {
                    display: inline-block;
                    vertical-align: middle;
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                    background-repeat: no-repeat;
                    &.decrease {
                        @include bg-image( 'decrease_4',12px,12px);
                    }
                    &.discount {
                        @include bg-image( 'discount_4',12px,12px);
                    }
                    &.special {
                        @include bg-image( 'special_4',12px,12px);
                    }
                    &.invoice {
                        @include bg-image( 'invoice_4',12px,12px);
                    }
                    &.guarantee {
                        @include bg-image( 'guarantee_4',12px,12px);
                    }
                }
                &:last-child {
                    @include border-none();
                }
            }
        }
    }

    /*seller 公用*/
    .seller-com {
        padding: 18px;
        .title {
            font-size: 14px;
            font-weight: 500;
            line-height: 14px;
            color: rgb(7, 17, 27);
            margin-bottom: 8px;
        }
    }
}
</style>
