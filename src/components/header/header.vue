<template lang="html">
  <div class="header">
    <div class="content-warpper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="discription">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" @click="showDetail">
        <span class="count">5个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text"  @click="showDetail">
        {{seller.bulletin}}
      </span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="backgound-bg">
      <img :src="seller.avatar" height="100%" width="100%">
    </div>

    <!-- seller-detail -->
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">粥品香坊（回龙观）</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports">
            <li class="support-item" v-for="(v,i) in seller.supports">
              <span class="icon" :class="classMap[v.type]"></span>
              <span class="text">{{v.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line">
            </div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="showDetail()"><i class="icon-close"></i></div>
    </div>
  </div>
</template>

<script>
import star from '../star/star'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = !this.detailShow
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    star
  }
}
</script>

<style lang="scss">
@import '../../common/style/mixin';
.header {
    position: relative;
    background-color: rgba(7, 17, 27, 0.5);
    /*height: 120px;*/
    color: #fff;
    .content-warpper {
        position: relative;
        font-size: 0;
        padding: 24px 16px 18px 24px;
        .avatar {
            display: inline-block;
            border-radius: 2px;
            vertical-align: top;
        }
        .content {
            display: inline-block;
            margin-left: 16px;
            .title {
                margin: 2px 0 8px;
                .brand {
                    width: 30px;
                    height: 18px;
                    display: inline-block;
                    background-repeat: no-repeat;
                    @include bg-image( 'brand', 30px, 18px);
                }
            }
            .name {
                vertical-align: top;
                font-size: 16px;
                margin-left: 6px;
                line-height: 18px;
                font-weight: 200px;
            }
            .discription {
                font-size: 12px;
                margin-bottom: 10px;
            }
            .support {
                font-size: 12px;
                .icon {
                    display: inline-block;
                    vertical-align: top;
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                    background-repeat: no-repeat;
                    &.decrease {
                        @include bg-image( 'decrease_1',12px,12px);
                    }
                    &.discount {
                        @include bg-image( 'discount_1',12px,12px);
                    }
                    &.special {
                        @include bg-image( 'special_1',12px,12px);
                    }
                    &.invoice {
                        @include bg-image( 'invoice_1',12px,12px);
                    }
                    &.guarantee {
                        @include bg-image( 'guarantee_1',12px,12px);
                    }
                }
            }
        }
        .support-count {
            position: absolute;
            right: 12px;
            bottom: 18px;
            padding: 0 8px;
            height: 24px;
            line-height: 24px;
            border-radius: 14px;
            background-color: rgba(0,0,0,.2);
            text-align: center;
            .count {
                vertical-align: top;
                font-size: 10px;
            }
            .icon-keyboard_arrow_right {
                font-size: 10px;
                margin-left: 2px;
                line-height: 24px;
            }
        }
    }

    .bulletin-wrapper {
        position: relative;
        height: 28px;
        line-height: 28px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        padding: 0 22px 0 12px;
        background: rgba(7,17,27,.2);
        .bulletin-title {
            display: inline-block;
            vertical-align: top;
            margin-top: 8px;
            width: 22px;
            height: 12px;
            @include bg-image( 'bulletin',20px,12px);
            background-repeat: no-repeat;
        }
        .bulletin-text {
            font-size: 10px;
            vertical-align: middle;
            margin: 0 4px;
        }
        .icon-keyboard_arrow_right {
            position: absolute;
            font-size: 10px;
            right: 12px;
            top: 8px;
        }
    }
    .backgound-bg {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: -1;
        filter: blur(10px);
    }
    .detail {
        position: fixed;
        height: 100%;
        width: 100%;
        background: rgba(7,17,27,.8);
        z-index: 100;
        top: 0;
        left: 0;
        overflow: auto;
        .detail-wrapper {
            min-height: 100%;
            width: 100%;
        }
        .detail-close {
            position: relative;
            width: 32px;
            height: 32px;
            margin: -64px auto 0;
            clear: both;
            font-size: 32px;
        }
        .detail-main {
            margin-top: 64px;
            padding-bottom: 64px;
            .name {
                font-size: 16px;
                font-weight: 700;
                width: 100%;
                color: #fff;
                line-height: 16px;
                text-align: center;
            }
            .star-wrapper {
                width: 100%;
                text-align: center;
                margin-top: 16px;
                margin-bottom: 25px;
            }
        }
        .title {
            display: flex;
            width: 80%;
            margin: 20px auto 24px;
            .line {
                flex: 1;
                height: 1px;
                display: inline-block;
                background: hsla(0,0%,100%,.2);
                margin: auto;
            }
            .text {
                padding: 0 12px;
                font-size: 14px;
                font-weight: 700;
            }
        }
        .supports {
            padding: 0 0 0 36px;
            .support-item {
                color: #fff;
                padding: 0 6px 12px 16px;
                .text {
                    vertical-align: middle;
                    font-size: 12px;
                    font-weight: 200;
                    color: #fff;
                    line-height: 12px;
                }
                .icon {
                    display: inline-block;
                    vertical-align: middle;
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                    background-repeat: no-repeat;
                    &.decrease {
                        @include bg-image( 'decrease_1',12px,12px);
                    }
                    &.discount {
                        @include bg-image( 'discount_1',12px,12px);
                    }
                    &.special {
                        @include bg-image( 'special_1',12px,12px);
                    }
                    &.invoice {
                        @include bg-image( 'invoice_1',12px,12px);
                    }
                    &.guarantee {
                        @include bg-image( 'guarantee_1',12px,12px);
                    }
                }
            }

        }
        .bulletin {
            padding: 0 48px;
            font-size: 12px;
            font-weight: 200;
            color: #fff;
            line-height: 24px;
            .content {
                line-height: 24px;
                font-size: 12px;
            }
        }
    }

}
</style>
