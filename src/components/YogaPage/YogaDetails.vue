<template>
  <v-card class="" width="900" style="display: flex">
    <!-- Image container -->
    <div style="flex: 1; padding-right: 16px; position: relative">
      <v-img height="300" :src="yoga.url_png">
        <v-card-title class="text-center">{{
          yoga.sanskrit_name_adapted
        }}</v-card-title>
      </v-img>
      <!-- Pose Benefits -->
      <div
        style="
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: rgba(255, 255, 255, 0.8);
          padding: 16px;
        "
      >
        <v-card-title class="pt-4"> Pose Benefits:</v-card-title>
        <v-card-text>{{ yoga.pose_benefits }}</v-card-text>
        <v-card-title class="pose-description">
          Category Description:
        </v-card-title>
        <v-card-text>{{ yoga.category_description }}</v-card-text>
      </div>
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
    <div style="flex: 1; padding: 16px; overflow: auto">
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
      <v-card-title class="pt-4">Pose Description:</v-card-title>
      <v-card-text class="pose-description">
        {{ yoga.pose_description }}
      </v-card-text>

      <v-card-actions>
        <!-- Emit an event when the Explore button is clicked -->
        <v-btn color="orange" @click="exploreClicked">Go Back</v-btn>
        <v-btn color="orange" @click="bookmark(yoga)">Bookmark</v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    yoga: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      images: [],
    };
  },
  methods: {
    exploreClicked() {
      // Emit an event named "explore" when the button is clicked
      this.$emit("explore");
    },
    bookmark(yoga) {
      const userId = this.$store.state.userModule.userId;
      console.log(userId, yoga._id);
      const yogaId = yoga._id;
      this.$store.dispatch("bookmarkItem", {
        userId,
        itemId: yogaId,
        itemType: "yoga",
      });
    },
  },
};
</script>
