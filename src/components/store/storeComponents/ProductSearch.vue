<template>
  <v-row justify="center" dense>
    <v-col class="mt-5 d-flex" cols="4">
      <v-text-field
        v-model="selectedItem"
        class="mx-auto"
        dense
        placeholder="Type what you need"
        append-outer-icon="mdi-magnify"
        style="max-width: 350px"
        variant="outlined"
        rounded
      >
        <template v-slot:append>
          <v-btn @click="search" color="success">Search</v-btn>
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
    };
  },
  methods: {
    search() {
      this.$emit("search", this.selectedItem);
    },
  },
};
</script>

<style></style>
