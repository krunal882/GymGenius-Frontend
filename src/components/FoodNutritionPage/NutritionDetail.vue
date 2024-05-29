<template>
  <v-container v-if="foodItem">
    <v-card v-if="foodItem" class="mx-auto d-flex custom-card" width="100%">
      <v-img
        class="align-end text-white"
        height="300"
        max-width="400"
        :src="imgPath(foodItem.name, foodItem.cloudImg)"
        cover
      ></v-img>
      <div class="custom-content">
        <v-card-title class="custom-title">{{ foodItem.name }}</v-card-title>
        <v-card-text>Category: {{ foodItem.category }}</v-card-text>

        <v-card-actions style="justify-content: space-between">
          <v-btn color="orange" @click="back" text="Go Back"></v-btn>
          <v-btn color="orange" @click="bookmark(foodItem)">Bookmark</v-btn>
        </v-card-actions>
      </div>
    </v-card>
    <v-timeline align="start">
      <v-timeline-item fill-dot icon="mdi-star" dot-color="red-lighten-2">
        <v-card v-if="foodItem.nutritions">
          <v-card-title :class="['text-h6', 'bg-red-lighten-2']">
            Nutrition
          </v-card-title>
          <v-card-text class="bg-white text--primary">
            <v-row>
              <ul class="ml-5">
                <li v-for="(value, key) in foodItem.nutritions" :key="key">
                  {{ key }}: {{ value }}
                </li>
              </ul>
            </v-row>
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item fill-dot icon="mdi-star" dot-color="purple-lighten-2">
        <v-card v-if="foodItem.health_benefits">
          <v-card-title :class="['text-h6', 'bg-purple-lighten-2']">
            Health Benefits
          </v-card-title>
          <v-card-text class="bg-white text--primary">
            <ul>
              <li
                v-for="(item, index) in foodItem.health_benefits"
                :key="index"
              >
                {{ item }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item fill-dot icon="mdi-star" dot-color="green-lighten-2">
        <v-card v-if="foodItem.fun_facts_and_trivia">
          <v-card-title :class="['text-h6', 'bg-green-lighten-2']">
            Fun Facts
          </v-card-title>
          <v-card-text class="bg-white text--primary">
            <ul>
              <li
                v-for="(item, index) in foodItem.fun_facts_and_trivia"
                :key="index"
              >
                {{ item }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item fill-dot icon="mdi-star" dot-color="indigo-lighten-2">
        <v-card v-if="foodItem.recipes_and_serving_ideas[0]">
          <v-card-title :class="['text-h6', 'bg-indigo-lighten-2']">
            Recipe Ideas - 1
          </v-card-title>
          <v-card-text
            class="bg-white text--primary"
            v-if="foodItem.recipes_and_serving_ideas[0].ingredients"
          >
            <ul>
              <li>
                <span style="font-weight: 500"> Item Name : </span>
                {{ foodItem.recipes_and_serving_ideas[0].name }}
              </li>
              <li style="font-weight: 500">Ingredients :</li>
              <ul>
                <li
                  v-for="(ingredient, index) in foodItem
                    .recipes_and_serving_ideas[0].ingredients"
                  :key="index"
                >
                  {{ ingredient }}
                </li>
              </ul>
              <li style="font-weight: 500">Instructions :</li>
              <ul>
                <li
                  v-for="(instruction, index) in foodItem
                    .recipes_and_serving_ideas[0].instructions"
                  :key="index"
                >
                  {{ instruction }}
                </li>
              </ul>
            </ul>
          </v-card-text>
          <div v-else>
            <v-card-text
              class="bg-white text--primary"
              v-if="foodItem.recipes_and_serving_ideas[0].name"
            >
              <ul>
                <li>
                  <span style="font-weight: 500"> Item Name :</span>
                  {{ foodItem.recipes_and_serving_ideas[0].name }}
                </li>
                <li style="font-weight: 500">Steps :</li>
                <ul>
                  <li
                    v-for="(steps, index) in foodItem
                      .recipes_and_serving_ideas[0].steps"
                    :key="index"
                  >
                    {{ steps }}
                  </li>
                </ul>
              </ul>
            </v-card-text>
          </div>
        </v-card>
      </v-timeline-item>
      <v-timeline-item
        v-if="foodItem"
        fill-dot
        icon="mdi-star"
        dot-color="purple-lighten-2"
      >
        <v-card v-if="foodItem.recipes_and_serving_ideas[1]">
          <v-card-title :class="['text-h6', 'bg-purple-lighten-2']">
            Recipe Ideas - 2
          </v-card-title>
          <v-card-text
            v-if="foodItem.recipes_and_serving_ideas[1].ingredients"
            class="bg-white text--primary"
          >
            <ul>
              <li>
                <span style="font-weight: 500"> Item Name : </span
                >{{ foodItem.recipes_and_serving_ideas[1].name }}
              </li>
              <li style="font-weight: 500">ingredients :</li>
              <ul>
                <li
                  v-for="(ingredient, index) in foodItem
                    .recipes_and_serving_ideas[1].ingredients"
                  :key="index"
                >
                  {{ ingredient }}
                </li>
              </ul>
              <li style="font-weight: 500">Instructions :</li>
              <ul>
                <li
                  v-for="(instruction, index) in foodItem
                    .recipes_and_serving_ideas[1].instructions"
                  :key="index"
                >
                  {{ instruction }}
                </li>
              </ul>
            </ul>
          </v-card-text>
          <div v-else>
            <v-card-text
              class="bg-white text--primary"
              v-if="foodItem.recipes_and_serving_ideas[0].name"
            >
              <ul>
                <li>
                  <span style="font-weight: 500"> Item Name :</span>
                  {{ foodItem.recipes_and_serving_ideas[0].name }}
                </li>
                <li style="font-weight: 500">Steps :</li>
                <ul>
                  <li
                    v-for="(steps, index) in foodItem
                      .recipes_and_serving_ideas[0].steps"
                    :key="index"
                  >
                    {{ steps }}
                  </li>
                </ul>
              </ul>
            </v-card-text>
          </div>
        </v-card>
      </v-timeline-item>
      <v-timeline-item fill-dot icon="mdi-star" dot-color="yellow-lighten-2">
        <v-card v-if="foodItem.varieties">
          <v-card-title :class="['text-h6', 'bg-yellow-lighten-2']">
            Varieties
          </v-card-title>
          <v-card-text class="bg-white text--primary">
            <ul>
              <li v-for="(varietie, index) in foodItem.varieties" :key="index">
                {{ varietie }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item fill-dot icon="mdi-star" dot-color="red-lighten-2">
        <v-card v-if="foodItem.culinary_uses">
          <v-card-title :class="['text-h6', 'bg-red-lighten-2']">
            Culinary uses
          </v-card-title>
          <v-card-text class="bg-white text--primary">
            <ul>
              <li v-for="(use, index) in foodItem.culinary_uses" :key="index">
                {{ use }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      foodItem: null,
    };
  },
  methods: {
    async fetchFoodItem(id) {
      try {
        await this.$store.dispatch("fetchFoodItem", { id });
      } catch (error) {
        console.log(error);
      }
      this.foodItem = this.$store.state.foodItemModule.foodDetail[0];
    },
    back() {
      this.$router.go(-1);
    },
    bookmark(foodItem) {
      const userId = this.$store.state.userModule.userId;
      const foodId = foodItem._id;
      this.$store.dispatch("bookmarkItem", {
        userId,
        itemId: foodId,
        itemType: "nutrition",
      });
    },
    imgPath(foodItemName, cloudImg) {
      if (cloudImg === undefined) {
        const imgPath = `../../../assets/img/foodItem/${foodItemName}.jpg`;
        return imgPath;
      } else {
        return cloudImg;
      }
    },
  },
  async created() {
    const { id } = this.$route.params;
    await this.fetchFoodItem(id);
  },
};
</script>

<style>
.custom-content {
  padding: 16px;
}

.custom-title {
  font-size: 24px;
  color: #333;
}

.custom-subtitle {
  font-size: 18px;
  color: #666;
}

.custom-text {
  padding: 16px;
  font-size: 16px;
  color: #444;
}
</style>
