<template>
<!-- 明确的拿到某一个元素最好绑上ref属性(绑定到子组件上) -->
<!-- ref如果是绑定在组件上，那么通过this.$ref.refName获取到的是一个组件对象 -->
<!-- ref如果是绑定在普通的元素中，那么通过this.$ref.refName获取到的是一个元素对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
        message: '哈哈哈'
      }
    },
    mounted() {
      //使用document获取wrapper时当有多个wrapper时无法确定是哪一个
      // this.scroll = new BScroll(document.querySelector('.wrapper'), {
      //
      // })
      //1.创建better-scroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }

      // 3.监听上拉事件(scroll滚到底部)（默认只加载一次）
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          // console.log('监听到滚动到底部');
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      //ES6中可以传一个默认值 此处的time=300 当别人调用此函数但没有传time时会使用默认值
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        console.log('----------');
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
