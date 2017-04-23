<template lang="html">
  <div class="ratings">
    <div class="mark">
      <div class="num">4.8</div>
      <div class="text">综合评分</div>
      <div class="contrast">高于周边商家89%</div>
    </div>
    <div class="star">
      434343434
    </div>
  </div>
</template>

<script>
const ERR_OK = 0
export default {
  data() {
    return {
      ratings: []
    }
  },
  created() {
    this.$http.get('/api/ratings').then((res) => {
      if (res.body.errno === ERR_OK) {
        this.ratings = res.body.data
      }
    })
  }
}
</script>

<style lang="scss">
.ratings {
    display: flex;
    .mark {
        flex: 0 0 120px;
        background: #ccc;
        text-align: center;
        border-right:1px solid rgba(7,17,27,0.2);
        .num {
            font-size: 24px;
            color: #f90;
            line-height: 28px;
        }
        .text {
            padding: 6px 0 8px;
            font-size: 12px;
            color: #07111b;
            line-height: 12px;
        }
        .contrast {
            font-size: 10px;
            color: #07111b;
            line-height: 10px;
            margin-bottom: 6px;
        }
    }
    .star {
        background: #f3f3f3;
        flex: 1;
    }
}
</style>
