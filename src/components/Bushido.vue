<template>
  <div>
    <div id="svg-container">
      <svg class="svg-item" width="600" height="400"></svg>
      <br><br>
      <svg class="svg-item" width="600" height="400"></svg>/
    </div>

  </div>
</template>

<script>
import { render_chart, draw_bars} from "../js/bushido.js"
export default {
  name: 'Bushido',
  mounted() {
    const container = this.$el;
    render_chart(container)
    draw_bars()
  }
}
</script>
<style scoped>

</style>
