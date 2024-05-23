<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    @click:outside="handleClickOutside"
  >
    <v-card>
      <v-card-title> Add Exercise </v-card-title>
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
        <v-btn color="blue darken-1" text @click="add(exercise)">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialogOpen: Boolean,
  },
  data() {
    return {
      forceTypes: ["push", "pull", "static"],
      levelTypes: ["beginner", "intermediate", "expert"],
      dialog: false,
      valid: true,
      exercise: {
        name: "",
        force: "Force",
        level: "beginner",
        mechanic: "",
        equipment: "",
        primaryMuscles: [],
        secondaryMuscles: [],
        instructions: [],
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
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
      this.resetForm();
    },
    handleClickOutside() {
      if (this.dialog) {
        this.closeDialog();
      }
    },
    resetForm() {
      this.exercise = {
        name: "",
        force: "Force",
        level: "beginner",
        mechanic: "",
        equipment: "",
        primaryMuscles: [],
        secondaryMuscles: [],
        instructions: [],
        category: "",
      };
      this.$refs.form.resetValidation();
    },
    async add(exercise) {
      await this.$store.dispatch("addExercise", { exercise });
      this.closeDialog();
    },
  },
};
</script>

<style scoped></style>
