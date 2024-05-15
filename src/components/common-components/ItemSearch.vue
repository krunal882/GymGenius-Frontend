<template>
  <v-row justify="center" dense>
    <v-col class="mt-5 d-flex" cols="4">
      <v-text-field
        v-model="selectedItem"
        class="mx-auto"
        dense
        placeholder="Type what you need"
        append-outer-icon="mdi-magnify"
        style="max-width: 350px; min-width: 250px"
        variant="outlined"
        rounded
        @input="handleSearchInput"
      >
        <template v-slot:append>
          <div class="button">
            <v-btn class="ml-5" @click="add" color="primary">Add New</v-btn>
          </div>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: null,
      searchTimeout: null,
    };
  },
  methods: {
    handleSearchInput() {
      clearTimeout(this.searchTimeout);
      if (this.selectedItem) {
        this.searchTimeout = setTimeout(() => {
          this.$emit("search", this.selectedItem);
        }, 500);
      }
    },
    add() {
      this.$emit("add");
    },
  },
};
</script>

<style scoped></style>
