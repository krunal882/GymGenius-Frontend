<template>
  <v-container>
    <v-col v-for="yoga in yoga" :key="yoga.id" cols="4">
      <v-card class="" width="900" style="display: flex">
        <!-- Image container -->
        <div style="flex: 1; padding-right: 16px">
          <v-img height="300" :src="yoga.url_png">
            <v-card-title class="text-center">{{
              yoga.sanskrit_name
            }}</v-card-title>
          </v-img>
        </div>
        <hr
          style="
            height: 100%;
            border: none;
            border-right: 1px solid #ccc;
            margin: 0;
          "
        />

        <!-- Content container -->
        <div style="flex: 1; padding: 16px">
          <v-card-title class="pt-4"
            >Category: {{ yoga.category_name }}</v-card-title
          >
          <div class="d-flex">
            <v-card-text class="pt-4 flex-grow-1"
              >English Name: {{ yoga.english_name }}</v-card-text
            >
            <v-card-text class="pt-4 flex-grow-1"
              >Sanskrit Name: {{ yoga.sanskrit_name }}</v-card-text
            >
          </div>
          <v-card-text
            >Translation of Name: {{ yoga.translation_name }}</v-card-text
          >

          <v-card-actions>
            <!-- Emit an event when the Explore button is clicked -->
            <v-btn color="orange" @click="exploreClicked(yoga)">Explore</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
export default {
  props: {
    yoga: {
      type: Array,
      required: true,
    },
  },
  methods: {
    exploreClicked(yoga) {
      // Emit an event named "explore" when the button is clicked
      this.$emit("explore", yoga);
    },
  },
};
</script>
