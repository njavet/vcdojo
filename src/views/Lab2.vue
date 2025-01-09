<template>
  <div class="app-container">
    <h1>Tycho Station</h1>
    <div id="stats-container">
      <div class="stats-box">
        <span><strong>Price:</strong>64</span>
      </div>
      <div class="stats-box">
        <span><strong>Weight:</strong>128</span>
      </div>
      <div class="stats-box">
        <span><strong>Description:</strong>yo</span>
      </div>
    </div>
    <div id="controls">
      <button @click="switchModel('prev')">Previous Model</button>
      <button @click="switchModel('next')">Next Model</button>
      <button @click="toggleRotation('horizontal')">Toggle Horizontal Rotation</button>
    </div>
    <div id="color-controls">
      <button v-for="color in colors" :key="color" :data-color="color" @click="changeModelColor(color)">
        {{ color }}
      </button>
    </div>
      <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script>
import { initializeScene, toggle_rotation, changeModelColor} from '../js/lab2.js';
export default {
  name: 'Lab2',
  data() {
    return {
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'],
    }
  },
  mounted() {
    // Initialize the Three.js scene
    const container = this.$el;
    initializeScene(container);
  },
  methods: {
    changeModelColor(color) {
      changeModelColor(color);
    },
  },
  updateProductStats(price, weight, desc) {
    this.stats.price = price;
    this.stats.weight = weight;
    this.stats.description = desc;
  }
};
</script>