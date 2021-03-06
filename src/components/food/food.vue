<template lang="html">
  <transition name="fade">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">
            {{food.name}}
          </h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">¥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol @add="addFood" :food="food"></cartcontrol>
          </div>
          <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst($event)">
            加入购物车
          </div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">
            {{food.info}}
          </p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect
            @select = "selectRating"
            @toggle = "toggleContent"
            :ratings="food.ratings"
            :select-type="selectType"
            :only-content="onlyContent"
            :desc="desc">
          </ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img :src="rating.avatar" height="12" width="12">
                  </div>
                  <div class="time">
                    {{rating.rateTime | formatDate}}
                  </div>
                  <p class="text">
                    <span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}">{{rating.text}}</span>
                  </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
  </div>
  </transition>
</template>

<script>
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import split from '../split/split'
  import ratingselect from '../ratingselect/ratingselect'
  import {formatDate} from '../../common/js/date'
  // const POSITIVE = 0
  // const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show() {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = true

        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      addFood(target) {
        this.$emit('add', target)
      },
      hide() {
        this.showFlag = false
      },
      addFirst(event) {
        if (!event._constructed) {
          return false
        }
        Vue.set(this.food, 'count', 1)
      },
      selectRating(type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>

<style lang="scss">
  .food {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 48px;
    z-index: 30;
    background: #fff;
    &.fade-enter-active,
    &.fade-leave-active {
      transition: all .2s linear;
      transform: translate3d(0, 0, 0);
    }
    &.fade-enter,
    &.fade-leave-active {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
    .image-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
      }
      .back {
        position: absolute;
        top: 5px;
        left: 0;
        .icon-arrow_lift {
          display: block;
          padding: 10px;
          color: #fff;
          font-size: 20px;
        }
      }
    }
    .content {
      padding: 18px;
      position: relative;
      .title {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: #07111b;
      }
      .detail {
        margin-bottom: 18px;
        line-height: 10px;
        height: 10px;
        font-size: 0;
        .sell-count,
        .rating {
          font-size: 10px;
          color: #93999f;
        }
        .rating {
          padding-top: 18px;
        }
        .sell-count {
          margin-right: 12px;
        }
      }
      .price {
        font-weight: 700;
        line-height: 24px;
        .now {
          margin-right: 8px;
          font-size: 14px;
          color: #f01414;
        }
        .old {
          text-decoration: line-through;
          font-size: 10px;
          color: #93999f;
        }
      }
      .cartcontrol-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
      }
      .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        box-sizing: border-box;
        border-radius: 12px;
        font-size: 10px;
        color: #fff;
        background: #00a0dc;
      }
    }
    .info {
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: #07111b;
      }
      .text {
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
        color: #4d555d;
      }
    }
    .rating {
      padding-top: 18px;
      .title {
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: #07111b;
      }
      .rating-wrapper {
        padding: 0 18px;
        .rating-item {
          position: relative;
          padding: 16px 0;
          position: relative;
          .user {
            position: absolute;
            right: 0;
            top: 16px;
            line-height: 12px;
            font-size: 0;
          }
          .time {
            margin-bottom: 6px;
            line-height: 12px;
            font-size: 10px;
            color: #93999f;
          }
          .text {
            line-height: 16px;
            font-size: 12px;
            color: #07111b;
            .icon-thumb_up {
              color: #00a0dc;
            }
            .icon-thumb_down {
              color: #93999f;
            }
          }
        }
        .no-rating {
          padding: 16px 0;
          font-size: 12px;
          color: #93999f;
          margin-bottom: 50px;
        }
      }
    }
  }
</style>
