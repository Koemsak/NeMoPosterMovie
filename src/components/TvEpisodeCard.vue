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
      >
        <v-img :src=" poster.poster_path !== null ? imgSrc(poster.poster_path) : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'" height="100%">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate></v-progress-circular>
            </v-row>
          </template>
          <div class="poster-eps">
            <small>{{ poster.episode_count }} Eps</small>
          </div>
          <div class="poster-title">
            <p class="title font-weight-black text-truncate mb-1">
              {{ poster.title ?? poster.name }}
            </p>
            <v-spacer></v-spacer>
            <v-icon dense class="mr-1 mb-1">mdi-calendar-check</v-icon>
            <span>{{ poster.release_date ?? poster.air_date }}</span>
          </div>
        </v-img>
      </v-card>
    </div>
  </div>
</template>
  
  <script>
import apiConfig from "@/api/apiConfig";
export default {
  props: ["posters"],
  data() {
    return {};
  },
  methods: {
    imgSrc(imgPath) {
      return apiConfig.originalImage(imgPath);
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

.poster-eps {
  position: absolute;
  aspect-ratio: 1 / 1;
  top: 5px;
  right: 5px;
  padding: 10px;
  border: 2px solid #00000056;
  display: inline-block;
  border-radius: 50%;
  min-width: 20px;
  min-height: 20px;
  padding: 5px;
  background: #00000056;
  color: white;
  text-align: center;
  line-height: 1;
  box-sizing: content-box;
  white-space: nowrap;
  backdrop-filter: blur(20px);
}
.poster-eps:before {
  content: "";
  display: inline-block;
  vertical-align: middle;
  padding-top: 100%;
  height: 0;
}
.poster-eps small {
  display: inline-block;
  vertical-align: middle;
}
</style>