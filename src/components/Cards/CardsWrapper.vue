<script setup lang="ts">
  import type {Results, Result} from '@/decoder/shows';
  import {ref, type Ref} from 'vue';
  import CommonModal from '../Common/CommonModal.vue';
  import CardsEntity from './CardsEntity.vue';

  const props = defineProps<{
    values: Results;
  }>();
  
  const cards: Ref<Results> = ref(props.values);
  const modalVisible: Ref<boolean> = ref(false);
  const modalMode: Ref<'Edit' | 'Delete'> = ref('Delete');
  const focusedCard: Ref<Result | null> = ref(null);

  const onEditMovieRelay = (id: number): void => {
    modalMode.value = 'Edit';
    modalVisible.value = true;
    focusedCard.value = cards.value.find(c => c.id === id) ?? null;
  };

  const onDeleteMovieRelay = (id: number): void => {
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

    window.localStorage.clear();

    return window.localStorage.setItem('PopularFilms', JSON.stringify({
      results: updatedState
    }));
  };
</script>

<template>
  <section class="wrapper">    
    <template v-for="card in cards" v-bind:key="card.id">
      <CardsEntity 
        :info="card" 
        @edit-movie-relay="onEditMovieRelay(card.id)"
        @delete-movie-relay="onDeleteMovieRelay(card.id)"
      />
    </template>
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
