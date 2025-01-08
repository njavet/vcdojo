<template>
  <div id="canvas-container"></div>
  <div id="controls">
    <button @click="switchModel('prev')">Previous Model</button>
    <button @click="switchModel('next')">Next Model</button>
    <button @click="toggleRotation('horizontal')">Toggle Horizontal Rotation</button>
    <button @click="toggleRotation('vertical')">Toggle Vertical Rotation</button>

    <!-- Color change buttons -->
    <div id="color-controls">
      <button v-for="color in colors" :key="color" :data-color="color" @click="changeModelColor(color)">
        {{ color }}
      </button>
    </div>
  </div>
</template>

<script>
import { initializeScene, loadModel, changeModelColor } from '../js/lab2.js';

export default {
  name: 'ThreeCanvas',
  data() {
    return {
      currentModelIndex: 0,
      isRotatingHorizontal: false,
      isRotatingVertical: false,
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'],
    }
  },
  mounted() {
    // Initialize the Three.js scene
    const container = this.$el;
    initializeScene(container);
  },
  methods: {
    switchModel(direction) {
      if (direction === 'next') {
        this.currentModelIndex = (this.currentModelIndex + 1) % models.length;
      } else if (direction === 'prev') {
        this.currentModelIndex = (this.currentModelIndex - 1 + models.length) % models.length;
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
  }
};
</script>


