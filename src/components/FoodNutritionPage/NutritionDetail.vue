<template>
  <v-container v-if="foodItem">
    <v-card v-if="foodItem" class="mx-auto d-flex custom-card" width="100%">
      <!-- foodItem image -->
      <v-img
        class="align-end text-white"
        height="300"
        max-width="400"
        :src="imgPath(foodItem.name, foodItem.cloudImg)"
        cover
      ></v-img>
      <!-- foodItem information -->
      <div class="custom-content">
        <v-card-title class="custom-title">{{ foodItem.name }}</v-card-title>
        <v-card-text>Category: {{ foodItem.category }}</v-card-text>

        <!-- action buttons for the bookmark, previous page navigation, and PDF download -->
        <v-card-actions style="justify-content: space-between">
          <v-btn color="orange" @click="back" text="Go Back"></v-btn>
          <v-btn color="orange" @click="toggleBookmark(foodItem, 'nutrition')">
            {{ isBookmarked(foodItem) ? "Undo Bookmark" : "Bookmark" }}
          </v-btn>
          <v-btn color="orange" @click="downloadPDF">Download PDF</v-btn>
        </v-card-actions>
      </div>
    </v-card>
    <!-- foodItem nutrition -->
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
      <!-- foodItem health benefits -->
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
          <!-- foodItem funFacts -->
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

      <!-- foodItem recipes and serving ideas -->
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
                  v-if="
                    isString(foodItem.recipes_and_serving_ideas[0].ingredients)
                  "
                >
                  {{ foodItem.recipes_and_serving_ideas[0].ingredients }}
                </li>
                <li
                  v-else
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
                  v-if="
                    isString(foodItem.recipes_and_serving_ideas[0].instructions)
                  "
                >
                  {{ foodItem.recipes_and_serving_ideas[0].instructions }}
                </li>
                <li
                  v-else
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
                <!-- recipe ingredients -->
                <li
                  v-if="
                    isString(foodItem.recipes_and_serving_ideas[1].ingredients)
                  "
                >
                  {{ foodItem.recipes_and_serving_ideas[1].ingredients }}
                </li>
                <li
                  v-else
                  v-for="(ingredient, index) in foodItem
                    .recipes_and_serving_ideas[1].ingredients"
                  :key="index"
                >
                  {{ ingredient }}
                </li>
              </ul>
              <!-- recipe Instructions -->
              <li style="font-weight: 500">Instructions :</li>
              <ul>
                <li
                  v-if="
                    isString(foodItem.recipes_and_serving_ideas[1].instructions)
                  "
                >
                  {{ foodItem.recipes_and_serving_ideas[1].instructions }}
                </li>
                <li
                  v-else
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
      <!-- uses of foodItem -->
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
import jsPDF from "jspdf";
import bookmarkMixin from "./../../mixins/bookmarkMixin.js";

