<template>
  <div class="d-flex justify-content-center align-items-center">
    <v-container class="ml-10" style="width: 152px; padding-bottom: 15px">
      <div class="d-flex align-items-center">
        <v-chip color="blue">
          <v-icon
            class="menu-icon"
            @click="toggleFilter"
            style="color: black; font-size: 24px"
            >mdi-menu</v-icon
          >
          <span
            class="ml-1 menu-icon"
            style="color: black"
            @click="toggleFilter"
          >
            Filters</span
          >
        </v-chip>
      </div>
      <transition name="filter" :duration="{ enter: 1000, leave: 500 }">
        <form
          v-if="showFilter"
          @submit.prevent="submit"
          class="row filter-section"
        >
          <div class="row">
            <div
              class="col-md-3 col-sm-3 col-xs-12"
              style="
                width: 300px;
                margin-right: 0px;
                position: relative;
                z-index: 100;
              "
            >
              <v-card outlined>
                <v-card-title>Filter Food Items</v-card-title>
                <v-divider></v-divider>
                <v-select
                  v-model="selectedCategory"
                  :items="categories"
                  hint="Pick a category"
                  label="Select"
                  persistent-hint
                ></v-select>
                <v-divider></v-divider>
                <v-select
                  v-model="selectedItem"
                  :items="itemsInSelectedCategory"
                  hint="Pick your favorite item"
                  label="Select"
                  multiple
                  persistent-hint
                ></v-select>
              </v-card>
            </div>
            <div
              class="col-md-3 col-sm-3 col-xs-12"
              style="width: 300px; margin-right: 0px"
            >
              <v-card outlined>
                <v-card-title>Filter By Nutritional</v-card-title>
                <v-divider></v-divider>
                <v-range-slider
                  style="width: 250px"
                  label="calories"
                  v-model="caloriesRange"
                  :max="maxCalories"
                  :min="minCalories"
                  :height="10"
                  class="align-center"
                  dense
                  step="1"
                ></v-range-slider>
                <v-row class="pa-2" dense>
                  <v-col cols="12" sm="5">
                    <v-text-field
                      v-model="caloriesRange[0]"
                      label="Min"
                      outlined
                      dense
                      @change="$set(caloriesRange, 0, $event)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2">
                    <p class="pt-2 text-center">TO</p>
                  </v-col>
                  <v-col cols="12" sm="5">
                    <v-text-field
                      v-model="caloriesRange[1]"
                      label="Max"
                      outlined
                      dense
                      @change="$set(caloriesRange, 1, $event)"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-range-slider
                  style="width: 250px"
                  label="protein"
                  v-model="proteinRange"
                  :max="maxProtein"
                  :min="minProtein"
                  :height="10"
                  class="align-center"
                  dense
                  step="1"
                ></v-range-slider>
                <v-row class="pa-2" dense>
                  <v-col cols="12" sm="5">
                    <v-text-field
                      v-model="proteinRange[0]"
                      label="Min"
                      outlined
                      dense
                      @change="$set(proteinRange, 0, $event)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2">
                    <p class="pt-2 text-center">TO</p>
                  </v-col>
                  <v-col cols="12" sm="5">
                    <v-text-field
                      v-model="proteinRange[1]"
                      label="Max"
                      outlined
                      dense
                      @change="$set(proteinRange, 1, $event)"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <div class="col text-center pb-3">
                  <v-btn
                    color="primary darken-2"
                    class="me-4 tonal"
                    @click="applyFilters"
                    >Apply</v-btn
                  >
                  <v-btn color="error darken-2" @click="handleReset"
                    >Clear</v-btn
                  >
                </div>
              </v-card>
            </div>
          </div>
        </form>
      </transition>
    </v-container>
  </div>
</template>

<script>
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
export default {
  data() {
    return {
      showFilter: false,
      caloriesRange: [20, 500],
      minCalories: 20,
      maxCalories: 500,

      proteinRange: [0, 20],
      minProtein: 0,
      maxProtein: 20,

      selectedCategory: [],
      selectedItem: [],
      categories: ["Dairy", "Vegetable", "Grain", "Fruit"],
      items: {
        Dairy: [
          "Milk",
          "Cheese",
          "Yogurt",
          "Butter",
          "Cream",
          "Sour Cream ",
          "Cottage Cheese ",
          "Cream Cheese ",
          "Ricotta Cheese",
          "Mascarpone ",
          "Kefir ",
          "Ice Cream",
          "Sherbet ",
          "Frozen Yogurt",
        ],
        Vegetable: [
          "pinach",
          "Broccoli ",
          "Kale",
          "Carrots",
          "Bell Peppers ",
          "Cabbage ",
          "Brussels Sprouts ",
          "Swiss Chard ",
          "Asparagus",
          "Sweet Potatoes",
          "Cauliflower",
          "Garlic",
          "Onions",
          "Zucchini",
          "Eggplant",
          "Beets ",
          "Celery ",
        ],
        Grain: [
          "Rice ",
          " Wheat",
          " Oats",
          "Barley",
          " Quinoa",
          " Buckwheat",
          "Corn ",
          "Millet",
          "Rye",
          "Couscous",
          "Farro ",
          "Amaranth ",
          "Bulgur",
          " Spelt ",
          " Triticale",
        ],
        Fruit: [
          "Tomatoes",
          "Blueberries",
          "Apples",
          "Oranges ",
          "Bananas",
          " Strawberries",
          " Avocados",
          " Grapes",
          "Pineapples",
          " Watermelons",
          "Kiwi ",
          "Peaches",
          "Mangoes",
          "Papayas",
          " Cantaloupes",
          "Lemons",
          "Limes",
          "Cherries",
          "Grapefruits ",
          " Pears",
          "Plums ",
        ],
      },
    };
  },
  computed: {
    itemsInSelectedCategory() {
      return this.selectedCategory ? this.items[this.selectedCategory] : [];
    },
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    applyFilters() {
      const filteredFilters = {};

      if (this.selectedCategory?.length > 0) {
        filteredFilters.category = this.selectedCategory;
      }

      if (this.selectedItem?.length > 0) {
        filteredFilters.name = this.selectedItem;
      }

      if (
        this.caloriesRange[0] !== this.minCalories ||
        this.caloriesRange[1] !== this.maxCalories
      ) {
        filteredFilters.calories_min = this.caloriesRange[0];
        filteredFilters.calories_max = this.caloriesRange[1];
      }

      if (
        this.proteinRange[0] !== this.minProtein ||
        this.proteinRange[1] !== this.maxProtein
      ) {
        filteredFilters.protein_min = this.proteinRange[0];
        filteredFilters.protein_max = this.proteinRange[1];
      }

      if (Object.keys(filteredFilters).length > 0) {
        this.$emit("filters-applied", filteredFilters);
      } else {
        useToast().error("No filters selected");
      }
      this.showFilter = !this.showFilter;
    },
    handleReset() {
      this.caloriesRange = [this.minCalories, this.maxCalories];
      this.proteinRange = [this.minProtein, this.maxProtein];

      this.selectedCategory = null;
      this.selectedItem = [];
    },
  },
};
</script>

<style scoped>
.menu-icon {
  cursor: pointer;
}

.filter-section {
  position: absolute;
  z-index: 100;
}

.filter-enter-active,
.filter-leave-active {
  transition: opacity 0.3s ease;
}
.filter-enter,
.filter-leave-to {
  opacity: 0;
}
</style>
