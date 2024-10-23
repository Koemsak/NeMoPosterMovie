<template>
  <v-container class="fill-height">
    <page-not-found />
  </v-container>
</template>

<script>
import PageNotFound from "../components/NotFound.vue";
export default {
  name: "NotFoundView",
  components: {
    PageNotFound,
  },
};
</script>

<style>
</style>