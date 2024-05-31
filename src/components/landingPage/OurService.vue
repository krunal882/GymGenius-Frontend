<!-- this component displays services that included in the websites and navigation option to that page using card -->
<template>
  <v-hover class="cardHover">
    <div class="container marketing">
      <div class="text-black absolute top-40 left-30 text-center">
        <h1
          class="text-5xl lg:text-5xl md:text-2xl sm:text-xl"
          style="margin-top: 30px; margin-bottom: 50px"
        >
          push your limits forward,<br />
          we offer to you
        </h1>
      </div>
      <div class="row justify-content-center">
        <div
          class="col-lg-4 image-hover-effect"
          v-for="(card, index) in cards"
          :key="index"
        >
          <!-- cards to display different services -->
          <v-card style="height: 330px" class="mt-5">
            <v-img
              class="image mx-auto"
              :src="card.image"
              alt="Generic placeholder image"
              width="100"
              height="100"
            />
            <h2
              style="
                font-size: 24px;
                font-weight: bold;
                margin-top: 20px;
                color: red;
              "
            >
              {{ card.title }}
            </h2>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px">
              {{ card.description }}
            </p>
            <router-link
              :to="{ name: card.routeName }"
              class="btn btn-secondary"
            >
              View details &raquo;
            </router-link>
          </v-card>
        </div>
      </div>
    </div>
  </v-hover>
</template>

<script>
export default {
  data() {
    return {
      // card content
      cards: [
        {
          image: "../assets/img/service-icon/weight.png",
          title: "Exercises",
          description:
            "Discover a variety of exercises to help you stay active, fit, and healthy.",
          routeName: "exerciseInfo",
        },
        {
          image: "../assets/img/fitnessTrackers/calculator.png",
          title: "Body Analyzers",
          description:
            "These calculators guide individuals in health, fitness, and nutrition, enabling informed choices.",
          routeName: "fitnessTrackers",
        },
        {
          image: "../assets/img/service-icon/yoga.png",
          title: "Yoga",
          description:
            "Discover the benefits and techniques of various yoga poses to enhance your practice.",
          routeName: "yogaPoses",
        },
        {
          image: "../assets/img/service-icon/stationary-bike.png",

          title: "Diet Plans",
          description:
            "Achieve your health and fitness goals with our personalized diet plans.",
          routeName: "dietPlan",
        },
        {
          image: "../assets/img/service-icon/shopping.png",
          title: "E-commerce Store",
          description:
            "Discover a range of high-quality gym wear products designed to enhance your performance, comfort, and style during workouts.",
          routeName: "store",
        },
        {
          image: "../assets/img/service-icon/plan.png",
          title: "Nutrition",
          description:
            "Discover the nutritional details of your favorite food items and make informed choices about your diet and health.",
          routeName: "foodNutrition",
        },
      ],
    };
  },
};
</script>

<style scoped>
body {
  padding-top: 3rem;
  padding-bottom: 3rem;
  color: #5a5a5a;
}
.carousel {
  margin-bottom: 4rem;
}
.carousel-caption {
  bottom: 3rem;
  z-index: 10;
}

.carousel-item {
  height: 32rem;
  background-color: #777;
}
.carousel-item > img {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 32rem;
}

.btn-secondary {
  color: red;
  background-color: white;
  border-color: red;
}

.btn-secondary:hover {
  color: white;
  background-color: red;
}

.marketing .col-lg-4 {
  margin-bottom: 1.5rem;
  text-align: center;
}
.marketing h2 {
  font-weight: 400;
}
.marketing .col-lg-4 p {
  margin-right: 0.75rem;
  margin-left: 0.75rem;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}

.image-hover-effect:hover {
  transform: scale(1.1);
}

@media (min-width: 40em) {
  .carousel-caption p {
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .featurette-heading {
    font-size: 50px;
  }
}

@media (min-width: 62em) {
  .featurette-heading {
    margin-top: 7rem;
  }
}
</style>
