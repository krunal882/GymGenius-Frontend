<template>
  <div class="d-flex flex-wrap justify-center">
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
    <div style="margin-left: 5%">
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
    <div class="text-center mt-5" style="margin-left: 5%">
      <v-btn :loading="loading" @click="calculateBMI">
        Calculate Your BMI
        <template v-slot:loader>
          <v-progress-linear indeterminate></v-progress-linear>
        </template>
      </v-btn>
      <div v-if="bmiResult !== null" class="bmi-result">
        Your BMI is: {{ bmiResult.toFixed(2) }}
        <div style="width: 210px">
          <p v-if="bmiResult < 18.5">You are underweight.</p>
          <p v-else-if="bmiResult < 25">You have a healthy weight.</p>
          <p v-else-if="bmiResult < 30">You are overweight.</p>
          <p v-else-if="bmiResult < 40">You are obese.</p>
          <p v-else>You are severely obese.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Knob from "primevue/knob";

export default {
  name: "KnobDemo",
  components: {
    Knob,
  },
  data() {
    return {
      weight: 50,
      height: 150,
      loading: false,
      bmiResult: null,
    };
  },
  methods: {
    calculateBMI() {
      this.loading = true;
      setTimeout(() => {
        const heightMeters = this.height / 100;
        const bmi = this.weight / (heightMeters * heightMeters);
        this.bmiResult = bmi;
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
.bmi-result {
  font-weight: bold;
  margin-top: 20px;
}
</style>
