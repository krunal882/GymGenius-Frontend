<!-- this component displays the tabs for the overview , burdon and who response -->
<template>
  <div style="padding: 15px; margin-top: 25px">
    <v-card style="height: auto">
      <!-- tabs -->
      <v-tabs v-model="tab" bg-color="primary" align-tabs="center">
        <v-tab value="one">Overview</v-tab>
        <v-tab value="two">Burden</v-tab>
        <v-tab value="three">WHO response</v-tab>
      </v-tabs>
      <!-- tab content -->
      <v-card-text style="padding-right: 25px; padding-left: 25px">
        <v-window v-model="tab">
          <v-window-item value="one">
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
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
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
