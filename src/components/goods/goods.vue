<template lang="html">
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(v,index) in goods" class="menu-item" :class="{'current':currentIndex==index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-if="v.type>0" class="icon"></span>
            {{v.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foots-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(v,i) in goods" class="food-list food-list-hook">
          <h1 class="title">{{v.name}}</h1>
          <ul>
            <li v-for="food in v.foods" class="food-item border-1px" @click="selectFood(food,$event)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food'
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods() {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created() {
    this.$http.get('/api/goods').then((res) => {
      if (res.body.errno === ERR_OK) {
        this.goods = res.body.data
        this.$nextTick(() => {
          this.initScroll()
          this.calculateHeight()
        })
      }
    })
  },
  methods: {
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return false
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return false
      }
      this.selectedFood = food
      this.$refs.food.show()
    }
  },
  components: {
    shopcart,
    cartcontrol,
    food
  }
}
</script>

<style lang="scss">
@import "../../common/style/mixin";
.goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
        .menu-item {
            position: relative;
            display: table;
            height: 54px;
            line-height: 14px;
            width: 56px;
            padding: 0 12px;
            .text {
                display: table-cell;
                vertical-align: middle;
                font-size: 12px;
                font-weight: 200;
                white-space: normal;
                @include border-1px(rgba(7, 17, 27, 0.1));
            }
        }
        .current {
            position: relative;
            margin-top: -1px;
            z-index: 10;
            background-color: #fff;
            font-weight: 700;
            .text {
                @include border-none();
            }
        }
    }
    .foots-wrapper {
        flex: 1;
        .title {
            padding-left: 14px;
            height: 26px;
            line-height: 26px;
            border-left: 2px solid #d9dde1;
            font-size: 12px;
            color: rgb(147, 153, 159);
            background: #f3f5f7;
        }
        .food-item {
            display: flex;
            margin: 18px;
            padding-bottom: 18px;
            position: relative;
            @include border-1px(rgba(7, 17, 27, 0.1));
            &:last-child {
                margin-bottom: 0;
                @include border-none();
            }
            .icon {
                flex: 0 0 57px;
                margin-right: 10px;
                width: 57px;
                img {
                    border-radius: 2px;
                }
            }
            .content {
                flex: 1;
                font-size: 10px;
                color: #93999f;
                .name {
                    margin: 2px 0 8px;
                    height: 14px;
                    line-height: 14px;
                    font-size: 14px;
                    color: #07111b;
                }
                .desc {
                    line-height: 12px;
                    margin-bottom: 8px;
                }
                .extra {
                    line-height: 10px;
                    font-size: 10px;
                    color: #93999f;
                    .count {
                        margin-right: 12px;
                    }
                }
                .price {
                    font-weight: 700;
                    line-height: 24px;
                    margin-top: 8px;
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
                .cartcontrol {
                    position: absolute;
                    right: 0;
                    bottom: 12px;
                }
            }
        }
    }
}
</style>
