<template>
  <div>
    <svg id="chart" width="900" height="500"></svg>

  </div>
  <router-link to="/">Go to Home</router-link>
</template>

<script>
export default {
  name: 'Bushido',
}
import { render_chart } from "../js/bushido.js"
import '../styles/lab1.css';
render_chart()
</script>
