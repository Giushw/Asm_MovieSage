import {createRouter, createWebHistory} from 'vue-router';
import MainPageVue from '@/Views/MainPage.vue';
// import AboutViewVue from '@Views/AboutView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPageVue
    },
    // {
    //   path: '/movie/:id',
    //   name: 'movie',
    //   component: () => AboutViewVue
    // }
  ]
})

export default router;
