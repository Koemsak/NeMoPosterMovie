<template>
  <v-container fluid class="mt-4">
    <tv-detail
      :detail="detail"
      :credit="credits"
      v-if="detail && $route.query.id"
    />
    <div v-else>
      <v-row justify="space-between" class="pa-2">
        <v-col cols="6">
          <div :class="headerResponsive">{{ headerTitle }}</div>
        </v-col>
        <v-col cols="6" lg="3" md="4" sm="6">
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
import { tvType, category } from "@/api/tmdbApi";
import tmdbApi from "@/api/tmdbApi";
import useGenres from "@/api/useGenres";

import PosterCard from "@/components/PosterCard.vue";
import GenresChip from "@/components/GenresChip.vue";
import TvDetail from "@/components/TvDetail.vue";
export default {
  components: { PosterCard, GenresChip, TvDetail },
  name: "MovieView",
  data() {
    return {
      headerTitle: "All Movies",
      types: ["All", "Airing Today", "Popular", "On The Air", "Top Rated"],
      value: "All",
      moviePosters: [],
      page: 1,
      totalPages: 0,
      type: category.tv,
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
        case "Airing Today":
          this.headerTitle = "Airing TV Series Today";
          this.value = "Airing Today";
          tmdbApi
            .getTvList(tvType.airing_today, { params: param })
            .then((res) => {
              this.moviePosters = res.results;
              this.totalPages = res.total_pages > 500 ? 500 : res.total_pages;
            });
          break;
        case "Popular":
          this.headerTitle = "Popular TV Series";
          this.value = "Popular";
          tmdbApi.getTvList(tvType.popular, { params: param }).then((res) => {
            this.moviePosters = res.results;
            this.totalPages = res.total_pages > 500 ? 500 : res.total_pages;
          });
          break;
        case "Top Rated":
          this.headerTitle = "Top Rated TV Series";
          this.value = "Top Rated";
          tmdbApi.getTvList(tvType.top_rated, { params: param }).then((res) => {
            this.moviePosters = res.results;
            this.totalPages = res.total_pages > 500 ? 500 : res.total_pages;
          });
          break;
        case "On The Air":
          this.headerTitle = "On The Air TV Series";
          this.value = "On The Air";
          tmdbApi
            .getTvList(tvType.airing_today, { params: param })
            .then((res) => {
              this.moviePosters = res.results;
              this.totalPages = res.total_pages > 500 ? 500 : res.total_pages;
            });
          break;
        default:
          this.headerTitle = "All TV Series";
          this.value = "All";
          tmdbApi.discover(category.tv, { params: param }).then((res) => {
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
    detailSeries(id) {
      if (id == "" || id == null || id == undefined) {
        this.detail = null;
      } else {
        tmdbApi
          .detail(category.tv, id, { params: {} })
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
          .credits(category.tv, id)
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
    this.detailSeries(this.$route.query.id);
    this.creditDetails(this.$route.query.id);
  },
  watch: {
    $route() {
      this.movieList(this.value);
      this.detailSeries(this.$route.query.id);
      this.creditDetails(this.$route.query.id);
    },
  }
};
</script>
  
  <style>
</style>