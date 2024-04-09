<template>
  <h2 class="font-weight-bold mb-2 text-center">Our Expert Trainers</h2>
  <p class="font-italic text-muted mb-4"></p>

  <div class="row pb-5 mb-4 d-flex justify-content-center">
    <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
      <!-- Card-->
      <div class="card shadow-sm border-1 rounded">
        <div class="card-body p-0">
          <img
            src="../assets/trainer/team1.png"
            alt=""
            class="w-100 card-img-top"
          />
          <div class="p-4">
            <h5 class="mb-0">Mark Rockwell</h5>
            <p class="small text-muted">CEO - Consultant</p>
            <ul class="social mb-0 list-inline mt-3">
              <li class="list-inline-item m-0">
                <a href="#" class="social-link"
                  ><i class="fa fa-facebook-f"></i
                ></a>
              </li>
              <li class="list-inline-item m-0">
                <a href="#" class="social-link"
                  ><i class="fa fa-twitter"></i
                ></a>
              </li>
              <li class="list-inline-item m-0">
                <a href="#" class="social-link"
                  ><i class="fa fa-instagram"></i
                ></a>
              </li>
              <li class="list-inline-item m-0">
                <a href="#" class="social-link"
                  ><i class="fa fa-linkedin"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
      <!-- Card-->
      <div class="card shadow-sm border-1 rounded">
        <div class="card-body p-0">
          <img
            src="../assets/trainer/team2.png"
            alt=""
            class="w-100 card-img-top"
          />
          <div class="p-4">
            <h5 class="mb-0">Mark Rockwell</h5>
            <p class="small text-muted">CEO - Consultant</p>
            <ul class="social mb-0 list-inline mt-3">
              <li class="list-inline-item m-0">
                <a href="#" class="social-link"
                  ><i class="fa fa-facebook-f"></i
                ></a>
              </li>
              <li class="list-inline-item m-0">
                <a href="#" class="social-link"
                  ><i class="fa fa-twitter"></i
                ></a>
              </li>
              <li class="list-inline-item m-0">
                <a href="#" class="social-link"
                  ><i class="fa fa-instagram"></i
                ></a>
              </li>
              <li class="list-inline-item m-0">
                <a href="#" class="social-link"
                  ><i class="fa fa-linkedin"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
      <!-- Card-->
      <div class="card shadow-sm border-1 rounded">
        <div class="card-body p-0">
          <img
            src="../assets/trainer/team3.png"
            alt=""
            class="w-100 card-img-top"
          />
          <div class="p-4">
            <h5 class="mb-0">Mark Rockwell</h5>
            <p class="small text-muted">CEO - Consultant</p>
            <ul class="social mb-0 list-inline mt-3">
              <li class="list-inline-item m-0">
                <a href="#" class="social-link"
                  ><i class="fa fa-facebook-f"></i
                ></a>
              </li>
              <li class="list-inline-item m-0">
                <a href="#" class="social-link"
                  ><i class="fa fa-twitter"></i
                ></a>
              </li>
              <li class="list-inline-item m-0">
                <a href="#" class="social-link"
                  ><i class="fa fa-instagram"></i
                ></a>
              </li>
              <li class="list-inline-item m-0">
                <a href="#" class="social-link"
                  ><i class="fa fa-linkedin"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

export default {
  created() {
    // Add brand icons to the library
    library.add(faFacebookF, faTwitter, faInstagram, faLinkedin);
  },
  components: {},
  data() {
    return {
      icons: {
        faFacebookF,
        faTwitter,
        faInstagram,
        faLinkedin,
      },
    };
  },
};
</script>

<style scoped>
/*
*
* ==========================================
* FOR DEMO PURPOSE
* ==========================================
*
*/

.social-link {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  border-radius: 50%;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.social-link:hover,
.social-link:focus {
  background: #ddd;
  text-decoration: none;
  color: #555;
}

.social-link {
  width: 30px;
  height: 30px;
  margin: 8px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  border-radius: 50%;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.social-link:hover,
.social-link:focus {
  background: #ddd;
  text-decoration: none;
  color: #555;
}

.progress {
  height: 10px;
}
</style>
