<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="6">
        <v-dialog
          v-model="dialogIsActive"
          transition="dialog-bottom-transition"
          width="auto"
          :persistent="false"
        >
          <template v-slot:default>
            <v-card class="dialog-card">
              <v-toolbar dark color="primary">
                <v-toolbar-title class="text-uppercase"
                  >Confirm Delete</v-toolbar-title
                >
              </v-toolbar>

              <v-card-text class="text-body-1 pa-12">
                Are you sure you want to Delete User Account?
              </v-card-text>

              <v-card-actions class="justify-end">
                <v-btn color="primary" text @click="closeDialog">Cancel</v-btn>

                <v-btn color="error" text @click="Delete">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    id: String,
    dialog: Boolean,
  },
  data() {
    return {
      dialogIsActive: this.dialog,
    };
  },
  watch: {
    dialog(val) {
      this.dialogIsActive = val;
    },
    dialogIsActive(val) {
      this.$emit("update:dialog", val);
    },
  },
  methods: {
    closeDialog() {
      this.dialogIsActive = false;
    },
    Delete() {
      const userId = this.id;
      const role = this.$store.state.userModule.role;
      this.$store.dispatch("userDelete", { id: userId, role, master: "true" });
      this.dialogIsActive = false;
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
