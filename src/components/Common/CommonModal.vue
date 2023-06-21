<script setup lang="ts">
  import type {Result} from '@/decoder/shows';
  import {ref, type Ref} from 'vue';

  // Coutesy of MDN
  const getRandomArbitrary = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  export type ModalMode = 'Create' | 'Edit' | 'Delete';

  const props = defineProps<{
    mode: ModalMode,
    movie: Result | null
  }>();

  const emit = defineEmits([
    'closeModal',
    'createMovie',
    'editMovie',
    'deleteMovie'
  ]);


  const EMPTY_SUMMARY: string = '<p>Lorem ipsum dolor sit amet,consectetur adipiscing elit. Donec aliquam porta dui. Morbi faucibus quam nec iaculis consectetur. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer ac augue quis urna tincidunt mollis nec id augue. Nullam nunc enim, condimentum eu hendrerit eu, eleifend vitae ante. Ut sit amet massa euismod, vehicula ex luctus, blandit magna. Praesent dignissim non dolor eu laoreet. Donec facilisis justo et metus condimentum vestibulum. Sed eu maximus sapien. Nunc interdum eros libero, id rutrum neque interdum id. Nulla ornare lacinia arcu ut pretium. Maecenas faucibus, ligula eget aliquam malesuada, enim ante congue augue, quis vulputate justo enim nec magna. Donec vel magna sem.</p>';

  const EMPTY_RESULT: Result = {
    id: 0,
    name: null,
    status: 'Ended',
    premiered: null,
    summary: '',
    image: {
        medium: '',
        original: ''
    }
  };

  const model: Ref<Result> = ref(props.movie ?? EMPTY_RESULT);
  const modalMode: Ref<ModalMode> = ref(props.mode);

  const onClose = (): void => emit('closeModal');

  const onSave = (): void => {
    const refinedModel: Result = {
      ...model.value,
      id: getRandomArbitrary(0, 1000),
      // Forcing not Found image to show empty state
      image: {
        medium: 'src/assets/EmptyImg_small.jpg',
        original: 'src/assets/EmptyImg_small.jpg'
      },
      summary: model.value.summary !== '' || model.value.summary ? model.value.summary : EMPTY_SUMMARY
    };

    emit('createMovie', refinedModel);

    return emit('closeModal');
  };

  const onEdit = (): void => {
    const refinedModel: Result = {
      ...model.value,
      image: model.value.image ?? {
        medium: 'src/assets/EmptyImg_small.jpg',
        original: 'src/assets/EmptyImg_small.jpg'
      },
      summary: model.value.summary === '' || model.value.summary === null 
        ? model.value.summary 
        : EMPTY_SUMMARY
    };

    emit('editMovie', model.value.id,  refinedModel);

    return emit('closeModal');
  };

  const onConfirm = (): void => emit('deleteMovie', model.value.id);
</script>

<template>
  <section class="modal">
    <div class="heading">
      <h3 v-if="modalMode === 'Create'">Insert movie</h3>
      <h3 v-if="modalMode === 'Edit'">Edit movie</h3>
      <h3 v-if="modalMode === 'Delete'">Delete movie</h3>

      <div class="icon" @click="onClose">
        <font-awesome-icon icon="fa-solid fa-xmark" size="2xl" />
      </div>
    </div>

    <div class="body">
      <template v-if="modalMode === 'Create' || modalMode === 'Edit'">
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
      </template>

      <template v-else>
        <div class="body__delete">
          <p>Are you sure you want to delete: </p>
          <h5>{{ model.name }} ?</h5>
        </div>
      </template>
    </div>

    <div class="footer">
      <div class="ctas">
        <button class="button button--inverted" @click="onClose">Cancel</button>
        
        <button v-if="modalMode === 'Create'" class="button" @click="onSave">Save</button>
        <button v-if="modalMode === 'Edit'" class="button" @click="onEdit">Apply</button>
        <button v-if="modalMode === 'Delete'" class="button" @click="onConfirm">Confirm</button>
      </div>
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

      &__delete {
        display: flex;
        flex-direction: column;
        place-content: center;
        font-size: 1.5rem;
        padding: 0 1.5rem;

        h5 {
          font-size: 3rem;
          color: var(--color-accent);
        }
      }

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

      .ctas {
        display: flex;
        place-content: center space-between;
        width: 22%;
      }
    }
  }
</style>
