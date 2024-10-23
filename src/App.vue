<template>
  <v-app>
    <v-navigation-drawer
      v-model="sidebar"
      color="lighterGray"
      absolute
      left
      temporary
    >
      <v-img
        :src="require('./assets/m-logo.png')"
        alt="Logo"
        class="mx-auto"
        width="50"
        style="cursor: pointer;"
        @click="$router.push({ path: '/' })"
      ></v-img>

      <v-divider class="my-2"></v-divider>

      <v-list dense rounded nav>
        <v-list-item-group>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="{ path: item.path }"
            active-class="warning--text"
          >
            <v-list-item-icon>
              <v-icon left>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="app-bar" color="lighterGray" elevation="1">
      <span class="hidden-md-and-up" @click="sidebar = !sidebar">
        <v-app-bar-nav-icon> </v-app-bar-nav-icon>
      </span>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <v-btn icon class="hidden-md-and-up" @click="toggleSearch">
        <v-icon dark> mdi-magnify </v-icon>
      </v-btn>
      <v-btn icon color="warning" @click="toggleMode" class="hidden-md-and-up">
        <v-icon>{{
          isDark ? "mdi-white-balance-sunny" : "mdi-weather-night"
        }}</v-icon>
      </v-btn>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink ml-2 hidden-sm-and-down"
          contain
          :src="require('./assets/m-logo.png')"
          transition="scale-transition"
          width="50"
          style="cursor: pointer;"
          @click="$router.push({ path: '/' })"
        />
      </div>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <div class="hidden-sm-and-down">
        <v-btn
          active-class="warning--text"
          v-for="(item, index) in items"
          :key="index"
          :to="{ path: item.path }"
          text
          tile
          raised
          class="ma-1 bg-opacity"
        >
          <v-icon left dark> {{ item.icon }} </v-icon> {{ item.title }}
        </v-btn>

        <v-btn text tile raised class="ma-1 bg-opacity" @click="toggleSearch">
          <v-icon left dark> mdi-magnify </v-icon> SEARCH
        </v-btn>

        <v-btn icon raised color="warning" @click="toggleMode">
          <v-icon>{{
            isDark ? "mdi-white-balance-sunny" : "mdi-weather-night"
          }}</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Show dialog search -->
    <v-main>
      
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          :width="
            $vuetify.breakpoint.sm || $vuetify.breakpoint.xs ? '100%' : '90%'
          "
          scrollable
          transition="dialog-bottom-transition"
        >
          <v-card
            height="100dvh"
            :class="isDark ? 'search-modal-dark' : 'search-modal-light'"
            class="pa-0 card-shadow rounded-b-0"
            elevation="5"
          >
            <v-card-title class="pa-0">
              <v-text-field
                v-model="searchText"
                label="Search"
                elevation="0"
                hide-details
                class="px-2 pb-2"
                autofocus
                darken-4
                @input="performSearch"
              >
                <template v-slot:prepend>
                  <v-icon @click="dialog = false">mdi-chevron-left</v-icon>
                </template>
              </v-text-field>
            </v-card-title>
            <v-card-text class="pa-0 scroll-dialog" @scroll="handleScroll">
              <v-row
                class="fill-height ma-0"
                align-content="center"
                justify="center"
                v-if="searchLoading"
              >
                <v-col
                  class="text-lg-subtitle-1 text-md-subtitle-1 text-sm-small text-center lightColor--text"
                  cols="12"
                >
                  Please wait a moment ...
                </v-col>
                <v-col lg="3" md="4" sm="6" cols="10">
                  <v-progress-linear
                    color="lightColor"
                    indeterminate
                    rounded
                    height="6"
                  ></v-progress-linear>
                </v-col>
              </v-row>

              <CardSearchResult v-else :posters="searchResult" @go-to-detail="gotoRouteDetails" />

              <!-- Loading spinner when fetching new data -->
              <v-row v-if="loadingMore">
                <v-col cols="12" class="text-center">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-col>
              </v-row>

              <!-- Show message when no data found -->
              <v-row
                v-if="searchResult.length == 0 && !searchLoading"
                class="fill-height ma-0"
                align-content="center"
                justify="center"
              >
                <v-col cols="12" class="text-center">
                  <p
                    class="text-lg-subtitle-1 text-md-subtitle-1 text-sm-small"
                  >
                    No result found
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>

      <div class="scroll-container">
        <router-view />
      </div>
    </v-main>

    <ModalLoading :dialog="loader" />
  </v-app>
</template>

