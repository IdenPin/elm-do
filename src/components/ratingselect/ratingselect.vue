<template lang="html">
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive"
            @click="select(2,$event)"
            :class="{'active':selectType === 2}">
            {{desc.all}}
            <span class="count">{{ratings.length}}</span>
          </span>
      <span class="block positive"
            @click="select(0,$event)"
            :class="{'active':selectType === 0}">
            {{desc.positive}}
            <span class="count">{{positive.length}}</span>
          </span>
      <span class="block negative"
            @click="select(1,$event)"
            :class="{'active':selectType === 1}">
            {{desc.negative}}
            <span class="count">{{negative.length}}</span>
          </span>
    </div>
    <div class="switch" @click="toggleContent($event)">
      <span class="icon-check_circle" :class="{'on':onlyContent}"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0
  const NEGATIVE = 1
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
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return false
        }
        this.$emit('select', type)
      },
      toggleContent(event) {
        if (!event._constructed) {
          return false
        }
        this.$emit('toggle')
      }
    },
    computed: {
      positive() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negative() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
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
      @include border-1px(rgba(7, 17, 27, .2));
      .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        line-height: 16px;
        border-radius: 1px;
        font-size: 12px;
        color: #4d555d;
        &.positive {
          background-color: rgba(0, 160, 220, .2);
        }
        &.negative {
          background-color: rgba(77, 85, 92, .2);
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
    .switch {
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, .1);
      color: rgb(147, 153, 159);
      font-size: 0;
      .icon-check_circle {
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
        &.on {
          color: #00c850;
        }
      }
      .text {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
      }
    }
  }
</style>
