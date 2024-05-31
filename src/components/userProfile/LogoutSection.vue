<!-- this component is for logout operation -->
<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="6">
        <v-dialog
          v-model="dialogIsActive"
          transition="dialog-bottom-transition"
          width="auto"
        >
          <template v-slot:default="{ isActive }">
            <v-card class="dialog-card">
              <v-toolbar dark color="primary">
                <v-toolbar-title class="text-uppercase"
                  >Confirm Logout</v-toolbar-title
                >
              </v-toolbar>

              <v-card-text class="text-body-1 pa-12">
                Are you sure you want to logout?
              </v-card-text>

              <v-card-actions class="justify-end">
                <router-link to="/profile">
                  <v-btn color="primary" text @click="isActive.value = false"
                    >Cancel</v-btn
                  >
                </router-link>
                <v-btn color="error" text @click="logout">Logout</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Cookies from "js-cookie";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

export default {
  data() {
    return {
      dialogIsActive: false,
    };
  },
  mounted() {
    this.dialogIsActive = true;
  },
  methods: {
    //when logout clicked then stored token will be set empty and redirect to home page
    logout() {
      Cookies.set("token", "");
      this.$router.replace("/GymGenius");
      useToast().success("You've been successfully logged out. See you soon!");
    },
  },
};
</script>

<style scoped>
.dialog-card {
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.v-card__text {
  padding: 16px;
}

.v-btn {
  margin-left: 8px;
}
</style>
