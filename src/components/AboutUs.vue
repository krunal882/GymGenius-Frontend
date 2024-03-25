<template>
  <div class="container">
    <div class="text-black absolute top-40 left-30 text-center">
      <h1 class="text-5xl lg:text-5xl md:text-2xl sm:text-xl">
        About Us <br />What we are
      </h1>
    </div>
    <hr class="featurette-divider" />

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">
          First featurette heading.
          <span class="text-muted">It'll blow your mind.</span>
        </h2>
        <p class="lead">
          Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id
          ligula porta felis euismod semper. Praesent commodo cursus magna, vel
          scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.
        </p>
      </div>
      <div class="col-md-5">
        <img
          class="featurette-image img-fluid mx-auto"
          data-src="holder.js/500x500/auto"
          alt="Generic placeholder image"
        />
      </div>
    </div>

    <hr class="featurette-divider" />

    <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading">
          Oh yeah, it's that good.
          <span class="text-muted">See for yourself.</span>
        </h2>
        <p class="lead">
          Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id
          ligula porta felis euismod semper. Praesent commodo cursus magna, vel
          scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.
        </p>
      </div>
      <div class="col-md-5 order-md-1">
        <img
          class="featurette-image img-fluid mx-auto"
          data-src="holder.js/500x500/auto"
          alt="Generic placeholder image"
        />
      </div>
    </div>

    <hr class="featurette-divider" />

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">
          And lastly, this one. <span class="text-muted">Checkmate.</span>
        </h2>
        <p class="lead">
          Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id
          ligula porta felis euismod semper. Praesent commodo cursus magna, vel
          scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.
        </p>
      </div>
      <div class="col-md-5">
        <img
          class="featurette-image img-fluid mx-auto"
          data-src="holder.js/500x500/auto"
          alt="Generic placeholder image"
        />
      </div>
    </div>

    <hr class="featurette-divider" />
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
