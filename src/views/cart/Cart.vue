<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
<!--      <div slot="center">购物车({{cartLength}})</div>-->
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar,
    },
    computed: {
      // cartLength() {
      //   // return this.$store.state.cartList.length
      //   return this.$store.getters.cartLength
      // }
      //将getter转为计算属性
      // ...mapGetters([
      //   'cartLength',
      //   'cartList'
      // ])
      ...mapGetters({
        length: 'cartLength',
        // list: 'cartList'
      })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /*字体加粗*/
    /*font-weight: 700;*/

    position: relative;
    z-index: 9;
  }
</style>
