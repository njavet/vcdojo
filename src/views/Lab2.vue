<template>
  <div class="app-container">
    <h1>Tycho Station</h1>
    <div id="canvas-container">
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
      <button @click="switch_model('prev')">Previous Model</button>
      <button @click="switch_model('next')">Next Model</button>
      <button @click="toggle_rotation('horizontal')">Toggle Horizontal Rotation</button>
    </div>
    <div id="color-controls">
      <button v-for="color in colors" :key="color" :data-color="color" @click="change_model_color(color)">
        {{ color }}
      </button>
    </div>
      </div>
      <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script>
import '../styles/lab2.css';
import { initializeScene, toggle_rotation, switch_model, change_model_color} from '../js/lab2.js';
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