<template>
  <div class="d-flex flex-wrap justify-center">
    <div class="mb-4">
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
    <div class="mb-4" style="margin-left: 40px">
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
    <div class="mb-4" style="margin-left: 40px">
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
    <div class="mb-4" style="margin-left: 40px">
      <v-select
        clearable
        label="Gender"
        v-model="gender"
        :items="['Male', 'Female']"
        variant="outlined"
      ></v-select>
    </div>
    <div class="mb-4" style="margin-left: 40px">
      <v-select
        clearable
        label="Activity Factor"
        v-model="activityFactor"
        :items="[1.2, 1.375, 1.55, 1.725, 1.9]"
        variant="outlined"
      ></v-select>
    </div>
    <div class="text-center mt-4 calculate">
      <v-btn :loading="loading" @click="calculateFat">
        Calculate Body Fat
        <template v-slot:loader>
          <v-progress-linear indeterminate></v-progress-linear>
        </template>
      </v-btn>
      <div v-if="fatResult !== null" class="calories-result mt-5">
        Your Body Fat Percentage :
        {{ calculateBodyFatPercentage().toFixed(2) }}%
      </div>
    </div>
  </div>
</template>

<script>
import Knob from "primevue/knob";

export default {
  name: "FatCalculator",
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
      fatResult: null,
      activityFactor: 1.2, 
    };
  },
  methods: {
    calculateFat() {
      this.fatResult = null;
      this.loading = true;
      setTimeout(() => {
        let bmr;
        if (this.gender === "Male") {
          bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age + 5;
        } else {
          bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age - 161;
        }
        const activityFactor = this.activityFactor;
        const totalCalories = bmr * activityFactor;
        this.fatResult = totalCalories;
        this.loading = false;
      }, 1000);
    },
    calculateBodyFatPercentage() {
      const bmi = this.weight / ((this.height / 100) * (this.height / 100));
      const age = this.age;
      const gender = this.gender === "Male" ? 1 : 0;
      const bodyFatPercentage = 1.2 * bmi + 0.23 * age - 10.8 * gender - 5.4;
      return bodyFatPercentage;
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
