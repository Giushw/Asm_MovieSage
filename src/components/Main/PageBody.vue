<script setup lang="ts">
  import {MOCK_RESPONSE_POPULAR, type Result, type ResultsObj} from '@/decoder/shows';
  import type {ActiveView} from '@/lib/types';
  import {ref, type Ref} from 'vue';
  import CardsWrapper from '../Cards/CardsWrapper.vue';
  import CommonSwitch from '../Common/CommonSwitch.vue';
  import TableWrapper from '../Table/TableWrapper.vue';
  import Modal from '../Common/CommonModal.vue';

  const retriveData = (): ResultsObj => {
    let popularFilms: string | null = window.localStorage.getItem('PopularFilms');

    // Fallback in case API don't respond
    if (!popularFilms) {
      window.localStorage.setItem('PopularFilms', JSON.stringify(MOCK_RESPONSE_POPULAR));

      popularFilms = window.localStorage.getItem('PopularFilms');
    }
    
    // we have a good chance of making this assumption
    return JSON.parse(popularFilms as string);
  };

  const state: Ref<ResultsObj> = ref(retriveData());
  const view: Ref<ActiveView> = ref('Cards');
  const modalVisible: Ref<boolean> = ref(false);
  

  const onAddClick = (): boolean => modalVisible.value = true;
  const onCloseClick = (): boolean => modalVisible.value = false;

  const onCreate = (movie: Result): void => {
    console.log('create catch', movie)
    state.value.results.unshift(movie);
    return window.localStorage.setItem('PopularFilms', JSON.stringify(state.value));
  };

  const onToggle = (switchValue: boolean): void => {
    switchValue ? view.value = 'Table' : view.value = 'Cards'
  };
</script>

<template>
  <main class="main">
    <section class="actions">
      <button class="button button--icon" @click="onAddClick">
        <span>Add a Movie</span>
        <font-awesome-icon icon="fa-solid fa-plus" size="lg"/>
      </button>

      <div class="switchgroup">
        <span>Change View</span>
        <CommonSwitch
          :checked="false"
          @toggle="onToggle"
        />
      </div>
    </section>

    <Modal v-if="modalVisible" @close-modal="onCloseClick" @create-movie="onCreate"/>

    <Transition>
      <CardsWrapper v-if="view === 'Cards'" :values="state.results"/>
    </Transition>

    <Transition>
      <TableWrapper v-if="view === 'Table'" :values="state.results"/>
    </Transition>
  </main>
</template>

<style lang="scss">
  .main {
    padding: 1rem;

    @media (min-width: 768px) {
    }

    & > .actions {
      display: flex;
      place-content: center space-between;
      padding: 1rem;
      background-color: var(--color-sub);
    }

    .switchgroup {
      display: none;

      @media (min-width: 1024px) {
        display: flex;
        place-content: end flex-end;
      }

      span {
        display: flex;
        align-items: center;
      }
    }

    .v-enter-active,
    .v-leave-active {
      transition: opacity 0.5s ease-in-out;
    }

    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
  }

</style>
