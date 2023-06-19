<script setup lang="ts">
  import type {Result} from '@/decoder/shows';
  import {ref, type Ref} from 'vue';

  // Coutesy of MDN
  const getRandomArbitrary = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const EMPTY_RESULT: Result = {
    id: 0,
    name: '',
    status: 'Ended',
    premiered: '',
    summary: '',
    image: {
        medium: '',
        original: ''
    }
  } 

  const model: Ref<Result> = ref(EMPTY_RESULT);

  const emit = defineEmits(['createMovie', 'closeModal']);

  const onSave = (): void => {
    console.log('onSave data: ', model.value);

    const refinedModel: Result = {
      ...model.value,
      id: getRandomArbitrary(0, 1000),
      image: {
        medium: `https://static.tvmaze.com/uploads/images/medium_portrait/81/${model.value.image.medium}.jpg`,
        original: `https://static.tvmaze.com/uploads/images/original_untouched/81/${model.value.image.medium}.jpg`
      }
    };

    console.log('onSave data: ', refinedModel);

    emit('createMovie', refinedModel)
    return emit('closeModal');
  };

  const onClose = (): void => {
    console.log('onClose click');
    return emit('closeModal');
  };
</script>

<template>
  <section class="modal">
    <div class="heading">
      <h3>Add a new movie</h3>
      <div class="icon" @click="onClose">
        <font-awesome-icon icon="fa-solid fa-xmark" size="2xl" />
      </div>
    </div>

    <div class="body">
      <div class="row">
        <div class="input-group">
          <label>Name </label>
          <input type="text" v-model="model.name">
        </div>

        <div class="input-group">
          <label>Relase Date</label>
          <input type="date" v-model="model.premiered">
        </div>

      </div>
        <div class="input-group">
        <label>Summary </label>
        <textarea v-model="model.summary"></textarea>
      </div>

      <div class="row">
        <div class="input-group">
          <label>Status</label>
          <select v-model="model.status">
            <option>Ended</option>
            <option>Running</option>
          </select>
        </div>

        <div class="input-group">
          <label>Image Path</label>
          <input type="text" v-model="model.image.medium">
        </div>
      </div>
    </div>

    <div class="footer">
      <button class="button button--icon" @click="onSave">
        Save
      </button>
    </div>
    
  </section>

  <section class="modal-overlay" id="modal-overlay"></section>
</template>

<style scoped lang="scss">
  .modal {
    position: fixed;
    z-index: 900;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
    width: 90%;
    display: flex;
    flex-direction: column;
    background-color: var(--color-sub);
    border-radius: 1rem;
    box-shadow: 0px 16px 16px 0px rgba(0,0,0,0.25);

    @media (min-width: 768px) {
      width: 80%;
    }

    &-overlay {
      z-index: 800;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
    }

    .heading {
      display: flex;
      width: 100%;
      padding: 1rem;
      place-content: center space-between;

      h3 {
        color:var(--color-main);
        font-size: 2rem;

        @media (min-width: 768px) {
          font-size: 2.5rem;
        padding: 1rem;

        }
      }

      .icon {
        display: flex;
        place-content: center;
        padding: 0.5rem;

        @media (min-width: 768px) {
          padding: 1rem;
        }
      }
    }
    
    .body {
      padding: 1rem;
      display: flex;
      flex-direction: column;

      .row {
        display: block;

        @media (min-width: 768px) {
          display:flex;
          place-content: center space-between;

          & > * {
            &:first-of-type{
              margin-right: 1rem;
            }
          }
        }
      }

    }

    .footer {
      display: flex;
      place-content: center flex-end;
      padding: 1rem;
    }
  }
</style>
