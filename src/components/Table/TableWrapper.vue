<script setup lang="ts">
  import type {Results, Result} from '../../decoder/shows';
  import {ref, type Ref} from 'vue';
  import CommonModal from '../Common/CommonModal.vue';
  import CommonMovieActions from '../Common/CommonMovieActions.vue';

  const props = defineProps<{
    values: Results;
  }>();

  const cards: Ref<Results> = ref(props.values);
  const headers: Ref<string[]> = ref(['Name', 'Premiered', 'Status', 'Summary', 'Actions']);
  const modalVisible: Ref<boolean> = ref(false);
  const modalMode: Ref<'Edit' | 'Delete'> = ref('Delete');
  const focusedCard: Ref<Result | null> = ref(null);

  const onEditMovie = (id: number): void => {
    modalMode.value = 'Edit';
    modalVisible.value = true;
    focusedCard.value = cards.value.find(c => c.id === id) ?? null;
  };

  const onDeleteMovie = (id: number): void => {
    modalMode.value = 'Delete';
    modalVisible.value = true;
    focusedCard.value = cards.value.find(c => c.id === id) ?? null;
  };

  const onCloseClick = (): boolean => modalVisible.value = false;

  const onEditMovieRequest = (movie: Result): void => {
    const updatedState = cards.value.map(r => {
      if (r.id === movie.id) {
        r = {
          ...r,
          ...movie
        }
      }
    });

    modalVisible.value = false;

    return window.localStorage.setItem('PopularFilms', JSON.stringify({
      results: updatedState
    }));
  };

  const onDeleteMovieRequest = (movie: Result): void => {
    const updatedState = cards.value.filter(r => r.id !== movie.id);

    modalVisible.value = false;

    return window.localStorage.setItem('PopularFilms', JSON.stringify({
      results: updatedState
    }));
  };
</script>

<template>
  <section class="wrapper">    
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
          <td>
            <CommonMovieActions 
              :id="card.id"
              @edit-movie="onEditMovie(card.id)"
              @delete-movie="onDeleteMovie(card.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <CommonModal 
    v-if="modalVisible"
    :mode="modalMode" 
    :movie="focusedCard"
    @close-modal="onCloseClick" 
    @edit-movie=" focusedCard ? onEditMovieRequest(focusedCard) : null"
    @delete-movie="focusedCard ? onDeleteMovieRequest(focusedCard) : null"
  />
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
