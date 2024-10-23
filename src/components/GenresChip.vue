<template>
  <div class="text-center mb-4">
    <v-chip
      v-for="genre in genres"
      :key="genre.id"
      color="red"
      :small="$vuetify.breakpoint.smAndDown"
      :outlined="!genresSelected.includes(genre)"
      :close="genresSelected.includes(genre)"
      @click="handleAddGenre(genre)"
      @click:close="handleRemoveGenre(genre)"
      class="ma-1"
    >
      {{ genre.name }}
    </v-chip>
  </div>
</template>

<script>
import tmdbApi from "@/api/tmdbApi";
export default {
  name: "GenresChip",
  props: ["type"],
  data() {
    return {
      genres: [],
      genresSelected: [],
    };
  },
  methods: {
    listOfGenres() {
      let param = {
        language: "en-US",
      };
      tmdbApi.genresList(this.type, { params: param }).then((res) => {
        this.genres = res.genres;
      });
    },
    handleAddGenre(selectedGenre) {
      if (!this.genresSelected.includes(selectedGenre)) {
        this.genresSelected.push(selectedGenre);
        this.$emit("genre-added", selectedGenre);
      }
    },
    handleRemoveGenre(selectedGenre) {
      this.genresSelected = this.genresSelected.filter(
        (genre) => genre.id !== selectedGenre.id
      );
      this.$emit("genre-removed", selectedGenre);
    },
  },
  created() {
    this.listOfGenres();
  },
};
</script>

<style>
</style>