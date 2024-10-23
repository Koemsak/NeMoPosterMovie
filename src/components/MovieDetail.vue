<template>
  <v-container>
    <v-btn
      elevation="0"
      color="warning"
      outlined
      icon
      class="mb-5"
      @click="$router.go(-1)"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-card
      elevation="0"
      color="transparent"
      :style="{
        backgroundImage: `linear-gradient(to bottom, ${
          isDark ? 'rgba(4, 5, 46, 0.4)' : 'rgba(255, 255, 255, 0.3)'
        }, var(--v-background-base)), url(${srcImg(detail.backdrop_path)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }"
    >
      <v-row class="pa-3 ma-0" justify="center">
        <v-col cols="6" xl="2" lg="3" md="3" sm="4">
          <v-card elevation="0" tile class="equal-height-card">
            <v-hover v-slot="{ hover }">
              <v-img
                :src="imgSrc500(detail.poster_path)"
                transition="scale-transition"
                :style="{
                  transition: 'opacity 0.3s ease-in-out',
                }"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate></v-progress-circular>
                  </v-row>
                </template>
                <div
                  v-if="videos.length > 0"
                  class="full-height d-flex align-center justify-center"
                  :class="{ 'show-blur': hover }"
                >
                  <v-dialog v-model="dialog" persistent max-width="850px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        x-large
                        icon
                        :class="{ 'show-btn': hover }"
                        v-bind="attrs"
                        v-on="on"
                        @click.prevent.stop="openYouTubeModel"
                      >
                        <v-icon
                          color="darkColor"
                          v-if="hover"
                          :class="{ 'show-btn': hover }"
                          >mdi-play-circle</v-icon
                        >
                      </v-btn>
                    </template>
                    <v-card class="pa-0" color="transparent">
                      <!-- Close button at the top of card -->
                      <v-btn
                        elevation="0"
                        icon
                        small
                        @click.prevent.stop="closeDialog"
                        class="close-btn"
                      >
                        <v-icon color="error">mdi-close</v-icon>
                      </v-btn>

                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="">
                            <div class="iframe-container">
                              <img
                                :src="mediaURL"
                                v-if="!isVideo"
                                alt="mediaUrl"
                              />
                              <iframe
                                class="iframe-video"
                                allow="accelerometer; autoplay;"
                                allowfullscreen
                                title="YouTube video player"
                                v-if="isVideo"
                                :src="mediaURL"
                              ></iframe>
                            </div>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-dialog>
                </div>
              </v-img>
            </v-hover>
          </v-card>
        </v-col>
        <v-col cols="12" xl="10" lg="9" md="9" sm="12">
          <v-card
            elevation="0"
            tile
            color="transparent"
            class="equal-height-card"
          >
            <p
              class="font-weight-black mb-1 darkColor--text"
              :class="$vuetify.breakpoint.mdAndUp ? 'display-1' : 'title'"
            >
              {{ detail.title ?? detail.name }}&nbsp;
              <span>
                ({{
                  detail.release_date
                    ? detail.release_date.split("-")[0]
                    : detail.first_air_date
                    ? detail.first_air_date.split("-")[0]
                    : "N/A"
                }})
              </span>
            </p>

            <p
              class="text-lg-h6 text-md-h6 text-sm-body-2 darkColor--text font-weight-light font-italic mb-2"
              v-if="detail.tagline"
            >
              {{ detail.tagline }}
            </p>

            <p class="borderLightGrayColor--text mt-0 mb-0">
              <v-chip
                color="light"
                :small="$vuetify.breakpoint.mdAndDown"
                label
                text-color="warning"
              >
                <v-icon left size="16"> mdi-star-outline </v-icon>
                <span class="font-weight-bold" style="margin-top: 1px">
                  {{
                    parseFloat(
                      (parseFloat(detail.vote_average / 10).toFixed(2) * 100) /
                        10
                    ).toFixed(1)
                  }}
                </span>
              </v-chip>
            </p>

            <div class="d-flex align-center">
              <small
                class="text-small text-sm-body-2 mb-0 warning--text text-capitalize"
                >Release Date:</small
              >
              <p class="darkColor--text mt-0 font-weight-bold mb-0 ml-2 mb-1">
                {{ detail.release_date ?? detail.first_air_date }}
              </p>
            </div>

            <div class="d-flex align-center">
              <small
                class="text-small text-sm-body-2 mb-0 warning--text text-capitalize"
                >Duration:</small
              >
              <p class="darkColor--text mt-0 font-weight-bold mb-1 ml-2">
                {{ detail.runtime ? `${detail.runtime} min` : "N/A" }}
              </p>
            </div>

            <div class="d-flex align-center">
              <small
                class="text-small text-sm-body-2 mb-0 warning--text text-capitalize me-1"
                >Genres:</small
              >
              <p class="darkColor--text mt-0 mb-1">
                <v-chip
                  color="darkColor"
                  link
                  outlined
                  small
                  v-for="genre in detail.genres"
                  :key="genre.id"
                  text-color="darkColor"
                  class="text-capitalize mt-1 mr-1"
                >
                  {{ genre.name }}
                </v-chip>
              </p>
            </div>

            <div class="d-flex align-center">
              <small class="text-small text-sm-body-2 mb-0 warning--text me-1"
                >Countries:</small
              >
              <p class="darkColor--text mt-0 mb-1">
                <v-chip
                  color="darkColor"
                  link
                  outlined
                  small
                  v-for="lang in detail.production_countries"
                  :key="lang.iso_3166_1"
                  text-color="darkColor"
                  class="text-capitalize mt-1 mr-1"
                >
                  {{ lang.name }}
                </v-chip>
              </p>
            </div>

            <div class="d-flex">
              <small
                class="text-small text-sm-body-2 warning--text text-capitalize me-1"
                >Overview:
                <span class="darkColor--text font-weight-normal">
                  {{ detail.overview == "" ? "N/A" : detail.overview }}
                </span>
              </small>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <v-spacer></v-spacer>
    <!-- Actor avatar -->
    <p>{{ credit && credit.cast.length > 0 ? "Actors:" : "" }}</p>
    <actor-card
      v-if="credit && credit.cast.length > 0"
      :actings="credit.cast"
    />

    <v-spacer></v-spacer>

    <!-- Crew avatar -->
    <p class="mt-4">{{ credit && credit.crew.length > 0 ? "Crews:" : "" }}</p>
    <actor-card
      v-if="credit && credit.crew.length > 0"
      :actings="credit.crew"
    />

    <v-spacer></v-spacer>

    <!-- Recommandation Movie -->
    <p class="mt-4">
      {{
        recommandations && recommandations.length > 0
          ? "Recommendation Movie:"
          : ""
      }}
    </p>
    <recommandation-card
      v-if="recommandations && recommandations.length > 0"
      :recommandations="recommandations"
    />
  </v-container>
</template>

<script>
import tmdbApi, { category } from "@/api/tmdbApi";
import apiConfig from "@/api/apiConfig";
import ActorCard from "./ActorCard.vue";
import RecommandationCard from "./RecommandationCard.vue";
export default {
  name: "CarouselDetail",
  props: ["detail", "credit"],
  components: {
    ActorCard,
    RecommandationCard,
  },
  data() {
    return {
      recommandations: [],
      videos: [],
      isVideo: false,
      mediaURL: "",
      dialog: false,
      videoKey: "",
    };
  },
  methods: {
    srcImg(imgPath) {
      return apiConfig.multiFacew1000AndH450Image(imgPath);
    },
    imgSrc500(imgPath) {
      return apiConfig.w500Image(imgPath);
    },
    recommandationsList(id) {
      if (id == "" || id == null || id == undefined) {
        return;
      }
      tmdbApi
        .recommendation(category.movie, id)
        .then((res) => {
          this.recommandations = res.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    videoHandler(id) {
      if (id == "" || id == null || id == undefined) {
        return;
      }
      tmdbApi
        .videoDetails(category.movie, id)
        .then((res) => {
          this.videos = res.results;
          if (this.videos.length > 0) {
            this.videos = this.videos.filter((video) => video.type == "Trailer");
            this.videoKey = this.videos[0].key;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openYouTubeModel() {
      this.mediaURL = this.youtubeVideo();
      this.isVideo = true;
    },
    youtubeVideo() {
      if (this.videos && this.videos.length > 0) {
        return `https://www.youtube.com/embed/${this.videoKey}?autoplay=1`;
      }
    },
    closeDialog() {
      this.mediaURL = "";
      this.dialog = false;
      this.isVideo = false;
      this.videoKey = "";
    },
  },
  computed: {
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "auto";
        case "sm":
          return "auto";
        case "md":
          return "auto";
        case "lg":
          return "450px";
        case "xl":
          return "500px";
        default:
          return "400px";
      }
    },
    isDark() {
      return this.$vuetify.theme.dark;
    },
  },
  created() {
    this.recommandationsList(this.$route.query.id);
    this.videoHandler(this.$route.query.id);
  },
  watch: {
    $route() {
      this.recommandationsList(this.$route.query.id);
      this.videoHandler(this.$route.query.id);
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

.show-btn {
  color: #00ff11 !important;
  opacity: 1 !important;
  transition: opacity 0.2s ease-in-out;
  z-index: 1;
}
.show-blur {
  background: rgb(0, 0, 0, 0.6) !important;
  backdrop-filter: blur(1px) !important;
  height: 100%;
}
.iframe-container {
  overflow: hidden;
  padding-top: 70%;
  position: relative;
}

.iframe-container iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.close-btn {
  position: absolute;
  backdrop-filter: blur(10px);
  background: white !important;
  top: 5px;
  right: 5px;
  z-index: 1;
}
.v-dialog__content {
  height: 100% !important;
  box-shadow: none !important;
}
</style>