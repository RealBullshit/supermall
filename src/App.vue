<template>
  <div id="app">
<!--  keep-alive:不要随便销毁掉里面的组件  -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from "components/content/mainTabBar/MainTabBar";

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
@import "assets/css/base.css";
</style>
