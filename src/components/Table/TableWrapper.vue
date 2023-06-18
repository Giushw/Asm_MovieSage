<script setup lang="ts">
  import type {Results} from '../../decoder/shows';
  import {ref, type Ref} from 'vue';
  // import CardsEntity from './CardsEntity.vue';

  const props = defineProps<{
    values: Results;
  }>();

  const cards: Ref<Results> = ref(props.values);
    
  const headers: Ref<string[]> = ref(['Name', 'Premiered', 'Status', 'Summary'])
</script>

<template>
  <section class="wrapper">    
    <!-- WIP: Add Routing to detail -->
    <!-- <RouterLink :to="`/detail/${card.id}`"> -->
      <!-- <CardsEntity :info="card" /> -->
    <!-- </RouterLink> -->

    <table class="table">
      <thead>
        <tr>
          <th v-for="(header, i) in headers" v-bind:key="i">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="card in cards" v-bind:key="card.id">
          <td class="name">{{ card.name }}</td>
          <td>{{ card.premiered }}</td>
          <td>{{ card.status }}</td>
          <td class="abstract">{{ card.summary.replace(/<\/?[^>]+(>|$)/g, "") }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped lang="scss">
  .wrapper {
    display: none;
    
    @media (min-width: 1024px) {
      display: flex;
      padding: 1rem;
      background-color: var(--color-sub);
    }

    .table {
      width: 100%; 
      border-collapse: collapse; 
      table-layout: fixed;

      thead {
        background-color: var(--color-main);
      }

      tr {
        &:nth-of-type(2n+2) {
          background-color: var(--color-black);
        }
      }

      th { 
        color: var(--color-white); 
        font-weight: bold;
        text-align: center;
      }

      td, th { 
        padding: 6px; 
        border: 1px solid var(--color-white); 
        text-align: center; 
      }

      .name {
        font-size: bold;
        font-family: var(--font-main);
        color: var(--color-accent);
      }

      .abstract {
        width:100%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
    }
  }

</style>
