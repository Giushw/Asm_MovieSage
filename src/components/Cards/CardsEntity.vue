<script setup lang="ts">
  import type {Result} from '@/decoder/shows';
  import {ref, type Ref} from 'vue';
  import CommonMovieActions from '../Common/CommonMovieActions.vue';

  const props = defineProps<{
    info: Result;
  }>();

  const emit = defineEmits(['editMovieRelay', 'deleteMovieRelay']);

  const card: Ref<Result> = ref(props.info);

  const onEditMovie = (): void => emit('editMovieRelay', card.value.id);
  const onDeleteMovie = (): void => emit('deleteMovieRelay', card.value.id);
</script>

<template>
  <article class="card">
    <CommonMovieActions 
      :id="card.id"
      @edit-movie="onEditMovie"
      @delete-movie="onDeleteMovie"
    />

    <picture class="poster">
      <source media="(min-width:768px)" :srcset="`${card.image.original}`">
      <img :src="`${card.image.medium}`"  :alt="card.name ?? 'Movie Poster'">
    </picture>

    <div class="copy">
      <div class="heading">
        <h2>{{ card.name }}</h2>

        <div class="info">
          <span>{{ card.premiered }}</span>
          <!-- API don't have Director data so i'm using this instead -->
          <span>{{ card.status }}</span>
        </div>
      </div>

      <p class="abstract">
        {{ card.summary.replace(/<\/?[^>]+(>|$)/g, "") }}
      </p>
    </div>
  </article>
</template>

<style  lang="scss">
  .card {
    position: relative;
    display: flex;
    width: 100%;
    margin: 0 0 1rem 0;
    overflow: hidden;
    max-height: 500px;
    box-shadow: 10px 15px 10px 5px rgba(0,0,0,0.1),0px 0px 52px 0px rgba(0,0,0,0.1);


    @media (min-width: 768px) {
      width: 49%;
    }

    @media (min-width: 1024px) {
      width: 32%;
    }

    @media (min-width: 1440px) {
      width: 24%;
    }

    .actions {
      position: absolute;
      right: 0;
      padding: 1rem;
      background-color: rgba(0, 0, 0, 0.7);
      width: 40%;
      border-radius: 0 0 0 1rem;

      @media (min-width: 425px) {
        width: 30%;
      }
    }

    .poster {
      width: 100%;
      object-fit: contain;

      img {
        width: 100%;
        object-fit: contain;
      }
    }

    .copy {
      position: absolute;
      bottom: 0;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 1rem;
      background-color: rgba(0, 0, 0, 0.7);
      transform: translate(0, 60%);
      transition: transform 0.3s ease-in-out;

      &:hover {
        transform: translate(0, 0);
      }
      
      .heading {
        width: 100%;
        display: flex;
        place-content: center space-between;
        margin-bottom: 1rem;

        h2 {
          width: 70%;
          font-size: 1.2rem;
          color: var(--color-main);

          @media (min-width: 425px) {
            font-size: 1.3rem;
          }
        }

        .info {
          width: 30%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-size: 0.7rem;

          @media (min-width: 425px) {
            font-size: 1rem;
          }

          @media (min-width: 768px) {
            font-size: 0.9rem;
          }
        }
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
