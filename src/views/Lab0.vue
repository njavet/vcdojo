<template>
  <div>
    <h1>MCRN Donnager</h1>
    <a href="/">Back to Home</a>
    <br><br>
    <object type="image/svg+xml"
            data="/images/donnager_logo.svg" width="64" height="64">
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
  </div>

</template>

<script>
import {donnager} from "../js/lab0.js";
export default {
  name: 'Lab0',
  mounted() {
    donnager();
  }
};

</script>