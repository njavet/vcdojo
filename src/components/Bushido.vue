<template>
  <div>
    <div class="svg-container">
      <svg id="weight" class="svg-item" width="600" height="400"></svg>
      <svg id="study" class="svg-item" width="600" height="400"></svg>
    </div>

  </div>
</template>

<script>
import { render_chart, draw_bars} from "../js/bushido.js"
export default {
  name: 'Bushido',
  mounted() {
    render_chart()
    draw_bars()
  }
}
</script>

<style scoped>

.svg-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.svg-item {
  border: 1px solid #ccc;
}

</style>