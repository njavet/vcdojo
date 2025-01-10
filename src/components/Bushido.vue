<template>
  <div>
    <div id="svg-container">
      <svg id="weight" class="svg-item" width="600" height="400"></svg>
      <br><br>
      <svg id="study" class="svg-item" width="600" height="400"></svg>/
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

</style>
