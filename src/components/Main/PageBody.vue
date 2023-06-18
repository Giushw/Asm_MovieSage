<script setup lang="ts">
  import {MOCK_RESPONSE_POPULAR, type ResultsObj} from '@/decoder/shows';
  import type {ActiveView} from '@/lib/types';
  import {ref, type Ref} from 'vue';
  import CardsWrapper from '../Cards/CardsWrapper.vue';
  import CommonSwitch from '../Common/CommonSwitch.vue';
  import TableWrapper from '../Table/TableWrapper.vue'

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

  const onToggle = (switchValue: boolean): void => {
    switchValue ? view.value = 'Table' : view.value = 'Cards'
  };
</script>

<template>
  <main class="main">
    <section class="switchgroup">
      <span>Change View</span>
      <CommonSwitch
        :checked="false"
        @toggle="onToggle"
      />
    </section>

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

    .switchgroup {
      display: none;

      @media (min-width: 1024px) {
        width: 100%;
        padding: 1rem;
        display: flex;
        place-content: end flex-end;
        background-color: var(--color-sub);
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
