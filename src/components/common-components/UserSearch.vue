<!-- this component is for searching functionality , provides the search field for users-->
<template>
  <v-col class="mt-5 d-flex flex-wrap" cols="4">
    <v-text-field
      v-model="searchTerm"
      class="mx-auto"
      dense
      style="max-width: 350px; min-width: 150px"
      placeholder="Search Hear"
      append-outer-icon="mdi-magnify"
      variant="outlined"
      rounded
      @input="handleSearchInput"
    />
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: null,
      searchTimeout: null,
    };
  },
  //this method handles the search input by user and clearing of input field
  methods: {
    handleSearchInput() {
      clearTimeout(this.searchTimeout);
      if (this.searchTerm) {
        this.searchTimeout = setTimeout(() => {
          this.$emit("search", this.searchTerm);
        }, 500);
      } else {
        this.$emit("clearSearch");
      }
    },
  },
};
</script>

<style></style>
