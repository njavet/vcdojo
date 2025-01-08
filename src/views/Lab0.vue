<template>
  <div>
    <h1>MCRN Donnager</h1>
    <a href="/">Back to Home</a>
    <br><br>
    <object type="image/svg+xml"
            data="/public/images/donnager_logo.svg" width="64" height="64">
    </object>
    <br><br>
    This page gives you some information about the Martian Congressional
    Republic Navy flagship Donnager.
    <br>
    <div id="svg-container"></div>
    <h2>Armament</h2>
    <div id="armament">
      <ul>
        <li>14x configurable torpedo tubes</li>
        <li>2X Railguns</li>
        <li>Full Point Defense Network</li>
        <li>59X Nariman Dynamics 44mm point defense cannons</li>
      </ul>
    </div>

    <router-link to="/">Go to Home</router-link>
  </div>

</template>

<script>
export default {
  name: 'Lab0',
};
fetch('/public/images/donnager_ship.svg')
    .then(response => response.text())
    .then(svgContent => {
      document.getElementById('svg-container').innerHTML = svgContent;
      const svgElement = document.querySelector('#svg-container svg');
      let posX = 0;
      const speed = 2;

      function moveSvg() {
        posX += speed;
        svgElement.style.transform = `translateX(${posX}px`;
        if (posX > window.innerWidth) {
          posX = -svgElement.getBoundingClientRect().width;
        }
        requestAnimationFrame(moveSvg)
      }
      moveSvg();
    }).catch(err => console.error('failed to load svg:', err));
</script>