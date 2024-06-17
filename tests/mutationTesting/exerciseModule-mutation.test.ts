import { mutations } from "../../src/Infostore/modules/exercisesModule";
import { Exercise } from "../../src/Infostore/modules/exercisesModule";

describe("Exercise Module Mutations", () => {
  let state;
  let initialExercises: Exercise[];
  let initialExerciseSearch: Exercise[];
  let editedExercise: Exercise;

  beforeEach(() => {
    state = {
      exercises: [],
      exerciseSearch: [],
      exerciseDetail: null,
    };

    initialExercises = [
      {
        _id: "1",
        name: "Exercise 1",
        force: "Force 1",
        level: "Level 1",
        mechanic: "Mechanic 1",
        equipment: "Equipment 1",
        primaryMuscles: ["Muscle 1"],
        secondaryMuscles: ["Muscle 2"],
        instructions: ["Instruction 1"],
        category: "Category 1",
        cloudImg: "Cloud Image URL 1",
      },
    ];

    initialExerciseSearch = [
      ...initialExercises,
      {
        _id: "2",
        name: "Exercise 2",
        force: "Force 2",
        level: "Level 2",
        mechanic: "Mechanic 2",
        equipment: "Equipment 2",
        primaryMuscles: ["Muscle 3"],
        secondaryMuscles: ["Muscle 4"],
        instructions: ["Instruction 2"],
        category: "Category 2",
        cloudImg: "Cloud Image URL 2",
      },
    ];

    editedExercise = {
      _id: "1",
      name: "Edited Exercise 1",
      force: "Edited Force 1",
      level: "Edited Level 1",
      mechanic: "Edited Mechanic 1",
      equipment: "Edited Equipment 1",
      primaryMuscles: ["Edited Muscle 1"],
      secondaryMuscles: ["Edited Muscle 2"],
      instructions: ["Edited Instruction 1"],
      category: "Edited Category 1",
      cloudImg: "Edited Cloud Image URL 1",
    };
  });

  it("setExercises mutation sets the state.exercises correctly", () => {
    mutations.setExercises(state, initialExercises);
    expect(state.exercises).toEqual(initialExercises);
  });

  it("setExerciseSearch mutation sets the state.exerciseSearch correctly", () => {
    mutations.setExerciseSearch(state, initialExerciseSearch);
    expect(state.exerciseSearch).toEqual(initialExerciseSearch);
  });

  it("appendExercises mutation appends exercises to state.exercises correctly", () => {
    mutations.setExercises(state, initialExercises);

    const newExercises: Exercise[] = [
      {
        _id: "3",
        name: "Exercise 3",
        force: "Force 3",
        level: "Level 3",
        mechanic: "Mechanic 3",
        equipment: "Equipment 3",
        primaryMuscles: ["Muscle 5"],
        secondaryMuscles: ["Muscle 6"],
        instructions: ["Instruction 3"],
        category: "Category 3",
        cloudImg: "Cloud Image URL 3",
      },
    ];

    mutations.appendExercises(state, newExercises);

    const expectedExercises = [...initialExercises, ...newExercises];
    expect(state.exercises).toEqual(expectedExercises);
  });

  it("editExercise mutation edits an exercise in state.exerciseSearch correctly", () => {
    mutations.setExerciseSearch(state, initialExerciseSearch);

    mutations.editExercise(state, editedExercise);

    const editedIndex = state.exerciseSearch.findIndex(
      (ex) => ex._id === editedExercise._id
    );
    expect(editedIndex).not.toBe(-1); // Ensure the exercise was found

    if (editedIndex !== -1) {
      expect(state.exerciseSearch[editedIndex]).toEqual(editedExercise);
    }
  });

  it("removeExercise mutation removes an exercise from state.exerciseSearch correctly", () => {
    mutations.setExerciseSearch(state, initialExerciseSearch);

    const exerciseIdToRemove = "1";
    mutations.removeExercise(state, exerciseIdToRemove);

    const remainingExercises = state.exerciseSearch.filter(
      (ex) => ex._id !== exerciseIdToRemove
    );
    expect(state.exerciseSearch).toEqual(remainingExercises);
  });

  it("setExerciseDetail mutation sets the state.exerciseDetail correctly", () => {
    const exerciseDetail: Exercise = {
      _id: "1",
      name: "Exercise Detail 1",
      force: "Force Detail 1",
      level: "Level Detail 1",
      mechanic: "Mechanic Detail 1",
      equipment: "Equipment Detail 1",
      primaryMuscles: ["Muscle Detail 1"],
      secondaryMuscles: ["Muscle Detail 2"],
      instructions: ["Instruction Detail 1"],
      category: "Category Detail 1",
      cloudImg: "Cloud Image URL Detail 1",
    };

    mutations.setExerciseDetail(state, exerciseDetail);
    expect(state.exerciseDetail).toEqual(exerciseDetail);
  });
});
