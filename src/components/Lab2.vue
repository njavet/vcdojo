<template>
  <div class="app-container">
    <div id="title">Tycho Station Weapon Shop</div>
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
      <button class="switch-btn" @click="switch_model('prev')">Previous Model</button>
      <button class="switch-btn" @click="switch_model('next')">Next Model</button>
      <button class="switch-btn" @click="toggle_rotation('horizontal')">Toggle Horizontal Rotation</button>
      <button class="color-btn" v-for="color in colors" :key="color" :data-color="color" @click="change_model_color(color)">
        {{ color }}
      </button>
      <router-link to="/">Go to Home</router-link>
    </div>
  </div>
</template>

<script>
import { initializeScene, toggle_rotation, switch_model, change_model_color} from '../js/lab2.js';
export default {
  name: 'Lab2',
  data() {
    return {
      colors: ['#ffffff', '#000000', 'grey', '#950000'],
    }
  },
  mounted() {
    // Initialize the Three.js scene
    const container = this.$el;
    console.log(container);
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