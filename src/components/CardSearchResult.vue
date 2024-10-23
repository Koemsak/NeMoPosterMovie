<template>
  <v-row no-gutters>
    <v-col v-for="(poster, index) in posters" :key="index" class="pa-1" lg="2" md="3" sm="4" cols="6">
      <v-card tile elevation="0" class="equal-height-card" width="100%" height="100%" link @click="goToDetails(poster)">
        <v-img :src="poster.poster_path == null ? require('../assets/no-poster.png') : imgSrc(poster.poster_path)" height="100%">
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
                  (parseFloat(poster.vote_average / 10).toFixed(2) * 100) / 10 >
                  7
                    ? 'green'
                    : (parseFloat(poster.vote_average / 10).toFixed(2) * 100) /
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
                  (parseFloat(poster.vote_average / 10).toFixed(2) * 100) / 10 >
                  7
                    ? 'green--text'
                    : (parseFloat(poster.vote_average / 10).toFixed(2) * 100) /
                        10 >
                      5
                    ? 'orange--text'
                    : 'red--text'
                "
              >
                {{
                  parseFloat(
                    (parseFloat(poster.vote_average / 10).toFixed(2) * 100) / 10
                  ).toFixed(1)
                }}
              </span>
            </span>
          </div>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import apiConfig from "../api/apiConfig";
export default {
  name: "CardSearchResult",
  props: ["posters"],
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
    goToDetails(poster) {
      this.$emit("go-to-detail", poster);
    },
  },
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
</style>