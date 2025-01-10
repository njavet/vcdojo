<template>
  <div class="tycho">
    <h1>Tycho Station Weapon Shop</h1>
    <div id="three-container"></div>
    <div class="stats-box">
      <span><strong>Price:</strong>64</span>
    </div>
    <div class="stats-box">
      <span><strong>Weight:</strong>128</span>
    </div>
    <div class="stats-box">
      <span><strong>Description:</strong>yo</span>
    </div>
    <div id="controls">
      <button @click="switch_model('prev')">Previous Model</button>
      <button @click="switch_model('next')">Next Model</button>
      <button @click="toggle_rotation('horizontal')">Toggle Horizontal Rotation</button>
      <button v-for="color in colors" :key="color" :data-color="color" @click="change_model_color(color)">
        {{ color }}
      </button>
    </div>
  </div>
</template>

<script>
import { initializeScene, toggle_rotation, switch_model, change_model_color} from '../js/tycho.js';
export default {
  name: 'Tycho',
  data() {
    return {
      colors: ['#ffffff', '#000000', 'grey', '#950000'],
    }
  },
  mounted() {
    // Initialize the Three.js scene
    initializeScene();
  },
  methods: {
    change_model_color(color) {
      change_model_color(color);
    },
    toggle_rotation(rotation) {
      toggle_rotation(rotation);
    },
    switch_model(model) {
      switch_model(model);
    }
  },
};
</script>
<style scoped>

.tycho {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-image: url('images/bg.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

</style>