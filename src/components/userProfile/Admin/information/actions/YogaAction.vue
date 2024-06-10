<!-- this component is for admin to show yoga and provide options to edit , explore and delete -->
<template>
  <v-container fluid>
    <!-- yoga preview card -->
    <v-row>
      <v-col
        v-for="yoga in yogas"
        :key="yoga.id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card class="image-hover-effect mx-auto" width="90%">
          <!-- yoga image -->
          <v-img
            height="200"
            :src="yoga.url_png"
            class="pointer"
            @click="exploreClicked(yoga)"
          >
          </v-img>
          <!-- yoga pose information -->
          <!-- Content container -->
          <v-card-text class="pt-0">
            <v-card-title class="text-center">{{
              yoga.sanskrit_name
            }}</v-card-title>
            <div class="d-flex justify-space-between">
              <div class="mb-2">
                <span class="label"> Category:</span>
                {{ yoga.category_name }}
              </div>
              <div class="mb-2">
                <span class="label">English Name: </span>{{ yoga.english_name }}
              </div>
            </div>
            <div class="mb-2">
              <span class="label">Sanskrit Name: </span>{{ yoga.sanskrit_name }}
            </div>
            <div>
              <span class="label">Translation: </span
              >{{ yoga.translation_name }}
            </div>
          </v-card-text>
          <!-- buttons for explore , remove and edit -->

          <v-card-actions style="justify-content: space-between">
            <v-btn color="orange" @click="exploreClicked(yoga)">Explore</v-btn>
            <v-btn color="primary" @click="editClick(yoga)">
              <v-icon left>mdi-pencil</v-icon> Edit</v-btn
            >
            <v-btn color="error" @click="deleteClick(yoga)">
              <v-icon left>mdi-delete</v-icon> Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    yogas: {
      type: Array,
      required: true,
    },
  },
  methods: {
    //to emit an event to navigate to detail page
    async exploreClicked(yoga) {
      this.$router.push({
        name: "yogaDetail",
        params: { id: yoga._id },
      });
    },
    //to emit an event to navigate to edit page
    editClick(yoga) {
      this.$emit("edit-yoga", yoga);
    },
    //to emit an event to delete the yoga
    deleteClick(yoga) {
      this.$emit("remove-yoga", yoga);
    },
  },
};
</script>

<style scoped>
.image-hover-effect:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
.pointer {
  cursor: pointer;
}
.label {
  font-weight: 500;
}
</style>
