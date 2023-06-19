<script setup lang="ts">

</script>

<template>
  <header class="header">
    <section class="logogroup">
      <picture class="logo">
        <img alt="Vue logo" src="../../assets/logo.svg" width="125" height="125" />
      </picture>
      
      <hgroup class="textgroup">
        <h1 class="logotype">MovieSage</h1>
        <p class="sub">Unlocking the Secrets of Cinema!</p>
      </hgroup>
    </section>
  </header>
</template>

<style lang="scss">
  .header {
    width: 100%;
    display: flex;
    place-content: center space-between;
    padding: 1rem;
    position: sticky;
    top: 0;
    z-index:500;
    background-color: var(--color-sub);
    box-shadow: 0px 16px 16px 0px rgba(0,0,0,0.35);

    .logogroup {
      width: 100%;
      display: flex;
      place-content: center space-between;

      @media (min-width: 768px) {
        place-content: center flex-start;
      }

      .logo {
        display: flex;
        align-items: center;

        img {
          display: block;
          max-width: 45px;
          max-height: 45px;

          @media (min-width: 768px) {
            padding: 1rem;
            max-width: 150px;
            max-height: 155px;
          }
        }
      }

      .textgroup {
        display: flex;
        place-content: center;
        padding-left: 1rem;

        @media (min-width: 768px) {
          flex-direction: column;
        }

        .logotype {
        font-size: 2rem;
        color:var(--color-main);

        @media (min-width: 425px) {
          font-size: 2.5rem;
        }

        @media (min-width: 768px) {
          font-size: 3rem;
        }
      }

        .sub {
          display: none;
          color: var(--color-accent);
          font-style: italic;

          @media (min-width: 768px) {
            display: block;
            font-size: 1rem;
          }
        }
      }
    }
  }

</style>