<template>
  <v-dialog v-model="dialog" max-width="1500">
    <!-- Adjusted max-width to 800 for a larger dialog -->
    <v-card>
      <v-card-title> Edit DietPlan </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <div class="d-flex flex-wrap">
            <v-text-field
              label="Name"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              label="Category"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              label="Force"
              required
              variant="outlined"
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              label="Level"
              required
              variant="outlined"
              class="mb-4"
            ></v-text-field>
          </div>
          <h4>Meals</h4>
          <div v-for="(index, key) in rows" :key="key">
            <div class="d-flex flex-wrap">
              <v-select
                :items="Days"
                label="Day"
                required
                variant="outlined"
                class="mr-4 mb-4"
              ></v-select>
              <v-select
                :items="time"
                label="meal time"
                variant="outlined"
                required
                class="mr-4 mb-4"
              ></v-select>
            </div>
            <h4>Meals</h4>
            <div class="d-flex flex-wrap">
              <v-text-field
                label="item name"
                variant="outlined"
                required
                class="mr-4 mb-4"
              ></v-text-field>
              <v-text-field
                label="Quantity"
                variant="outlined"
                required
                class="mr-4 mb-4"
              ></v-text-field>
            </div>
            <div class="d-flex flex-wrap">
              <v-text-field
                label="Calories"
                type="number"
                variant="outlined"
                min="0"
                required
                class="mr-4 mb-4"
              ></v-text-field>
              <v-text-field
                label="Protein (g)"
                type="number"
                variant="outlined"
                required
                min="0"
                class="mr-4 mb-4"
              ></v-text-field>
              <v-text-field
                label="Carbohydrates (g)"
                type="number"
                variant="outlined"
                required
                min="0"
                class="mr-4 mb-4"
              ></v-text-field>
              <v-text-field
                label="Fat (g)"
                type="number"
                variant="outlined"
                min="0"
                required
                class="mr-4 mb-4"
              ></v-text-field>
              <v-text-field
                label="Fiber (g)"
                type="number"
                min="0"
                variant="outlined"
                required
                class="mb-4"
              ></v-text-field>
            </div>
          </div>
          <div class="d-flex flex-wrap">
            <v-btn color="primary" @click="addRow">Add</v-btn>
            <div class="ml-4"></div>
            <v-btn color="error" @click="removeRow">Remove</v-btn>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1">Cancel</v-btn>
        <v-btn color="blue darken-1">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    dietPlanData: Object,
    dialogOpen: Boolean,
  },
  data() {
    return {
      dialog: true,
      rows: 1,
      Days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      time: ["Breakfast", "Lunch", "Dinnner"],
    };
  },
  methods: {
    addRow() {
      this.rows++;
    },
    removeRow() {
      if (this.rows > 1) {
        this.rows--;
      }
    },
    cancel() {},
    save() {},
  },
};
</script>
