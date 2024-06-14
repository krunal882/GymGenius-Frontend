import { actions } from "../../src/Infostore/modules/exercisesModule";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useToast } from "vue-toast-notification";

jest.mock("vue-toast-notification", () => ({
  useToast: jest.fn(),
}));

describe("exerciseModule actions", () => {
  let mockAxios;
  let mockToast;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);

    mockToast = {
      success: jest.fn(),
      error: jest.fn(),
    };

    (useToast as jest.Mock).mockReturnValue(mockToast);
  });

  afterEach(() => {
    mockAxios.restore();
    jest.clearAllMocks();
  });

  it("addExercise commits data correctly", async () => {
    const commit = jest.fn();
    const exercise = {
      _id: "1",
      name: "Squats",
      category: "legs",
      force: "push",
      level: "beginner",
      mechanic: "compound",
      equipment: "barbell",
      primaryMuscles: ["quadriceps"],
      secondaryMuscles: ["hamstrings"],
      instructions: ["Keep your back straight", "Bend at the knees"],
      cloudImg: "cloudinary.com/image",
    };

    // Mock axios POST request for adding exercise
    mockAxios
      .onPost("http://localhost:3000/exercises/addExercise", exercise)
      .reply(201);

    // Call the action
    await actions.addExercise({ commit }, { exercise });

    // Assert that success toast was called
    expect(mockToast.success).toHaveBeenCalledWith(
      "New Exercise added successfully"
    );
  });

  it("handles server error gracefully during addExercise", async () => {
    const commit = jest.fn();
    const exercise = {
      _id: "1",
      name: "Squats",
      category: "legs",
      force: "push",
      level: "beginner",
      mechanic: "compound",
      equipment: "barbell",
      primaryMuscles: ["quadriceps"],
      secondaryMuscles: ["hamstrings"],
      instructions: ["Keep your back straight", "Bend at the knees"],
      cloudImg: "cloudinary.com/image",
    };

    // Mock axios POST request to simulate server error
    mockAxios
      .onPost("http://localhost:3000/exercises/addExercise", exercise)
      .reply(500);

    // Call the action
    await actions.addExercise({ commit }, { exercise });

    // Assert that no success toast was called
    expect(mockToast.success).not.toHaveBeenCalled();
    // Assert that error toast was called with the appropriate message
    expect(mockToast.error).toHaveBeenCalledWith(
      "An error occurred on the server. Please try again later."
    );
  });

  it("editExercise commits data correctly", async () => {
    const commit = jest.fn();
    const exercise = {
      _id: "1",
      name: "Squats",
      category: "legs",
      force: "push",
      level: "beginner",
      mechanic: "compound",
      equipment: "barbell",
      primaryMuscles: ["quadriceps"],
      secondaryMuscles: ["hamstrings"],
      instructions: ["Keep your back straight", "Bend at the knees"],
      cloudImg: "cloudinary.com/image",
    };

    // Mock axios PATCH request for editing exercise
    mockAxios
      .onPatch(
        `http://localhost:3000/exercises/updateExercise?id=${exercise._id}`,
        exercise
      )
      .reply(200);

    // Call the action
    await actions.editExercise({ commit }, { exercise });

    // Assert that the correct mutation was called
    expect(commit).toHaveBeenCalledWith("editExercise", exercise);
    // Assert that success toast was called
    expect(mockToast.success).toHaveBeenCalledWith(
      " Exercise updated successfully"
    );
  });

  it("handles server error gracefully during editExercise", async () => {
    const commit = jest.fn();
    const exercise = {
      _id: "1",
      name: "Squats",
      category: "legs",
      force: "push",
      level: "beginner",
      mechanic: "compound",
      equipment: "barbell",
      primaryMuscles: ["quadriceps"],
      secondaryMuscles: ["hamstrings"],
      instructions: ["Keep your back straight", "Bend at the knees"],
      cloudImg: "cloudinary.com/image",
    };

    // Mock axios PATCH request to simulate server error
    mockAxios
      .onPatch(
        `http://localhost:3000/exercises/updateExercise?id=${exercise._id}`,
        exercise
      )
      .reply(500);

    // Call the action
    await actions.editExercise({ commit }, { exercise });

    // Assert that no mutation was committed
    expect(commit).not.toHaveBeenCalled();
    // Assert that no success toast was called
    expect(mockToast.success).not.toHaveBeenCalled();
    // Assert that error toast was called with the appropriate message
    expect(mockToast.error).toHaveBeenCalledWith(
      "An error occurred on the server. Please try again later."
    );
  });

  it("removeExercise commits data correctly", async () => {
    const commit = jest.fn();
    const id = "1";

    // Mock axios DELETE request for removing exercise
    mockAxios
      .onDelete(`http://localhost:3000/exercises/deleteExercise?id=${id}`)
      .reply(200);

    // Call the action
    await actions.removeExercise({ commit }, { id });

    // Assert that the correct mutation was called
    expect(commit).toHaveBeenCalledWith("removeExercise", id);
    // Assert that success toast was called
    expect(mockToast.success).toHaveBeenCalledWith(
      " Exercise removed successfully"
    );
  });
});
