<template>
  <div>
    <svg id="chart" width="800" height="400"></svg>
  </div>
  <router-link to="/">Go to Home</router-link>
</template>

<script>
export default {
  name: 'Lab1',
};
import { renderChart } from "../js/lab1.js";
renderChart();
</script>