<script>
import ModalLoading from "./components/ModalLoading.vue";
import tmdbApi from "./api/tmdbApi";
import CardSearchResult from "./components/CardSearchResult.vue";
export default {
  name: "App",
  components: { ModalLoading, CardSearchResult },
  data: () => ({
    loader: false,
    sidebar: false,
    items: [
      { title: "HOME", icon: "mdi-home-assistant", path: "/" },
      { title: "MOVIES", icon: "mdi-film", path: "/movies" },
      { title: "TV SHOW", icon: "mdi-cctv", path: "/tv" },
    ],
    searchText: "",
    searchResult: [],
    currentSearchPage: 1,
    totalPages: 1,
    searchLoading: false,
    loadingMore: false,
    dialog: false,
    messageShow: false,
  }),
  computed: {
    isDark() {
      return this.$vuetify.theme.dark;
    },
  },
  methods: {
    toggleSearch() {
      this.dialog = true;
      this.searchText = "";
      this.searchResult = [];
    },
    toggleMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("mode", this.$vuetify.theme.dark ? "dark" : "light");
    },
    gotoRoute(route) {
      this.loader = true;
      setTimeout(() => {
        this.loader = false;
        this.$router.push(route);
      }, 500);
    },
    performSearch() {
      this.currentSearchPage = 1; // Reset to first page
      this.searchResult = []; // Clear previous search results
      this.searchLoading = true; // Set the loading state

      tmdbApi
        .search({
          params: { query: this.searchText, page: this.currentSearchPage },
        })
        .then((res) => {
          // filter res.results with media_type == movie or tv
          this.searchResult = res.results.filter((result) => {
            return result.media_type == "movie" || result.media_type == "tv";
          });
          this.totalPages = res.total_pages;
          this.searchLoading = false;
        })
        .catch(() => {
          this.searchLoading = false;
          this.messageShow = true;
        });
    },
    loadMoreResults() {
      this.loadingMore = true;
      this.currentSearchPage++;
      tmdbApi
        .search({
          params: { query: this.searchText, page: this.currentSearchPage },
        })
        .then((response) => {
          this.searchResult = this.searchResult.concat(
            response.results.filter((result) => {
              return result.media_type == "movie" || result.media_type == "tv";
            })
          ); // Append new results
          this.loadingMore = false; // End loading state
        })
        .catch(() => {
          this.loadingMore = false;
          this.messageShow = true;
        });
    },
    handleScroll(event) {
      const container = event.target;
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight
      ) {
        // Load next page only if there are more pages and not currently loading
        if (this.currentSearchPage < this.totalPages && !this.loadingMore) {
          this.loadMoreResults();
        }
      }
    },
    gotoRouteDetails(value) {
      this.dialog = false;
      this.$router.push(value.media_type === "movie" ? `movies?id=${value.id}` : `tv?id=${value.id}`);
    }
  },
  created() {
    const mode = localStorage.getItem("mode");
    if (mode) {
      this.$vuetify.theme.dark = mode === "dark";
    }
  },
  watch: {
    $route() {},
  },
};
</script>
<style >
html,
body {
  height: 100%;
  overflow: hidden; /* Prevent body from scrolling */
}

.v-application {
  background: var(--v-background-base) !important;
}
.scroll-container {
  height: calc(100vh - 64px); /* Adjust for app-bar height */
  overflow-y: auto; /* Enable scrolling for the content area */
}

.scroll-container::-webkit-scrollbar {
  width: 5px;
}
.scroll-container::-webkit-scrollbar:hover {
  width: 8px;
}

.scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: var(--v-borderLightGrayColor-base);
  border-radius: 4px;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: var(--v-borderLightGrayColor-base);
}

.scroll-dialog {
  overflow-y: auto !important; /* Enable scrolling for the content area */
}

.scroll-dialog::-webkit-scrollbar {
  width: 5px !important;
}
.scroll-dialog::-webkit-scrollbar:hover {
  width: 8px !important;
}

.scroll-dialog::-webkit-scrollbar-track {
  background: transparent !important;
}

.scroll-dialog::-webkit-scrollbar-thumb {
  background: var(--v-borderLightGrayColor-base) !important;
  border-radius: 4px !important;
}

.scroll-dialog::-webkit-scrollbar-thumb:hover {
  background: var(--v-borderLightGrayColor-base) !important;
}

.search-modal-dark {
  background: rgba(255, 255, 255, 0.3) !important;
  backdrop-filter: blur(10px);
}
.search-modal-light {
  background: rgba(0, 0, 0, 0.3) !important;
  backdrop-filter: blur(10px);
}

.v-overlay__scrim {
  background-color: rgb(0, 0, 0) !important;
}

.v-dialog {
  margin: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}
.v-dialog__content {
  height: auto !important;
}

</style>