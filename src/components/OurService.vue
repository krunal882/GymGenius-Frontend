<template>
  <div
    class="container marketing"
    style="background-image: url(../assets/img/hero-bg.png)"
  >
    <div class="text-black absolute top-40 left-30 text-center">
      <h1
        class="text-5xl lg:text-5xl md:text-2xl sm:text-xl"
        style="margin-top: 30px; margin-bottom: 50px"
      >
        push your limits forward,<br />
        we offer to you
      </h1>
    </div>
    <!-- Three columns of text below the carousel -->
    <div class="row">
      <div class="col-lg-4" v-for="(card, index) in cards" :key="index">
        <v-card>
          <v-img
            class="rounded-circle-container"
            :src="card.image"
            alt="Generic placeholder image"
            width="100"
            height="100"
          />
          <h2 style="font-size: 24px; font-weight: bold; margin-top: 20px">
            {{ card.title }}
          </h2>
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px">
            {{ card.description }}
          </p>
          <p>
            <a
              class="btn btn-secondary"
              href="#"
              role="button"
              style="font-size: 14px; text-transform: uppercase"
            >
              View details &raquo;
            </a>
          </p>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          image: "../assets/img/service-icon/weight.png",
          title: "Quality Equipment",
          description:
            "Transform your home workouts with our premium selection of gym " +
            "equipment, carefully curated to bring the gym experience to the " +
            "comfort of your own home. From cardio machines to strength training " +
            "gear, we offer high-quality products designed to help you achieve your " +
            "fitness goals conveniently and effectively with us.",
        },
        {
          image: "../assets/img/service-icon/dumbbell.png",
          title: "Nutrition",
          description:
            "Discover the nutritional details of your favorite food items and make " +
            "informed choices about your diet and health. Whether you're tracking " +
            "your calorie intake, monitoring your fat consumption, or simply " +
            "curious about the nutritional content of different foods, we've got " +
            "you covered with comprehensive information to help you achieve your " +
            "health and wellness goals.",
        },
        {
          image: "../assets/img/service-icon/yoga.png",
          title: "Yoga",
          description:
            "Discover the benefits and techniques of various yoga poses to enhance " +
            "your practice and deepen your understanding of yoga. Whether you're a " +
            "beginner seeking guidance on foundational poses or an experienced yogi " +
            "looking to expand your repertoire, we've compiled comprehensive " +
            "information to help you explore the world of yoga asanas.",
        },
        {
          image: "../assets/img/service-icon/stationary-bike.png",
          title: "Exercises",
          description:
            "Discover a variety of exercises to help you stay active, fit, and " +
            "healthy. Whether you're looking to build strength, improve " +
            "flexibility, boost cardiovascular health, or enhance overall fitness, " +
            "we've compiled comprehensive information on different types of " +
            "exercises to support your fitness journey.",
        },
        {
          image: "../assets/img/service-icon/shopping.png",
          title: "Gym Wear",
          description:
            "Discover a range of high-quality gym wear products designed to enhance " +
            "your performance, comfort, and style during workouts. Whether you're " +
            "hitting the gym, going for a run, or practicing yoga, we offer a " +
            "variety of athletic apparel and accessories to help you look and feel " +
            "your best while staying active and motivated.",
        },
        {
          image: "../assets/img/service-icon/plan.png",
          title: "Diet plans",
          description:
            "Achieve your health and fitness goals with our personalized diet plans " +
            "designed to support weight loss, muscle gain or weight gain. Whether " +
            "you're looking to shed pounds, build lean muscle mass, or increase " +
            "body weight, our expertly crafted plans provide the " +
            "guidance you need  for success.",
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

/* CUSTOMIZE THE CAROUSEL
  -------------------------------------------------- */

/* Carousel base class */
.carousel {
  margin-bottom: 4rem;
}
/* Since positioning the image, we need to help out the caption */
.carousel-caption {
  bottom: 3rem;
  z-index: 10;
}

/* Declare heights because of positioning of img element */
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

/* MARKETING CONTENT
  -------------------------------------------------- */

/* Center align the text within the three columns below the carousel */
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

@media (min-width: 40em) {
  /* Bump up size of carousel content */
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
