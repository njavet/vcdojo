import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Lab0 from '../views/Lab0.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/lab0', component: Lab0 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
