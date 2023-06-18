<script setup lang="ts">
  import PageHeader from '@/components/Main/PageHeader.vue';
  import PageBody from '@/components/Main/PageBody.vue';
  import {getPopularFilms} from '../lib/request';

  // Retrive Data with a "debounce"
  if (!window.localStorage.getItem('PopularFilms')) {
    getPopularFilms();
  };
  
</script>

<template>
  <div class="wrapper">
    <PageHeader />
    
    <PageBody />
  </div>
</template>

<style scoped lang="scss" >
  .wrapper {
    position: relative;
  }
</style>
