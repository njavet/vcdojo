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
      <button @click="toggleRotation('vertical')">Toggle Vertical Rotation</button>
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
import { initializeScene, loadModel, animate, changeModelColor } from '../js/lab2.js';
export default {
  name: 'Lab2',
  data() {
    return {
      currentModelIndex: 0,
      isRotatingHorizontal: false,
      isRotatingVertical: false,
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'],
      stats: {
        price: 0,
        weight: 0,
        description: ''
      },
      models: {
        'blender/drone.glb': 0,
        'blender/space_ship.glb': 1,
        'blender/rail_gun.glb': 2,
        'blender/pistol.glb': 3
      },
    }
  },
  mounted() {
    // Initialize the Three.js scene
    const container = this.$el;
    console.log(container);
    console.log(this.models)
    initializeScene(container);
    loadModel(2, this.models);
    //animate()
  },
  methods: {
    switchModel(direction) {
      if (direction === 'next') {
        this.currentModelIndex = (this.currentModelIndex + 1) % this.models.length;
      } else if (direction === 'prev') {
        this.currentModelIndex = (this.currentModelIndex - 1 + this.models.length) % this.models.length;
      }
      loadModel(this.currentModelIndex);
    },
    toggleRotation(axis) {
      if (axis === 'horizontal') {
        this.isRotatingHorizontal = !this.isRotatingHorizontal;
      } else if (axis === 'vertical') {
        this.isRotatingVertical = !this.isRotatingVertical;
      }
    },
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