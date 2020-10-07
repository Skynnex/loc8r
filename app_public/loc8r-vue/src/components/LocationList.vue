<template>
  <div>
    <Location
      v-for="location in locations"
      :key="location.id"
      :locationModel="location"
    />
    <!-- <Location v-for="location in locationStatic"
      :key="location.id"
      :locationModel="location" 
    /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { LocationModel } from "../models/LocationModel";
import { useLocationService } from "../composables/LocationService";
import Location from "../components/Location.vue";

export default defineComponent({
  name: "LocationList",

  components: {
    Location
  },

  async setup() {
    const location = useLocationService();
    const locations = ref<Array<LocationModel> | null>(null);
    locations.value = await location.list();
    console.log(`Données de locations.value dans LocationList :`);
    console.log(locations.value);
  
    return {
      locations
    };
          //  Le jeu de données statiques qui fonctionne
          // const locationStatic = ref<Array<LocationModel>>([{
        //   id: "123AZE",
        //   name: "Truc",
        //   adress: "123 rue abc",
        //   rating: 3,
        //   facilities: ["abcd", "efgh"],
        //   distance: "200m"
        // },
        // {
        //     id: "123fg",
        //     name: "Abc",
        //     adress: "machin",
        //     rating: 4,
        //     facilities: ["wh", "je", "ap"],
        //     distance: "125"
        //   },
        //   {
        //     id: "456aze",
        //     name: "Def",
        //     adress: "truc",
        //     rating: 3,
        //     facilities: ["wh", "je", "ap"],
        //     distance: "300"
        //   }]);
    
        // return { locationStatic };
  }
});
</script>

<style></style>
