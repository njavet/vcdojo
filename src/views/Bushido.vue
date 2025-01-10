<template>
  <div>
    <div id="stats-container">
      <svg id="chart" width="900" height="500"></svg>
    </div>

  </div>
  <router-link to="/">Go to Home</router-link>
</template>

<script>
import { render_chart } from "../js/bushido.js"
import '../styles/lab1.css';
export default {
  name: 'Bushido',
  mounted() {
    const container = this.$el;
    render_chart(container)
  }
}
</script>
