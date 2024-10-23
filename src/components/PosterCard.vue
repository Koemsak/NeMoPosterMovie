<template>
  <div>
    <v-row no-gutters>
      <v-col
        v-for="poster in posters"
        :key="poster.id"
        cols="6"
        lg="2"
        md="3"
        sm="4"
        xs="6"
        class="pa-2"
      >
        <v-card
          tile
          elevation="0"
          class="equal-height-card flex-grow-1 card-with-gradient"
          min-height="300px"
          :height="$vuetify.breakpoint.mdAndUp ? '410px' : '300px'"
          max-height="450px"
          link
          @click="detailMovieOrTv(poster.id)"
        >
          <v-img :src="imgSrc(poster.poster_path)" height="100%">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate></v-progress-circular>
              </v-row>
            </template>
            <div class="poster-title">
              <p class="title text-truncate mb-1">
                {{ poster.title ?? poster.name }}
              </p>
              <v-spacer></v-spacer>
              <span>
                {{
                  formattedDate(poster.release_date ?? poster.first_air_date)
                }}</span
              >
              <v-spacer></v-spacer>
              <span class="body-1 font-weight-black">
                <v-icon
                  dense
                  :color="
                    (parseFloat(poster.vote_average / 10).toFixed(2) * 100) /
                      10 >
                    7
                      ? 'green'
                      : (parseFloat(poster.vote_average / 10).toFixed(2) *
                          100) /
                          10 >
                        5
                      ? 'orange'
                      : 'red'
                  "
                  class="mr-1 mb-1"
                  >mdi-star</v-icon
                >
                <span
                  :class="
                    (parseFloat(poster.vote_average / 10).toFixed(2) * 100) /
                      10 >
                    7
                      ? 'green--text'
                      : (parseFloat(poster.vote_average / 10).toFixed(2) *
                          100) /
                          10 >
                        5
                      ? 'orange--text'
                      : 'red--text'
                  "
                >
                  {{
                    parseFloat(
                      (parseFloat(poster.vote_average / 10).toFixed(2) * 100) /
                        10
                    ).toFixed(1)
                  }}
                </span>
              </span>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <modal-loading :dialog="isLoading" />
  </div>
</template>

<script>
import apiConfig from "@/api/apiConfig";
import ModalLoading from "./ModalLoading.vue";
export default {
  props: ["posters"],
  components: { ModalLoading },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    imgSrc(imgPath) {
      return apiConfig.originalImage(imgPath);
    },
    formattedDate(dateString) {
      if (!dateString) {
        return "No date available";
      }

      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }

      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);
    },
    detailMovieOrTv(id) {
      this.isLoading = true;
      setTimeout(() => {
        this.$router.push(`?id=${id}`);
        this.isLoading = false;
      }, 500);
    },
  },
  computed: {},
};
</script>

<style scoped>
.equal-height-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.poster-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 50px 10px 10px 10px;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--v-background-base),
    var(--v-background-base)
  );
  font-size: 14px;
  font-weight: bold;
}
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8); /* semi-transparent background */
  z-index: 1000; /* Make sure it covers everything */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>