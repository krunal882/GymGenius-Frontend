<template>
  <v-container
    class="ml-10"
    style="width: 332px; margin-right: 0px; margin-top: 25px"
  >
    <div class="row">
      <div
        class="col-md-3 col-sm-3 col-xs-12"
        style="width: 300px; margin-right: 0px"
      >
        <v-card outlined>
          <v-card-title>Price Filters</v-card-title>
          <v-divider></v-divider>
          <v-checkbox
            v-model="highToLowChecked"
            label="High-to-Low"
          ></v-checkbox>
          <v-checkbox
            v-model="lowToHighChecked"
            label="Low-to-High"
          ></v-checkbox>

          <v-divider></v-divider>
          <v-card-title>Price</v-card-title>
          <v-range-slider
            v-model="range"
            :max="max"
            :min="min"
            :height="10"
            class="align-center"
            dense
          ></v-range-slider>
          <v-row class="pa-2" dense>
            <v-col cols="12" sm="5">
              <v-text-field
                v-model="minValue"
                label="Min"
                outlined
                dense
                @change="$set(range, 0, $event)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <p class="pt-2 text-center">TO</p>
            </v-col>
            <v-col cols="12" sm="5">
              <v-text-field
                v-model="maxValue"
                label="Max"
                outlined
                dense
                @change="$set(range, 1, $event)"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <div class="container d-flex justify-center align-item-center pb-5">
            <v-btn
              color="primary darken-2"
              class="me-4 tonal"
              @click="applyFilters"
            >
              Apply
            </v-btn>
            <v-btn color="error darken-2" @click="handleReset"> Clear </v-btn>
          </div>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      range: [0, 10000],
      min: 0,
      max: 10000,
      items: [],
      highToLowChecked: false,
      lowToHighChecked: false,
    };
  },
  computed: {
    minValue() {
      return this.range[0].toFixed(0); // Format min value
    },
    maxValue() {
      return this.range[1].toFixed(0); // Format max value
    },
  },
  methods: {
    applyFilters() {
      // Apply filters logic goes here
      console.log("Filters applied");
    },
    handleReset() {
      // Reset all filter values to defaults
      this.range = [0, 10000];
      this.highToLowChecked = false;
      this.lowToHighChecked = false;
    },
  },
};
</script>

<style scoped>
.bg-image {
  background-size: cover;
  background-position: center;
}
</style>
