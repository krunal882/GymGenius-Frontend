<template>
  <div style="padding: 15px; margin-top: 25px">
    <v-card style="height: fit-content">
      <v-tabs v-model="tab" bg-color="primary" align-tabs="center">
        <v-tab value="one">History</v-tab>
        <v-tab value="two">Benefits</v-tab>
        <v-tab value="three">Goal</v-tab>
      </v-tabs>

      <v-card-text style="padding-right: 25px; padding-left: 25px">
        <v-window v-model="tab">
          <v-window-item value="one">
            <!-- Render TabContent component when "Item One" tab is clicked -->
            <YogaHistory />
          </v-window-item>

          <v-window-item value="two"> <YogaBenefits /></v-window-item>

          <v-window-item value="three"> <YogaGoal /> </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import YogaHistory from "./YogaHistory.vue";
import YogaBenefits from "./YogaBenefits.vue";
import YogaGoal from "./YogaGoal.vue";
export default {
  data() {
    return {
      tab: null,
    };
  },
  components: {
    YogaHistory,
    YogaBenefits,
    YogaGoal,
  },
};
</script>

<style>
.custom-wrapper {
  margin-left: 20px; /* Set left margin */
  margin-right: 20px; /* Set right margin */
  margin-top: 10px; /* Set top margin */
  margin-bottom: 10px; /* Set bottom margin */
  padding-left: 10px; /* Set left padding */
  padding-right: 10px; /* Set right padding */
  padding-top: 5px; /* Set top padding */
  padding-bottom: 5px; /* Set bottom padding */
}
.card-text {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  line-height: 1.5;
  background-color: #f0f0f0;
  border-radius: 10px;
}
</style>
