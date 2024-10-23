<template>
  <div class="horizontal-scroll-container">
    <div class="horizontal-scroll">
      <v-card
        v-for="poster in posters"
        :key="poster.id"
        class="flex-shrink-0 equal-height-card"
        color="transparent"
        max-width="210px"
        min-height="350px"
        max-height="450px"
        elevation="0"
        tile
        link
        @click="gotoDetail(poster)"
      >
        <v-img :src="imgSrc(poster.poster_path)" height="100%">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
              ></v-progress-circular>
            </v-row>
          </template>
          <div class="poster-title">
            <p class="title font-weight-black text-truncate mb-1">
              {{ poster.title ?? poster.name }}
            </p>
            <v-spacer></v-spacer>
            <v-icon dense class="mr-1 mb-1">mdi-calendar-check</v-icon>
            <span>{{ poster.release_date ?? poster.first_air_date }}</span>
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
                Rate
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
    </div>
    <ModalLoading :dialog="dialog" />
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
      dialog: false,
    };
  },
  methods: {
    imgSrc(imgPath) {
      return apiConfig.originalImage(imgPath);
    },
    gotoDetail(poster) {
      this.dialog = true;
      setTimeout(() => {
        this.dialog = false;
        this.$router.push(poster.media_type === 'movie' ? `movies?id=${poster.id}` : `tv?id=${poster.id}`);
      }, 500);
    }
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

.horizontal-scroll-container {
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  white-space: nowrap;
  padding-bottom: 1rem;
}

.horizontal-scroll {
  display: flex;
  flex-direction: row;
}

.horizontal-scroll-container::-webkit-scrollbar {
  height: 10px;
  cursor: pointer;
}

.horizontal-scroll-container::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
  cursor: pointer;
}

.v-card {
  flex: 0 0 auto;
  margin-right: 10px;
  scroll-snap-align: start;
}
</style>