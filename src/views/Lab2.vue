<template>
  <div class="app-container">
    <div id="title">Tycho Station</div>
    <div id="canvas-container"></div>

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
      <button class="color-btn" data-color="#6312ff">Purple</button>
		  <button class="color-btn" data-color="#ffffff">White</button>
		  <button class="color-btn" data-color="#000000">Black</button>
		  <button class="color-btn" data-color="#c0c0c0">Silver</button>
		  <button id="rotateHorizontal" class="switch-btn">Toggle Horizontal Rotation</button>
		  <button id="rotateVertical" class="switch-btn">Toggle Vertical Rotation</button>
		  <button id="prev-model" class="switch-btn">Previous Model</button>
      <button id="next-model" class="switch-btn">Next Model</button>
    </div>
      <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'Lab2',
};

</script>