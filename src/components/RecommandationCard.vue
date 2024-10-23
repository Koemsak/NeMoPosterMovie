<template>
  <div class="horizontal-scroll-container">
    <div class="horizontal-scroll">
      <v-card
        v-for="recommandation in recommandations"
        :key="recommandation.id"
        class="flex-shrink-0 equal-height-card"
        color="transparent"
        max-width="400px"
        min-height="250px"
        max-height="350px"
        elevation="0"
        tile
        link
        @click="gotoRoute(`?id=${recommandation.id}`)"
      >
        <v-img :src="imgSrc(recommandation.backdrop_path)" height="100%">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate></v-progress-circular>
            </v-row>
          </template>
          <div class="poster-title">
            <p class="title font-weight-black text-truncate mb-1">
              {{ recommandation.title ?? recommandation.name }}
            </p>
            <v-spacer></v-spacer>
            <v-icon dense class="mr-1 mb-1">mdi-calendar-check</v-icon>
            <span>{{
              recommandation.release_date ?? recommandation.first_air_date
            }}</span>
            <v-spacer></v-spacer>
            <span class="body-1 font-weight-black">
              <v-icon
                dense
                :color="
                  (parseFloat(recommandation.vote_average / 10).toFixed(2) *
                    100) /
                    10 >
                  7.5
                    ? 'green'
                    : (parseFloat(recommandation.vote_average / 10).toFixed(2) *
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
                  (parseFloat(recommandation.vote_average / 10).toFixed(2) *
                    100) /
                    10 >
                  7.5
                    ? 'green--text'
                    : (parseFloat(recommandation.vote_average / 10).toFixed(2) *
                        100) /
                        10 >
                      5
                    ? 'orange--text'
                    : 'red--text'
                "
              >
                Rate
                {{
                  parseFloat(
                    (parseFloat(recommandation.vote_average / 10).toFixed(2) *
                      100) /
                      10
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
  props: ["recommandations"],
  components: { ModalLoading },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    imgSrc(imgPath) {
      return apiConfig.multiFaceW1920AndH800Image(imgPath);
    },
    gotoRoute(route) {
      this.dialog = true;
      setTimeout(() => {
        this.$nextTick(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        })

        this.dialog = false;
        this.$router.push(route);
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