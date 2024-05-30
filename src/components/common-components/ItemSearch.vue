<!-- component is for search and adding new item functionality , provides search-field and  button-->
<template>
  <v-row justify="center" dense>
    <v-col class="mt-5 d-flex flex-wrap" cols="12" sm="4">
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
          <div class="d-none d-sm-flex">
            <v-btn class="ml-5" @click="add" color="primary">Add New</v-btn>
          </div>
        </template>
      </v-text-field>
      <div class="d-flex d-sm-none ml-5 mt-3">
        <v-btn @click="add" color="primary">Add New</v-btn>
      </div>
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
    // to handle the case when user search something or clear the search field
    handleSearchInput() {
      clearTimeout(this.searchTimeout);
      if (this.selectedItem) {
        this.searchTimeout = setTimeout(() => {
          const selectedItem = this.selectedItem;
          this.$emit("search", selectedItem);
        }, 500);
      } else {
        this.$emit("clearSearch");
      }
    },
    // to add new item
    add() {
      this.$emit("add");
    },
  },
};
</script>

<style scoped></style>
