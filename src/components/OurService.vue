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
        push your limits forward <br />
        we offer to you
      </h1>
    </div>
    <!-- Three columns of text below the carousel -->
    <div class="row">
      <div class="col-lg-4">
        <img
          class="rounded-circle-container"
          src="../assets/img/service-icon/weight.png"
          alt="Generic placeholder image"
          width="100"
          height="100"
        />
        <h2>Quality Equipment</h2>
        <p>
          Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
          Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
          risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
          cursus magna.
        </p>
        <p>
          <a class="btn btn-secondary" href="#" role="button"
            >View details &raquo;</a
          >
        </p>
      </div>
      <div class="col-lg-4">
        <img
          class="rounded-circle-container"
          src="../assets/img/service-icon/dumbbell.png"
          alt="Generic placeholder image"
          width="100"
          height="100"
        />
        <h2>Nutrition</h2>
        <p>
          Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
          Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
          risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
          cursus magna.
        </p>
        <p>
          <a class="btn btn-secondary" href="#" role="button"
            >View details &raquo;</a
          >
        </p>
      </div>
      <div class="col-lg-4">
        <img
          class="rounded-circle-container"
          src="../assets/img/service-icon/yoga.png"
          alt="Generic placeholder image"
          width="100"
          height="100"
        />
        <h2>Yoga</h2>
        <p>
          Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
          Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
          risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
          cursus magna.
        </p>
        <p>
          <a class="btn btn-secondary" href="#" role="button"
            >View details &raquo;</a
          >
        </p>
      </div>
      <div class="col-lg-4">
        <img
          class="rounded-circle-container"
          src="../assets/img/service-icon/stationary-bike.png"
          alt="Generic placeholder image"
          width="100"
          height="100"
        />
        <h2>Exercises</h2>
        <p>
          Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
          Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
          risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
          cursus magna.
        </p>
        <p>
          <a class="btn btn-secondary" href="#" role="button"
            >View details &raquo;</a
          >
        </p>
      </div>

      <!-- /.col-lg-4 -->
      <div class="col-lg-4">
        <img
          class="rounded-circle-container"
          src="../assets/img/service-icon/shopping.png"
          alt="Generic placeholder image"
          width="100"
          height="100"
        />
        <h2>Gym Wear</h2>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris
          condimentum nibh.
        </p>
        <p>
          <a class="btn btn-secondary" href="#" role="button"
            >View details &raquo;</a
          >
        </p>
      </div>
      <!-- /.col-lg-4 -->
      <div class="col-lg-4">
        <img
          class="rounded-circle-container"
          src="../assets/img/service-icon/plan.png"
          alt="Generic placeholder image"
          width="100"
          height="100"
        />
        <h2>Diet plans</h2>
        <p>
          Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas
          eget quam. Vestibulum id ligula porta felis euismod semper. Fusce
          dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
          fermentum massa justo sit amet risus.
        </p>
        <p>
          <a class="btn btn-secondary" href="#" role="button"
            >View details &raquo;</a
          >
        </p>
      </div>

      <!-- /.col-lg-4 -->
    </div>
    <!-- /.row -->
  </div>
</template>

<script>
export default {};
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
