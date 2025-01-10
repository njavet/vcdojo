<template>
  <div>
    <h1>Visual Computing Dojo</h1>
    <button>
      <router-link to="/about">About</router-link>
    </button>
    <br><br>
    <button>
      <router-link to="/lab0">Go to Lab 0 </router-link>
    </button>
    <br><br>
    <button>
      <router-link to="/lab2">Go to Lab 2 </router-link>
    </button>
    <br><br>
    <button>
      <router-link to="/bushido">Bushido stats</router-link>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
