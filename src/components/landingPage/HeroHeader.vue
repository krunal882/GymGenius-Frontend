<!-- this component is for displaying video as hero header  -->
<template>
  <div class="position-relative overflow-hidden">
    <div class="d-flex min-vh-100" lc-helper="video-bg">
      <video
        style="z-index: 1; object-fit: cover; object-position: 50% 50%"
        class="position-absolute w-100 min-vh-100"
        autoplay=""
        preload=""
        muted=""
        poster="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_1400,q_auto:eco,dpr_2,f_auto,fl_progressive/image/test/we-are-cult-logo/promo-video-poster.jpg"
        loop=""
        playsinline=""
      >
        <source
          src="https://cdn-images.cure.fit/www-curefit-com/video/upload/c_fill,w_1400,ar_1.77,q_auto:eco,dpr_2,vc_auto,f_auto/video/test/we-are-cult-web.mp4"
          type="video/mp4"
        />
      </video>
      <!-- title above the video -->
      <div
        style="z-index: 2"
        class="align-self-center text-center text-light col-md-8 offset-md-2"
      >
        <div class="lc-block mb-4">
          <div editable="rich">
            <h1 class="display-5 fw-bolder">
              Build Perfect Body for Healthy Lifestyle
            </h1>
          </div>
        </div>

        <div class="lc-block">
          <div editable="rich">
            <p class="lead">with us</p>
          </div>
        </div>
        <br />
        <div class="lc-block">
          <svg
            width="4em"
            height="4em"
            viewBox="0 0 16 16"
            lc-helper="svg-icon"
            fill="currentColor"
            style=""
          >
            <path
              fill-rule="evenodd"
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            ></path>
            <path
              fill-rule="evenodd"
              d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
