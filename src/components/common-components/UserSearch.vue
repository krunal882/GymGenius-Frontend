<template>
  <v-row justify="center" dense>
    <v-col class="mt-5 d-flex" cols="4">
      <v-text-field
        v-model="searchTerm"
        class="mx-auto"
        dense
        style="max-width: 350px; min-width: 250px"
        placeholder="Type here for search"
        append-outer-icon="mdi-magnify"
        variant="outlined"
        rounded
        @input="handleSearchInput"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: null,
      searchTimeout: null,
    };
  },
  methods: {
    handleSearchInput() {
      clearTimeout(this.searchTimeout);
      if (this.searchTerm) {
        this.searchTimeout = setTimeout(() => {
          this.$emit("search", this.searchTerm);
        }, 500);
      }
    },
  },
};
</script>

<style></style>
