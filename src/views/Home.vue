<template>
  <div>
    <h1>Visual Computing Dojo</h1>
    <p>Welcome to the Visual Computing Dojo!</p>
    <router-link to="/about">Go to About</router-link>
    <br>
    <router-link to="/lab0">Go to Lab 0 </router-link>
    <br>
    <router-link to="/lab1">Go to Lab 1 </router-link>
    <br>
    <router-link to="/lab2">Go to Lab 2 </router-link>
    <br>
    <router-link to="/bushido">Go to Bushido stats</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
