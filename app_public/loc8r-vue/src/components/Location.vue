<template>
  <div class="card">
    <div class="card-block">
      <h4>
        <a :href="locationUrl">{{ locationModel.name }}&nbsp;</a>
        <small><RatingToStars :rating="locationModel.rating"/></small>
        <span class="badge badge-pill badge-default float-right">{{
          locationModel.distance
        }}</span>
      </h4>
      <p>{{ locationModel.adress }}</p>
      <div class="facilities" id="facilities">
        <span
          v-for="facility in locationModel.facilities"
          :key="facility"
          class="badge badge-warning"
          >{{ facility }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { LocationModel } from "../models/LocationModel";
import RatingToStars from "./RatingToStars.vue";

export default defineComponent({
  name: "Location",

  components: {
    RatingToStars
  },

  props: {
    locationModel: {
      type: Object as PropType<LocationModel>,
      required: true
    }
  },

  setup(props) {
    const locationUrl = computed(() => {
      return `/location/${props.locationModel.id.toString()}`;
    });
    return { locationUrl };
  }
});
</script>

<style></style>
