<template>
  <div style="padding: 15px; margin-top: 25px">
    <v-card style="height: auto">
      <v-tabs v-model="tab" bg-color="primary" align-tabs="center">
        <v-tab value="one">Overview</v-tab>
        <v-tab value="two">Burden</v-tab>
        <v-tab value="three">WHO response</v-tab>
      </v-tabs>

      <v-card-text style="padding-right: 25px; padding-left: 25px">
        <v-window v-model="tab">
          <v-window-item value="one">
            <!-- Render TabContent component when "Item One" tab is clicked -->
            <TabContent />
          </v-window-item>
          <v-window-item value="two"> <BurdonContent /></v-window-item>

          <v-window-item value="three"> <WHO /> </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import TabContent from "./TabContent.vue";
import BurdonContent from "./BurdonContent.vue";
import WHO from "./WHO.vue";
export default {
  data() {
    return {
      tab: null,
    };
  },
  components: {
    TabContent,
    BurdonContent,
    WHO,
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
