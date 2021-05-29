import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#34A0A4",
                secondary: "#99D98C",
                tertiary: "#76C893",
                accent: "#82B1FF",
                delete: "#607D8B",
                error: "#FF5252",
                info: "#2196F3",
                success: "#4CAF50",
                warning: "#FFC107",
                backimg: "#B5B2B7",
            },
            custom: {
                primary: "#ffc107",
                secondary: "#ff5722",
                accent: "#009688",
                delete: "#607D8B",
                error: "#ffeb3b",
                info: "#9c27b0",
                success: "#e91e63",
                warning: "#2196f3",
                backimg: "#B5B2B7",
            },
        },
    },

});
