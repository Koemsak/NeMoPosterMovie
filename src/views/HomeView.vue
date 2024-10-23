<template>
  <div>
    <CarouselComponent />
    <!-- Movie Block Scroll -->
    <v-container class="mt-4">
      <div class="d-flex justify-space-between align-center mb-4">
        <h4>LATEST MOVIES</h4>
        <v-btn depressed color="bgOverlayColor" small @click="gotoMovieRoute">View All</v-btn>
      </div>
      <CardScroll :posters="moviePosters" />
    </v-container>

    <!-- TV Block Scroll -->
    <v-container class="mt-2">
      <div class="d-flex justify-space-between align-center mb-4">
        <h4>LATEST TV</h4>
        <v-btn depressed color="bgOverlayColor" small @click="gotoTvRoute">View All</v-btn>
      </div>
      <CardScroll :posters="tvPosters" />
    </v-container>
    <ModalLoading :dialog="dialog" />
  </div>
</template>

<script>
import CarouselComponent from "../components/CarouselSlide.vue";
import CardScroll from "@/components/CardScroll.vue";
import tmdbApi from "@/api/tmdbApi";
import ModalLoading from "@/components/ModalLoading.vue";
export default {
  name: "HomeView",
  components: {
    CarouselComponent,
    CardScroll,
    ModalLoading,
  },
  data: () => ({
    moviePosters: [],
    tvPosters: [],
    dialog: false,
  }),
  methods: {
    movieTrending() {
      tmdbApi.movieTrending({params: {}}).then((res) => {
        this.moviePosters = res.results;
      })
    },
    tvTrending() {
      tmdbApi.tvTrending({params: {}}).then((res) => {
        this.tvPosters = res.results;
      })
    },
    gotoTvRoute() {
      this.dialog = true;
      setTimeout(() => {
        this.$router.push("/tv");
        this.dialog = false;
      }, 500);
    },
    gotoMovieRoute() {
      this.dialog = true;
      setTimeout(() => {
        this.$router.push("/movies");
        this.dialog = false;
      }, 500);
    }
  },
  created() {
    this.movieTrending();
    this.tvTrending();
  },
};
</script>
