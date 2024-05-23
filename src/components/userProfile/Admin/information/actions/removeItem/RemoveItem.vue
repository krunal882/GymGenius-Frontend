<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="6">
        <v-dialog
          v-model="dialog"
          transition="dialog-bottom-transition"
          width="auto"
          @click:outside="handleClickOutside"
        >
          <template v-slot:default="{}">
            <v-card class="dialog-card">
              <v-toolbar dark color="primary">
                <v-toolbar-title class="text-uppercase"
                  >Confirm remove</v-toolbar-title
                >
              </v-toolbar>

              <v-card-text class="text-body-1 pa-12">
                Are you sure you want to remove item?
              </v-card-text>

              <v-card-actions class="justify-end">
                <v-btn color="primary" text @click="closeDialog">Cancel</v-btn>
                <v-btn color="error" text @click="remove()">Remove</v-btn>
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
    item: Object,
    dialogOpen: Boolean,
    action: String,
  },
  data() {
    return {
      dialog: false,
      Item: "",
    };
  },

  watch: {
    dialogOpen(value) {
      this.dialog = value;
      if (value && this.item) {
        this.initializeFormFields();
      }
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.$emit("close-dialog");
    },
    async remove() {
      await this.$store.dispatch(this.action, { id: this.Item._id });
      this.closeDialog();
    },
    handleClickOutside() {
      if (this.dialog) {
        this.closeDialog();
      }
    },
    initializeFormFields() {
      this.Item = { ...this.item };
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
