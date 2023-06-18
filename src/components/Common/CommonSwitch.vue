<script setup lang="ts">
  import {ref, type Ref} from 'vue';

  const props = defineProps<{
    checked: boolean
  }>();

  const status: Ref<boolean> = ref(props.checked);

  const emit = defineEmits(['toggle']);

  const onChange = () => {
    console.log('common switch emit');
    status.value = !status.value;
    return emit('toggle', status.value)
  };

</script>

<template>
  <label class="container">
    <span class="label --card" :class="!status ? '--active' : null">
      <font-awesome-icon icon="fa-solid fa-image" />
    </span>
    <input 
      type="checkbox"
      class="input"
      :checked="status"
      @change="onChange"
    />
    <span class="switch"></span>
    <span class="label --table" :class="status ? '--active' : null">
      <font-awesome-icon icon="fa-solid fa-table" />
      
    </span>
  </label>
</template>

<style scoped lang="scss">

  .container {
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    .label {
      color: var(--color-white);
      overflow: hidden;
      transition: color 0.3s ease-in-out;

      &.--active {
        color:var(--color-accent)
      }

      &.--card {
        margin-right: 1rem;
      }

      &.--table {
        margin-left: 1rem;
      }
    }

    .input {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;

      &:checked + .switch {
        background-color: var(--color-accent);
      }

      &:checked + .switch::before {
        border-color: var(--color-accent);
        transform: translateX(calc(var(--switch-container-width) - var(--switch-size)));
      }
    }
    .switch {
      --switch-container-width: 50px;
      --switch-size: calc(var(--switch-container-width) / 2);

      display: flex;
      align-items: center;
      position: relative;
      height: var(--switch-size);
      width: 100px;
      flex-basis: var(--switch-container-width);
      flex-shrink: 0;
      border-radius: var(--switch-size);
      background-color: var(--color-black);
      transition: background-color 0.25s ease-in-out;

      &::before {
        content: "";
        position: absolute;
        left: 1px;
        height: calc(var(--switch-size) - 4px);
        width: calc(var(--switch-size) - 4px);
        border-radius: 9999px;
        background-color: var(--color-white);
        transition: transform 0.375s ease-in-out;
      }
    }
  }

</style>
