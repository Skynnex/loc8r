<template>
  <div class="row">
    <nav class="navbar fixed-top navbar-expand-md navbar-light">
      <div class="container">
        <a class="navbar-brand" href="/">Loc8r</a>
        <button class="navbar-toggler" type="button" @click="toggleNavbar()">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse" :class="{ collapse: navbarCollapsed }">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="/about/">About</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Navbar",
  setup() {
    const navbarCollapsed = ref(true);
    function toggleNavbar() {
      navbarCollapsed.value = !navbarCollapsed.value;
    }
    return { navbarCollapsed, toggleNavbar };
  }
});
</script>

<style></style>
