<template>
  <v-row justify="center" dense>
    <v-col class="mt-5" cols="4">
      <v-text-field
        v-model="selectedItem"
        class="mx-auto"
        dense
        placeholder="Type what you need"
        append-outer-icon="mdi-magnify"
        style="max-width: 500px"
        variant="outlined"
        rounded
      >
        <template v-slot:append>
          <div class="button">
            <v-btn @click="search" color="success">Search</v-btn>
            <v-btn class="ml-5" @click="add" color="primary">Add</v-btn>
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
    };
  },
  methods: {
    search() {
      this.$emit("search", this.selectedItem);
    },
    add() {
      this.$emit("add");
    },
  },
};
</script>

<style scoped></style>
