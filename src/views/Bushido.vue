<template>
  <div>
    <div id="stats-container">
      <svg id="chart" width="800" height="600"></svg>
      <br><br>
      <svg id="bars" width="600" height="400"></svg>/
    </div>

  </div>
  <router-link to="/">Go to Home</router-link>
</template>

<script>
import { render_chart, draw_bars} from "../js/bushido.js"
import '../styles/lab1.css';
export default {
  name: 'Bushido',
  mounted() {
    const container = this.$el;
    render_chart(container)
    draw_bars()
  }
}
</script>
