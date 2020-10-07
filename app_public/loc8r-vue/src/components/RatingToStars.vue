<template>
  <span>
    <span v-for="number in rating" :key="number"
      ><font-awesome-icon :icon="['fas', 'star']"
    /></span>
    <span v-for="number in emptyStars" :key="number"
      ><font-awesome-icon :icon="['far', 'star']"
    /></span>
  </span>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "RatingToStars",
  props: {
    rating: {
      type: Number,
      validator: (rating: number) => rating >= 0 && rating <= 5,
      required: true
    }
  },
  setup(props) {
    const emptyStars = computed(() => 5 - props.rating);
    return { emptyStars };
  }
});
</script>

<style>
@import "~font-awesome/css/font-awesome.min.css";
</style>
