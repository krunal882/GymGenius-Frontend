<!-- this component is for admin to show diet plan and provide options to edit , explore and delete -->
<template>
  <v-container fluid>
    <!-- dietPlan preview card -->
    <v-row class="d-flex flex-wrap">
      <v-col
        v-for="dietPlan in dietPlan"
        :key="dietPlan.id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card width="90%" class="mx-auto image-hover-effect">
          <!-- dietPlan image -->
          <v-img
            class="align-end text-white"
            height="200"
            :src="getImgPath(dietPlan.src, dietPlan.cloudImg)"
            @click="exploreClicked(dietPlan)"
            cover
            alt="pic"
          >
          </v-img>
          <!-- diet plan information -->
          <v-card-title class="text-center plan-name">Plan Name: </v-card-title>
          <v-card-text class="text-center pb-0" style="font-weight: 500">{{
            dietPlan.plan_name
          }}</v-card-text>
          <v-card-text class="d-flex info pb-0">
            <v-card-text style="font-weight: 450" class="p-0"
              >Diet Type: <br />{{ dietPlan.diet_type }}</v-card-text
            >
            <v-card-text style="font-weight: 450" class="p-0"
              >Purpose: <br />{{ dietPlan.purpose }}</v-card-text
            >
          </v-card-text>
          <!-- buttons for explore , remove and edit -->
          <v-card-actions style="justify-content: space-between">
            <v-btn color="orange" @click="exploreClicked(dietPlan)"
              >Explore</v-btn
            >
            <v-btn color="primary" @click="editClick(dietPlan)">
              <v-icon left>mdi-pencil</v-icon> Edit
            </v-btn>
            <v-btn color="error" @click="deleteClick(dietPlan)">
              <v-icon left>mdi-delete</v-icon> Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    dietPlan: {
      type: Array,
      required: true,
    },
  },
  methods: {
    //to emit an event to navigate to detail page
    async exploreClicked(dietPlan) {
      this.$router.push({
        name: "dietDetail",
        params: { id: dietPlan._id },
      });
    },
    //to get image form the local or stored on cloud
    getImgPath(src, cloudImg) {
      if (cloudImg === undefined) {
        return require(`@/assets/img/dietPlan/${src}`);
      } else {
        return cloudImg;
      }
    },
    //to emit an event to navigate to edit page
    editClick(dietPlan) {
      this.$emit("edit-dietPlan", dietPlan);
    },
    //to emit an event to delete the dietPlan
    deleteClick(dietPlan) {
      this.$emit("remove-dietPlan", dietPlan);
    },
  },
};
</script>

<style scoped>
.row-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.plan-name {
  font-size: 20px;
  font-weight: bold;
}

.image-hover-effect:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.image-hover-effect {
  cursor: pointer;
}
</style>
