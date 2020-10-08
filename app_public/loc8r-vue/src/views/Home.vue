<template>
  <div class="container content">
    <div class="row banner">
      <div class="col-12 col-md-8">
        <Suspense>
          <LocationList />
          <template #fallback>Loading...</template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import LocationList from "../components/LocationList.vue";

export default defineComponent({
  name: "Home",
  components: {
    LocationList
  }
});
</script>

<style></style>
