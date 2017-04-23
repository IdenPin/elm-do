<template lang="html">
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive" :class="{'active':selectType === 2}">{{desc.all}}</span>
      <span class="block positive" :class="{'active':selectType === 0}">{{desc.positive}}</span>
      <span class="block negative" :class="{'active':selectType === 1}">{{desc.negative}}</span>
    </div>
    <div class="switch">
      <span class="icon-check_circle"></span>
      <span>只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../common/style/mixin";

.ratingselect {
    .rating-type {
        padding: 18px 0;
        margin: 0 18px;
        position: relative;
        font-size: 0;
        @include border-1px(rgba(7,17,27,.2));
        .block {
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            line-height: 16px;
            border-radius: 1px;
            font-size: 12px;
            color: #4d555d;
            &.positive {
                background-color: rgba(0,160,220,.2);
            }
            &.negative {
                background-color: rgba(77,85,92,.2);
            }
            &.active {
                color: #fff;
                background-color: rgb(0, 160, 220);
            }
            .count {
                margin-left: 2px;
                font-size: 8px;
            }
        }
    }
}
</style>