export default {
  mixins: [bookmarkMixin],
  data() {
    return {
      foodItem: null,
    };
  },
  methods: {
    isString(value) {
      return typeof value === "string";
    },
    //fetchFoodItem method fetch the foodItem by id and stores in the local foodItem
    async fetchFoodItem(id) {
      try {
        await this.$store.dispatch("fetchFoodItem", { id });
      } catch (error) {
        console.log(error);
      }
      this.foodItem = this.$store.state.foodItemModule.foodDetail[0];
    },
    //it navigates to the previous page
    back() {
      this.$router.go(-1);
    },
    //it returns the image from local or the cloud storage
    imgPath(foodItemName, cloudImg) {
      if (cloudImg === undefined) {
        const imgPath = `../../../assets/img/foodItem/${foodItemName}.jpg`;
        return imgPath;
      } else {
        return cloudImg;
      }
    },
    async downloadPDF() {
      const pdf = new jsPDF("p", "mm", "a4");
      const margin = 10;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yOffset = margin;

      // Add Food Item Name
      pdf.setFontSize(22);
      pdf.text(this.foodItem.name, margin, yOffset);
      yOffset += 10;

      // Add Image
      const img = await this.loadImage(
        this.imgPath(this.foodItem.name, this.foodItem.cloudImg)
      );
      const imgProps = pdf.getImageProperties(img);
      const imgWidth = pageWidth - 2 * margin;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      if (yOffset + imgHeight > pageHeight - margin) {
        pdf.addPage();
        yOffset = margin;
      }

      pdf.addImage(img, "JPEG", margin, yOffset, imgWidth, imgHeight);
      yOffset += imgHeight + margin;

      // Add Food Item Details
      const details = [`Category: ${this.foodItem.category}`];

      pdf.setFontSize(12);
      details.forEach((detail) => {
        pdf.text(detail, margin, yOffset);
        yOffset += 7;
      });

      // Add Nutrition
      if (this.foodItem.nutritions) {
        pdf.setFontSize(16);
        pdf.text("Nutrition:", margin, yOffset);
        yOffset += 10;

        pdf.setFontSize(12);
        for (const [key, value] of Object.entries(this.foodItem.nutritions)) {
          pdf.text(`${key}: ${value}`, margin, yOffset);
          yOffset += 7;
        }
      }

      // Add Health Benefits
      if (this.foodItem.health_benefits) {
        pdf.setFontSize(16);
        pdf.text("Health Benefits:", margin, yOffset);
        yOffset += 10;

        pdf.setFontSize(12);
        this.foodItem.health_benefits.forEach((benefit) => {
          const textLines = pdf.splitTextToSize(
            benefit,
            pageWidth - 2 * margin
          );
          pdf.text(textLines, margin, yOffset);
          yOffset += textLines.length * 7;
        });
      }

      // Add Fun Facts
      if (this.foodItem.fun_facts_and_trivia) {
        pdf.setFontSize(16);
        pdf.text("Fun Facts:", margin, yOffset);
        yOffset += 10;

        pdf.setFontSize(12);
        this.foodItem.fun_facts_and_trivia.forEach((fact) => {
          const textLines = pdf.splitTextToSize(fact, pageWidth - 2 * margin);
          pdf.text(textLines, margin, yOffset);
          yOffset += textLines.length * 7;
        });
      }

      // Add Recipes and Serving Ideas
      this.foodItem.recipes_and_serving_ideas.forEach((recipe, index) => {
        pdf.setFontSize(16);
        pdf.text(`Recipe Ideas - ${index + 1}:`, margin, yOffset);
        yOffset += 10;

        pdf.setFontSize(12);
        if (recipe.name) {
          pdf.text(`Item Name: ${recipe.name}`, margin, yOffset);
          yOffset += 7;
        }

        if (recipe.ingredients) {
          pdf.text("Ingredients:", margin, yOffset);
          yOffset += 7;

          if (this.isString(recipe.ingredients)) {
            pdf.text(recipe.ingredients, margin + 10, yOffset);
            yOffset += 7;
          } else {
            recipe.ingredients.forEach((ingredient) => {
              pdf.text(`- ${ingredient}`, margin + 10, yOffset);
              yOffset += 7;
            });
          }
        }

        if (recipe.instructions) {
          pdf.text("Instructions:", margin, yOffset);
          yOffset += 7;

          if (this.isString(recipe.instructions)) {
            pdf.text(recipe.instructions, margin + 10, yOffset);
            yOffset += 7;
          } else {
            recipe.instructions.forEach((instruction) => {
              pdf.text(`- ${instruction}`, margin + 10, yOffset);
              yOffset += 7;
            });
          }
        }
      });

      // Add Varieties
      if (this.foodItem.varieties) {
        pdf.setFontSize(16);
        pdf.text("Varieties:", margin, yOffset);
        yOffset += 10;

        pdf.setFontSize(12);
        this.foodItem.varieties.forEach((variety) => {
          pdf.text(variety, margin, yOffset);
          yOffset += 7;
        });
      }

      // Add Culinary Uses
      if (this.foodItem.culinary_uses) {
        pdf.setFontSize(16);
        pdf.text("Culinary Uses:", margin, yOffset);
        yOffset += 10;

        pdf.setFontSize(12);
        this.foodItem.culinary_uses.forEach((use) => {
          pdf.text(use, margin, yOffset);
          yOffset += 7;
        });
      }

      pdf.save(`${this.foodItem.name}.pdf`);
    },
    loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
      });
    },
  },
  computed: {
    //it returns the bookmarked foodItem of the user
    bookmarked() {
      return this.$store.state.bookmarkModule.nutrition;
    },
  },
  //created lifecycle hook fetch the foodItem using the id in route
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
