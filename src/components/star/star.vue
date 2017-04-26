<template lang="html">
  <div class="star" :class="starType">
    <span class="star-item" :class="v" v-for="(v,index) in starMap"></span>
  </div>
</template>
<script>
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size
    },
    starMap() {
      let starArr = []
      let starLen = 5
      let totalScore = this.score + ''
      let foo = totalScore.split('.')
      for (let i = 0; i < parseInt(foo[0]); i++) {
        starArr.push(CLS_ON)
      }
      if (foo[1] && parseInt(foo[1]) >= 5) {
        starArr.push(CLS_HALF)
        starLen = 4
      }
      for (let j = 0; j < starLen - parseInt(foo[0]); j++) {
        starArr.push(CLS_OFF)
      }
      return starArr
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/mixin';
.star {
    &.star-48 {
        .star-item {
            display: inline-block;
            height: 24px;
            width: 24px;
            margin-left: 12px;
            &:first-child {
                margin-left: 0;
            }
            &.on {
                @include bg-image( 'img/star48_on',24px,24px);
            }
            &.half {
                @include bg-image( 'img/star48_half',24px,24px);
            }
            &.off {
                @include bg-image( 'img/star48_off',24px,24px);
            }
        }
    }
    &.star-36 {
        .star-item {
            display: inline-block;
            height: 18px;
            width: 18px;
            margin-left: 12px;
            &:first-child {
                margin-left: 0;
            }
            &.on {
                @include bg-image( 'img/star36_on',18px,18px);
            }
            &.half {
                @include bg-image( 'img/star36_half',18px,18px);
            }
            &.off {
                @include bg-image( 'img/star36_off',18px,18px);
            }
        }
    }
    &.star-24 {
        .star-item {
            display: inline-block;
            height: 12px;
            width: 12px;
            margin-left: 6;
            &:first-child {
                margin-left: 0;
            }
            &.on {
                @include bg-image( 'img/star24_on',12px,12px);
            }
            &.half {
                @include bg-image( 'img/star24_half',12px,12px);
            }
            &.off {
                @include bg-image( 'img/star24_off',12px,12px);
            }
        }
    }
}
</style>
