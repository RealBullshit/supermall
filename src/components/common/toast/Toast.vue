<template>
  <div class="toast"  v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      // message: {
      //   type: String,
      //   default: ''
      // },
      // show: {
      //   type: Boolean,
      //   default: false
      // }
    },
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message = '默认文字', duration = 2000) {

        // duration = duration || 2000

        this.isShow = true
        this.message = message

        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    /*根据自己的宽高进行调节到中心*/
    transform: translate(-50%, -50%);
    /*上下 左右*/
    padding: 3px 5px;

    color: #fff;
    background-color: rgba(0, 0, 0, .7);
  }
</style>
