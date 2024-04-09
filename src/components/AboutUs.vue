<template>
  <div class="container">
    <div class="text-black absolute top-40 text-center">
      <h1 class="text-5xl lg:text-5xl md:text-2xl sm:text-xl mt-5 mb-5">
        About Us <br />What we are
      </h1>
    </div>
    <hr class="featurette-divider" style="margin-top: 40px" />

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">
          Our Mission
          <span class="text-muted"
            >Empowering individuals to achieve their fitness goals.</span
          >
        </h2>
        <p class="lead">
          we are dedicated to empowering individuals to achieve their fitness
          goals. We believe that everyone has the potential to lead a healthy
          and active lifestyle, and our mission is to provide the tools,
          resources, and support needed to make that vision a reality. Whether
          you're just starting your fitness journey or you're a seasoned
          athlete, we're here to help you succeed every step of the way.
        </p>
      </div>
      <div class="col-md-5">
        <img
          class="featurette-image img-fluid mx-auto"
          src="https://via.placeholder.com/500"
          alt="Generic placeholder image"
        />
      </div>
    </div>

    <hr class="featurette-divider" />

    <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading">
          Our Vision
          <span class="text-muted"
            >To become a leading provider of fitness solutions worldwide.</span
          >
        </h2>
        <p class="lead">
          Our vision is to become a leading provider of fitness solutions
          worldwide, revolutionizing the way people approach health and
          wellness. We are committed to delivering innovative products,
          cutting-edge technology, and personalized services that empower
          individuals to live their best lives. With a focus on quality,
          integrity, and customer satisfaction, we strive to exceed expectations
          and inspire positive change in the global fitness community.
        </p>
      </div>
      <div class="col-md-5 order-md-1">
        <img
          class="featurette-image img-fluid mx-auto"
          src="https://via.placeholder.com/500"
          alt="Generic placeholder image"
        />
      </div>
    </div>

    <hr class="featurette-divider" />

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">
          Our Values
          <span class="text-muted">Integrity, Innovation, Excellence.</span>
        </h2>
        <p class="lead">
          we uphold the core values of integrity, innovation, and excellence in
          everything we do. We believe that by maintaining the highest standards
          of honesty, transparency, and ethical behavior, we can earn the trust
          and respect of our customers, partners, and communities. Through
          continuous innovation and a relentless pursuit of excellence, we
          strive to exceed expectations, drive positive change, and deliver
          exceptional results. These values guide us in every decision and
          action, ensuring that we remain true to our mission and vision while
          making a meaningful impact on the world.
        </p>
      </div>
      <div class="col-md-5">
        <img
          class="featurette-image img-fluid mx-auto"
          src="https://via.placeholder.com/500"
          alt="Generic placeholder image"
        />
      </div>
    </div>

    <hr class="featurette-divider" style="margin-bottom: 40px" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* Featurettes
------------------------- */

.featurette-divider {
  margin: 5rem 0; /* Space out the Bootstrap <hr> more */
}

/* Thin out the marketing headings */
.featurette-heading {
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.05rem;
}

/* RESPONSIVE CSS
  -------------------------------------------------- */

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
