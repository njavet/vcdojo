<template>
  <div id="app">
    <ThreeCanvas/>
    <router-view></router-view>
  </div>
</template>

<script>
import ThreeCanvas from "./components/ThreeCanvas.vue";

export default {
  name: 'App',
  components: {ThreeCanvas},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 40px;
}
</style>
