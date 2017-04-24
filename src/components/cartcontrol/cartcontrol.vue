<template lang="html">
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
      <transition name="move">
        <span class="inner icon-remove_circle_outline"></span>
      </transition>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return false
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
        this.food.count = 1
      } else {
        Vue.set(this.food, 'count', 1)
        this.food.count++
      }
      this.$emit('add', event.target)
    },
    decreaseCart() {
      if (!event._constructed) {
        return false
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="scss">
.cartcontrol {
    font-size: 0;
    .cart-add,
    .cart-decrease {
        display: inline-block;
        padding: 6px;
        transition: all 0.4s linear;
        opacity: 1;
        &.move-enter-active,
        &.move-leave-active {
            transition: all 0.4s linear;
        }
        &.move-enter,
        &.move-leave-active {
            opacity: 0;
            transform: translate3d(24px, 0, 0);
        }
        .inner {
            line-height: 24px;
            font-size: 24px;
            color: #00a0dc;
            transition: all 0.4s linear;
            &.inner-enter-active,
            &.inner-leave-active {
                transition: all 0.4s linear;
                transform: rotate(0);
            }
            &.inner-enter,
            &.inner-leave-active {
                opacity: 0 transform rotate(180deg);
            }
        }
    }
    .cart-count {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        padding-top: 6px;
        line-height: 24px;
        text-align: center;
        font-size: 10px;
        color: #93999f;
    }
    .cart-add {
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: #00a0dc;
    }
}
</style>
