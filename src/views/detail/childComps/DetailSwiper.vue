<template>
  <swiper class="swiper-detail" >
    <swiper-item class="swiper-item"
                 v-for="(item, index) in topImages"
                 :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  /*.swiper-detail {*/
  /*  height: 300px;*/
  /*  overflow: hidden;*/
  /*}*/

  .swiper-item {
    height: 300px;
    overflow: hidden;
  }
</style>
