<template>
  <div>
    <Navbar />
    <Home />
    <div class="container">
      <FooterPage />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "@/components/Navbar.vue";
import FooterPage from "@/components/Footer.vue";
import Home from "./views/Home.vue";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
    FooterPage,
    Home
  }
});
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~font-awesome/css/font-awesome.min.css";
@import "/stylesheets/style.css";
</style>
