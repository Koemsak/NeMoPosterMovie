<template>
  <v-container>
    <v-row class="fill-height ma-0" align-content="center" justify="center">
      <v-col cols="12" sm="8">
        <v-img
          class="mx-auto"
          width="300px"
          src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-page-not-available-illustration-download-in-svg-png-gif-file-formats--found-pack-science-technology-illustrations-7706458.png?f=webp"
        ></v-img>

        <div class="text-center">
          <h1 class="display-1 font-weight-thin mb-3">404</h1>

          <p class="font-weight-light">
            The page you’re looking for doesn’t exist.
          </p>
          <v-spacer></v-spacer>
  
          <v-btn text color="primary" link @click="$router.go(-1)" class="mx-auto">Back to Home</v-btn>
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>