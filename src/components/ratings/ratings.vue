<template lang="html">
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家89%</div>
        </div>
        <div class="overview-right">
          <div class="rate-li">
            <div class="right-label">服务态度</div>
            <star :size="24" :score="seller.score"></star>
            <span class="text">{{seller.score}}</span>
          </div>
          <div class="rate-li">
            <div class="right-label">服务态度</div>
            <star :size="24" :score="seller.foodScore"></star>
            <span class="text">{{seller.score}}</span>
          </div>
          <div class="rate-li">
            <div class="right-label">
              送达时间
            </div>
            <div class="delivery-time">
              {{seller.deliveryTime}}分钟
            </div>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect
        @select="selectRating"
        @toggle="toggleContent"
        :ratings="ratings"
        :select-type="selectType"
        :only-content="onlyContent">
    </ratingselect>
    <div class="rating-wrapper"  ref="ratings">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <!-- <star :size="24" :score="rating.score"></star> -->
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import split from '../split/split'
import {
  formatDate
} from '../../common/js/date'
import ratingselect from '../ratingselect/ratingselect'
import star from '../star/star'

const ALL = 2
const ERR_OK = 0

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true
    }
  },
  methods: {
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
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
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  created() {
    this.$http.get('/api/ratings').then((res) => {
      res = res.body
      if (res.errno === ERR_OK) {
        this.ratings = res.data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      }
    })
  },
  components: {
    split,
    ratingselect,
    star
  }
}
</script>

<style lang="scss">
@import "../../common/style/mixin";

.ratings {
    .overview {
        display: flex;
        padding: 18px 0;
        .overview-left {
            flex: 0 0 130px;
            padding: 6px 0;
            width: 130px;
            border-right: 1px solid rgba(7, 17, 27, 0.1);
            text-align: center;
            .score {
                margin-bottom: 6px;
                line-height: 28px;
                font-size: 24px;
                color: #f90;
            }
            .title {
                margin-bottom: 8px;
                line-height: 12px;
                font-size: 12px;
                color: #07111b;
            }
            .rank {
                line-height: 10px;
                font-size: 10px;
                color: #93999f;
            }
        }
        .overview-right {
            flex: 1;
            padding: 8px 0 6px 18px;
            .rate-li {
                position: relative;
                display: flex;
                font-size: 12px;
                margin-bottom: 12px;
                &:last-child {
                    margin-bottom: 0;
                }
                .right-label {
                    flex: 0 0 56px;
                    width: 56px;
                }
                .delivery-time,
                .star {
                    position: absolute;
                    left: 55px;
                    top: -1px;
                    flex: 1;
                    line-height: 10px;
                    color: #93999f;
                }
                .delivery-time {
                    top: 0;
                }
                .text {
                    color: #f90;
                    position: absolute;
                    left: 135px;
                }
            }
        }
    }

    .rating-wrapper {
        padding: 0 18px;
        .rating-item {
            display: flex;
            padding: 18px 0;
            @include border-1px(rgba(7, 17, 27, 0.1));
            .avatar {
                flex: 0 0 28px;
                width: 28px;
                margin-right: 12px;
                img {
                    border-radius: 50%;
                }
            }
            .content {
                position: relative;
                flex: 1;
                .name {
                    margin-bottom: 4px;
                    line-height: 12px;
                    font-size: 10px;
                    color: #07111b;
                }
                .star-wrapper {
                    margin-bottom: 6px;
                    font-size: 0;
                    .star {
                        display: inline-block;
                        margin-right: 6px;
                        vertical-align: top;
                    }
                    .delivery {
                        display: inline-block;
                        vertical-align: top;
                        line-height: 12px;
                        font-size: 10px;
                        color: #93999f;
                    }
                }
                .text {
                    margin-bottom: 8px;
                    line-height: 18px;
                    color: #07111b;
                    font-size: 12px;
                }
                .recommend {
                    line-height: 16px;
                    font-size: 0;
                    .icon-thumb_up {
                        color: #00a0dc;
                    }
                    .item {
                        padding: 0 6px;
                        border: 1px solid rgba(7, 17, 27, 0.1);
                        border-radius: 1px;
                        color: #93999f;
                        background: #fff;
                        display: inline-block;
                        margin: 0 8px 4px 0;
                        font-size: 9px;
                    }
                }
                .time {
                    position: absolute;
                    top: 0;
                    right: 0;
                    line-height: 12px;
                    font-size: 10px;
                    color: #93999f;
                }
            }
        }
    }
}
</style>
