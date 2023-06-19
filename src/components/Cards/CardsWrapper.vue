<script setup lang="ts">
  import type {Results} from '@/decoder/shows';
  import {ref, type Ref} from 'vue';
  import CardsEntity from './CardsEntity.vue';

  const props = defineProps<{
    values: Results;
  }>();

  const cards: Ref<Results> = ref(props.values);
</script>

<template>
  <section class="wrapper">    
    <template v-for="card in cards" v-bind:key="card.id">
      <CardsEntity :info="card" />
    </template>
  </section>
</template>

<style scoped lang="scss">
  .wrapper {
    display: block;
    padding: 1rem;
    background-color: var(--color-sub);
    
    @media (min-width: 768px) {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

</style>
