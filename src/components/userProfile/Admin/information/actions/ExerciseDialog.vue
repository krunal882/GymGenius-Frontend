<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    @click:outside="handleClickOutside"
  >
    <!-- Adjusted max-width to 800 for a larger dialog -->
    <v-card>
      <v-card-title> Edit Exercise </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <div class="d-flex flex-wrap">
            <v-text-field
              :rules="Rules"
              v-model="exercise.name"
              label="Name"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              :rules="Rules"
              v-model="exercise.category"
              label="Category"
              variant="outlined"
              required
              class="mb-4"
            ></v-text-field>
          </div>
          <div class="d-flex">
            <v-select
              v-model="exercise.force"
              :items="forceTypes"
              label="Force"
              required
              variant="outlined"
              class="mr-4 mb-4"
            ></v-select>
            <v-select
              v-model="exercise.level"
              :items="levelTypes"
              label="Level"
              required
              variant="outlined"
              class="mb-4"
            ></v-select>
          </div>
          <div class="d-flex">
            <v-text-field
              :rules="Rules"
              v-model="exercise.mechanic"
              label="Mechanic"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              :rules="Rules"
              v-model="exercise.equipment"
              variant="outlined"
              label="Equipment"
              required
              class="mb-4"
            ></v-text-field>
          </div>
          <div class="d-flex flex-wrap justify-space-between">
            <v-text-field
              :rules="Rules"
              v-model="exercise.primaryMuscles"
              label="Primary Muscles"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              v-model="exercise.secondaryMuscles"
              label="Secondary Muscles"
              variant="outlined"
              class="mb-4"
            ></v-text-field>
          </div>

          <v-textarea
            :rules="Rules"
            v-model="exercise.instructions"
            label="Instructions"
            variant="outlined"
            required
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save(exercise)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    exerciseData: Object,
    dialogOpen: Boolean,
  },
  data() {
    return {
      forceTypes: ["push", "pull", "static"],
      levelTypes: ["beginner", "intermediate", "expert"], // Values for the level types
      dialog: false,
      valid: true,
      exercise: {
        name: "",
        force: "Force",
        level: "beginner",
        mechanic: "",
        equipment: "",
        primaryMuscles: "",
        secondaryMuscles: "",
        instructions: "",
        category: "",
      },
      Rules: [
        (v) => !!v || "Field is Required",
        (v) => (v.trim && !!v.trim()) || "Field cannot contain only spaces",
      ],
    };
  },
  watch: {
    dialogOpen(value) {
      this.dialog = value;
      if (value && this.exerciseData) {
        this.initializeFormFields();
      }
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    handleClickOutside() {
      if (this.dialog) {
        this.closeDialog();
      }
    },
    initializeFormFields() {
      this.exercise = { ...this.exerciseData };
    },
    cancel() {
      this.dialog = true;
      this.$refs.form.reset();
    },
    async save(exercise) {
      const id = exercise._id;
      delete exercise._id;
      await this.$store.dispatch("editExercise", { id, exercise });
    },
  },
};
</script>
<style scoped></style>
