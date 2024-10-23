<template>
  <v-row align-content="center" class="fill-height" justify="center">
    <v-dialog max-width="400" elevation="0" v-model="localDialog" persistent>
      <v-card color="transparent" elevation="0" class="pa-5">
        <v-card-text class="text-center" justify="center">
          <span class="loader"></span>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "ModalLoading",
  props: ["dialog"],
  data() {
    return {
      localDialog: this.dialog,
    };
  },
  watch: {
    dialog() {
      this.localDialog = this.dialog;
    },
    localDialog() {
      this.$emit("update:dialog", this.localDialog);
    },
  },
};
</script>

<style scoped>
.v-dialog__content {
  height: 100% !important;
  box-shadow: none !important;
}

.loader {
  width: 8px;
  height: 40px;
  border-radius: 4px;
  display: block;
  margin: 20px auto;
  position: relative;
  background: currentColor;
  color: #fff;
  box-sizing: border-box;
  animation: animloader 0.3s 0.3s linear infinite alternate;
}

.loader::after,
.loader::before {
  content: "";
  width: 8px;
  height: 40px;
  border-radius: 4px;
  background: currentColor;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
  box-sizing: border-box;
  animation: animloader 0.3s 0.45s linear infinite alternate;
}
.loader::before {
  left: -20px;
  animation-delay: 0s;
}

@keyframes animloader {
  0% {
    height: 48px;
  }
  100% {
    height: 4px;
  }
}
</style>