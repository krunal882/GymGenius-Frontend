<template>
  <div class="d-flex">
    <div>
      <Knob
        v-model="weight"
        :size="200"
        rangeColor="SlateGray"
        valueColor="green"
        :max="200"
        :min="20"
        :step="1"
        aria-label="Weight"
        id="weight"
      />
      <label class="bold-label">Weight: {{ weight }} kg</label>
    </div>
    <div style="margin-left: 100px">
      <Knob
        v-model="height"
        :size="200"
        rangeColor="SlateGray"
        valueColor="green"
        :max="210"
        :min="140"
        :step="1"
        aria-label="height"
        id="height"
      />
      <label class="bold-label">Height: {{ height }} cm</label>
    </div>
    <div style="margin-left: 100px">
      <Knob
        v-model="age"
        :size="200"
        rangeColor="SlateGray"
        valueColor="green"
        :max="120"
        :min="12"
        :step="1"
        aria-label="age"
        id="age"
      />
      <label class="bold-label">Age: {{ age }} year</label>
    </div>
    <div style="margin-left: 50px; width: 148px">
      <v-select
        clearable
        label="Gender"
        v-model="gender"
        :items="['Male', 'Female']"
        variant="outlined"
      ></v-select>
    </div>
    <div class="text-center calculate">
      <v-btn :loading="loading" @click="calculateCalories">
        Calculate Your BMR
        <template v-slot:loader>
          <v-progress-linear indeterminate></v-progress-linear>
        </template>
      </v-btn>
      <div v-if="caloriesResult !== null" class="calories-result mt-5">
        Your BMR is: {{ caloriesResult.toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<script>
import Knob from "primevue/knob";

export default {
  name: "CalorieCalculator",
  components: {
    Knob,
  },
  data() {
    return {
      weight: 50,
      height: 150,
      age: 12,
      gender: "Male",
      loading: false,
      caloriesResult: null,
      activityFactor: 1.2, 
    };
  },
  methods: {
    calculateCalories() {
      this.caloriesResult = null;
      this.loading = true;
      setTimeout(() => {
        let bmr;
        if (this.gender === "Male") {
          bmr =
            88.362 +
            13.397 * this.weight +
            4.799 * this.height -
            5.677 * this.age;
        } else {
          bmr =
            447.593 +
            9.247 * this.weight +
            3.098 * this.height -
            4.33 * this.age;
        }
        const activityFactor = this.activityFactor;
        const totalCalories = bmr * activityFactor;
        this.caloriesResult = totalCalories;
        this.loading = false;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.bold-label {
  font-weight: bold;
  margin-left: 45px;
}
.calorie-result {
  font-weight: bold;
  margin-top: 20px;
}
.calculate {
  margin: auto;
  margin-top: 0px;
  width: fit-content;
  height: 50px;
  font-family: Arial, Helvetica, sans-serif;
}
.calculate:hover span {
  color: white;
}
</style>
