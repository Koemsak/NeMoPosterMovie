import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                lightColor: "#ffffff",
                darkColor: "#282b3e",
                lighterGray: "#f8f8f8",
                lightGray: "#d1d1d1",
                bgLightColor: "#ffffff",
                borderLightGrayColor: "#9a9a9a",
                shadowGrayColor: "#dedddd",
                bgOverlayColor: "#f8f8f8",
                wPrimary: "#0076ff",
                wSecondary: "#aac936",
                primaryColor: "#0076ff",
                hoverBgGray: "#eeeeee",
                bgTable: "#F8FCF1",
                background: "#ededed",
                warning: "#1e2a4f",
            },
            dark: {
                lightColor: "#282b3e",
                darkColor: "#ffffff",
                lighterGray: "#1e2a4f",
                lightGray: "#d1d1d1",
                bgLightColor: "#1c2841",
                borderLightGrayColor: "#49597d",
                shadowGrayColor: "#0c1727",
                bgOverlayColor: "#1a3c6a",
                wPrimary: "#aac936",
                wSecondary: "#0076ff",
                primaryColor: "#aac936",
                hoverBgGray: "#1c2841",
                bgTable: "#1B3C6A",
                background: "#1f1f3a",
                warning: "#f0ad4e",
            },
        },
        options: { customProperties: true },
        dark: false,
    },
});
