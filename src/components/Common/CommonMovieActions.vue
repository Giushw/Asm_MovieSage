<script setup lang="ts">

  const props = defineProps<{
    id: number
  }>();

  const emit = defineEmits(['editMovie', 'deleteMovie']);

  const onClickEdit = (): void => emit('editMovie', props.id);
  const onClickDelete = (): void => emit('deleteMovie', props.id);
</script>

<template>
  <div class="actions">
    <font-awesome-icon icon="fa-solid fa-pencil" size="lg" @click="onClickEdit()"/>
    <font-awesome-icon icon="fa-solid fa-trash" size="lg" @click="onClickDelete()" />
  </div>
</template>

<style scoped lang="scss">
  .actions {
    display: flex;
    place-content: center space-around;

    & > * {
      transition: scale 0.5s ease-in-out, color 0.5s ease-in-out; 
      transform: scale(1);

      &:hover {
        color: var(--color-accent);
        transform: scale(1.2);
      }
    }
  }
</style>
