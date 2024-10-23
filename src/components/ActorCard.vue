<template>
  <div class="horizontal-scroll-container">
    <div class="horizontal-scroll">
      <v-card
        v-for="(acting, index) in actings"
        :key="index"
        class="flex-shrink-0 equal-height-card"
        color="transparent"
        max-width="130px"
        min-height="210px"
        max-height="210px"
        elevation="0"
        tile
      >
        <v-img
          :src="
            acting.profile_path
              ? imgSrc(acting.profile_path)
              : 'https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg'
          "
          height="100%"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate></v-progress-circular>
            </v-row>
          </template>
          <div class="title-block">
            <small class="small text-truncate mb-1">
              {{ acting.title ?? acting.name }}
            </small>
            <br />
            <small class="small text-truncate">{{ acting.character ?? acting.known_for_department }}</small>
          </div>
        </v-img>
      </v-card>
    </div>
  </div>
</template>
  
  <script>
import apiConfig from "@/api/apiConfig";
export default {
  props: ["actings"],
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

.title-block {
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
}
</style>