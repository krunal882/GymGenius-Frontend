<!-- this component is for admin to see exercise , yoga , foodItem and dietPlan -->
<template>
  <h3 class="text-center">Information Section</h3>
  <div>
    <v-card>
      <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
        <v-tab :value="1">Exercises</v-tab>
        <v-tab :value="2">Yoga Poses</v-tab>
        <v-tab :value="3">Diet Plans</v-tab>
        <v-tab :value="4">Food Nutrition</v-tab>
      </v-tabs>
    </v-card>

    <v-card>
      <!-- different components for different tabs -->
      <v-tabs-window v-model="tab">
        <v-tabs-window-item>
          <template v-if="tab === 1">
            <ExerciseAdmin />
          </template>
          <template v-if="tab === 2">
            <YogaAdmin />
          </template>
          <template v-if="tab === 3">
            <DietAdmin />
          </template>
          <template v-if="tab === 4">
            <NutritionAdmin />
          </template>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </div>
</template>

<script>
import ExerciseAdmin from "./information/ExerciseAdmin.vue";
import YogaAdmin from "./information/YogaAdmin.vue";
import NutritionAdmin from "./information/NutritionAdmin.vue";
import DietAdmin from "./information/DietAdmin.vue";
export default {
  components: {
    ExerciseAdmin,
    YogaAdmin,
    NutritionAdmin,
    DietAdmin,
  },
  data() {
    return {
      tab: null,
    };
  },
};
</script>

<style></style>
