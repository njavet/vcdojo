<template>
  <div>
    <svg id="chart" width="800" height="400"></svg>
  </div>
</template>

<script>
export default {
  name: 'Lab1',
};
import { renderChart } from "../js/lab01.js";
renderChart();
</script>