import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Lab0 from '../views/Lab0.vue';
import Lab1 from '../views/Lab1.vue';
import Lab2 from '../views/Lab2.vue';
import Bushido from '../views/Bushido.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/lab0', component: Lab0 },
  { path: '/lab1', component: Lab1 },
  { path: '/lab2', component: Lab2 },
  { path: '/bushido', component: Bushido },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
