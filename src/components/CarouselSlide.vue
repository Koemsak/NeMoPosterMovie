<template>
  <v-container>
    <v-carousel cycle show-arrows-on-hover hide-delimiters>
      <v-carousel-item
        v-for="(item, i) in slides"
        :key="i"
        :src="srcImg(item.backdrop_path)"
        link
        @click="gotoRoute(item)"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate></v-progress-circular>
          </v-row>
        </template>
        <v-row class="fill-height" align="end" justify="center">
          <div
            class="text-center bg-opacity"
            :class="{ 'dark-theme': isDark, 'light-theme': !isDark }"
          >
            <div class="display-2 text-lg-h3 text-md-h4 text-sm-h5 text-h5">
              {{ item.title ?? item.name }}
            </div>
            <div class="subtitle-1 truncate-text">{{ item.overview }}</div>
            <div class="text-center d-flex align-center justify-center">
              <div
                class="text-caption"
                :class="`${ratingColor(item.vote_average).color}--text`"
              >
                ({{
                  parseFloat(
                    (parseFloat(item.vote_average / 10).toFixed(2) * 100) / 10
                  ).toFixed(1)
                }})
              </div>

              <v-rating
                :value="starRating(item.vote_average)"
                :color="ratingColor(item.vote_average).color"
                :background-color="ratingColor(item.vote_average).bgColor"
                half-increments
                length="10"
                readonly
                size="12"
              ></v-rating>
            </div>
          </div>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <ModalLoading :dialog="dialog" />
  </v-container>
</template>

<script>
import tmdbApi from "@/api/tmdbApi";
import apiConfig from "@/api/apiConfig";
import ModalLoading from "./ModalLoading.vue";
export default {
  components: { ModalLoading },
  data() {
    return {
      items: [
        {
          title: "Blink Twice",
          desc: "When tech billionaire Slater King meets cocktail waitress Frida at his fundraising gala, he invites her to join him and his friends on a dream vacation on his private island. But despite the epic setting, beautiful people, ever-flowing champagne, and late-night dance parties, Frida can sense that there’s something sinister hiding beneath the island’s lush façade.",
          src: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/wSZbtiFIK1fkKZdSRtn2kz2Ttfd.jpg",
        },
        {
          title: "Slide 2",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          title: "Slide 3",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          title: "Slide 4",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
      slides: [],
      dialog: false,
    };
  },
  methods: {
    movieSlides() {
      tmdbApi.trendingAllDay({ params: {} }).then((res) => {
        this.slides = res.results;
      });
    },
    srcImg(imgPath) {
      return apiConfig.multiFacew1000AndH450Image(imgPath);
    },
    starRating(rating) {
      const rate = parseFloat(
        (parseFloat(rating / 10).toFixed(2) * 100) / 10
      ).toFixed(2);
      const decimal = rate - Math.floor(rate);
      if (decimal > 0.75) {
        return Math.ceil(rate);
      } else if (decimal > 0.0 && decimal <= 0.75) {
        return Math.floor(rate) + 0.5;
      } else {
        return Math.floor(rate);
      }
    },
    ratingColor(rating) {
      const rate = parseFloat(
        (parseFloat(rating / 10).toFixed(2) * 100) / 10
      ).toFixed(2);
      if (rate >= 7) {
        return {
          color: "green",
          bgColor: "green darken-1",
        };
      } else if (rate >= 5) {
        return {
          color: "blue",
          bgColor: "blue darken-1",
        };
      } else {
        return {
          color: "red",
          bgColor: "red darken-1",
        };
      }
    },
    gotoRoute(item) {
      this.dialog = true;

      setTimeout(() => {
        this.dialog = false;
        // Construct the route dynamically based on media_type
        let route = "";
        if (item.media_type === "movie") {
          route = `/movies?id=${item.id}`;
        } else {
          route = `/${item.media_type}?id=${item.id}`;
        }
        // Perform navigation and handle possible navigation errors
        this.$router.push(route).catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            console.error(err); // Log other possible navigation errors
          }
        });
      }, 500);
    },
  },
  computed: {
    isDark() {
      return this.$vuetify.theme.dark;
    },
  },
  created() {
    this.movieSlides();
  },
};
</script>

<style scoped>
.bg-opacity {
  background: #0000004d;
  backdrop-filter: blur(20px);
  border-radius: 0;
  padding: 10px 50px !important;
  max-width: 90%;
  color: #ffffff;
}

.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>