<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"></tab-control>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

<!--  监听组件必须加上.native  -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {itemListenerMixin} from "common/mixin";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      // console.log('destroyed');
    },
    activated() {
      // console.log('activated');
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      // console.log(this.saveY);
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //1.保存y值
      // this.$refs.scroll.
      // console.log('deactivated');
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log(this.saveY);

      //2.取消全局事件监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // //1.监听item中图片加载完成
      // //不加延迟时间也可以
      // const refresh = debounce(this.$refs.scroll.refresh)
      // // const refresh = this.debounce(this.$refs.scroll.refresh, 200)
      //
      // //对监听事件进行保存
      // this.itemImgListener = () => {
      //   // this.$refs.scroll.refresh()
      //   refresh()
      //   // console.log('-----------');
      // }
      // this.$bus.$on('itemImageLoad', this.itemImgListener)
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        // console.log(position);
        //1.判断backTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        //2.决定tabControl是否吸顶（position: fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        // console.log('上拉加载更多');
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        //2.获取tabControl的offsetTop
        //所有的组件都有一个属性el: 用于获取组件中的元素
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

       /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          //goods里的对象名为字符串时应用goods[type]
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
/* scoped: 作用域 */
  #home {
    /*padding-top: 44px;*/
    /* vh 视口高度 100vh就是100%的视口 */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*!* z-index 较大的元素会覆盖较小的元素在上层进行显示 *!*/
    /*z-index: 9;*/
  }

  /*.tab-control {*/
  /*  !* 组件到达top值时position变为fixed *!*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/

    .content {
    /*height: 300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

    .tab-control {
      position: relative;
      /* z-index只对定位的元素起效果 */
      z-index: 9;
    }

  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
