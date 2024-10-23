<template>
  <v-container fluid class="mt-4">
    <CardDetail :detail="detail" :credit="credits" v-if="detail && $route.query.id" />
    <div v-else>
      <v-row justify="space-between" class="pa-2">
        <v-col cols="6" lg="9" md="8" sm="4">
          <div :class="headerResponsive">{{ headerTitle }}</div>
        </v-col>
        <v-col cols="6" lg="3" md="4" sm="8">
          <v-autocomplete
            v-model="value"
            :items="types"
            prepend-inner-icon="mdi-filter-variant"
            outlined
            rounded
            dense
            label="Filter By"
            @change="movieList(value)"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <genres-chip
        v-if="value == 'All'"
        :type="type"
        @genre-added="addGenre"
        @genre-removed="removeGenre"
      />
      <poster-card :posters="moviePosters"></poster-card>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="totalPages"
          :total-visible="7"
          color="borderLightGrayColor"
          @input="movieList(value)"
        ></v-pagination>
      </div>
    </div>
  </v-container>
</template>

<script>
import { movieType, category } from "@/api/tmdbApi";
import tmdbApi from "@/api/tmdbApi";
import useGenres from "@/api/useGenres";

import PosterCard from "@/components/PosterCard.vue";
import GenresChip from "@/components/GenresChip.vue";
import CardDetail from "@/components/MovieDetail.vue";
export default {
  components: { PosterCard, GenresChip, CardDetail },
  name: "MovieView",
  data() {
    return {
      headerTitle: "All Movies",
      types: ["All", "Now Playing", "Popular", "Top Rated", "Upcoming"],
      value: "All",
      moviePosters: [],
      page: 1,
      totalPages: 0,
      type: category.movie,
      selectedGenre: [],
      genreString: "",
      detail: null,
      credits: null,
    };
  },
  methods: {
    movieList(type) {
      let param = {
        page: this.page,
        language: "en-US",
        with_genres: this.genreString,
      };
      switch (type) {
        case "Now Playing":
          this.genreString = "";
          this.headerTitle = "Now Playing";
          this.value = "Now Playing";
          tmdbApi
            .getMoviesList(movieType.now_playing, { params: param })
            .then((res) => {
              this.moviePosters = res.results;
              this.totalPages = res.total_pages > 500 ? 500 : res.total_pages;
            });
          break;
        case "Popular":
          this.genreString = "";
          this.headerTitle = "Popular";
          this.value = "Popular";
          tmdbApi
            .getMoviesList(movieType.popular, { params: param })
            .then((res) => {
              this.moviePosters = res.results;
              this.totalPages = res.total_pages > 500 ? 500 : res.total_pages;
            });
          break;
        case "Top Rated":
          this.genreString = "";
          this.headerTitle = "Top Rated";
          this.value = "Top Rated";
          tmdbApi
            .getMoviesList(movieType.top_rated, { params: param })
            .then((res) => {
              this.moviePosters = res.results;
              this.totalPages = res.total_pages > 500 ? 500 : res.total_pages;
            });
          break;
        case "Upcoming":
          this.genreString = "";
          this.headerTitle = "Upcoming";
          this.value = "Upcoming";
          tmdbApi
            .getMoviesList(movieType.upcoming, { params: param })
            .then((res) => {
              this.moviePosters = res.results;
              this.totalPages = res.total_pages > 500 ? 500 : res.total_pages;
            });
          break;
        default:
          this.headerTitle = "All Movies";
          this.value = "All";
          tmdbApi.discover(category.movie, { params: param }).then((res) => {
            this.moviePosters = res.results;
            this.totalPages = res.total_pages > 500 ? 500 : res.total_pages;
          });
          break;
      }
    },
    addGenre(value) {
      this.selectedGenre.push(value);
      this.genreString = useGenres(this.selectedGenre);
      this.movieList(this.value);
    },
    removeGenre(value) {
      this.selectedGenre = this.selectedGenre.filter(
        (genre) => genre.id !== value.id
      );
      this.genreString = useGenres(this.selectedGenre);
      this.movieList(this.value);
    },
    detailMovie(id) {
      if (id == "" || id == null || id == undefined) {
        this.detail = null;
      } else {
        tmdbApi
          .detail(category.movie, id, { params: {} })
          .then((res) => {
            this.detail = res;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    creditDetails(id) {
      if (id == "" || id == null || id == undefined) {
        this.credits = null;
      } else {
        tmdbApi
          .credits(category.movie, id)
          .then((res) => {
            this.credits = res;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  computed: {
    headerResponsive() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return "headline";
      } else {
        return "text-h5";
      }
    },
  },
  created() {
    this.movieList(this.value);
    this.detailMovie(this.$route.query.id);
    this.creditDetails(this.$route.query.id);
  },
  watch: {
    $route() {
      this.movieList(this.value);
      this.detailMovie(this.$route.query.id);
      this.creditDetails(this.$route.query.id);
    },
  },
};
</script>

<style>
</style>