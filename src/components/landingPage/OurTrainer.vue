<template>
  <div>
    <h2 class="font-weight-bold mb-2 text-center">Our Expert Trainers</h2>
    <p class="font-italic text-muted mb-4"></p>

    <div class="row pb-5 mb-4 d-flex justify-content-center">
      <div
        class="col-lg-3 col-md-6 mb-4 mb-lg-0"
        v-for="(trainer, index) in trainers"
        :key="index"
      >
        <!-- Card-->
        <div class="card shadow-sm border-1 rounded">
          <div class="card-body p-0">
            <img
              :src="trainer.image"
              alt=""
              class="w-100 card-img-top image-hover-effect"
            />
            <div class="p-4">
              <h5 class="mb-0">{{ trainer.name }}</h5>
              <p class="small text-muted">{{ trainer.position }}</p>
              <li class="list-inline-item m-0">
                <a :href="twitterLink" class="social-link">
                  <font-awesome-icon :icon="icons.faFacebookF" />
                </a>
              </li>
              <li class="list-inline-item m-0">
                <a :href="twitterLink" class="social-link">
                  <font-awesome-icon :icon="icons.faTwitter" />
                </a>
              </li>
              <li class="list-inline-item m-0">
                <a :href="instagramLink" class="social-link">
                  <font-awesome-icon :icon="icons.faInstagram" />
                </a>
              </li>
              <li class="list-inline-item m-0">
                <a :href="linkedinLink" class="social-link">
                  <font-awesome-icon :icon="icons.faLinkedin" />
                </a>
              </li>
            </div>
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
      facebookLink: "#",
      twitterLink: "#",
      instagramLink: "#",
      linkedinLink: "#",
      trainers: [
        {
          image: "../assets/trainer/team1.png",
          name: "Mark Rockwell",
          position: "CEO - Consultant",
        },
        {
          image: "../assets/trainer/team2.png",
          name: "John Doe",
          position: "Fitness Trainer",
        },
        {
          image: "../assets/trainer/team3.png",
          name: "Jane Smith",
          position: "Yoga Instructor",
        },
      ],
    };
  },
};
</script>

<style scoped>
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

.image-hover-effect:hover {
  transform: scale(1.1);
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
  color: blue;
  border-radius: 50%;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.social-link:hover,
.social-link:focus {
  background: red;
  text-decoration: none;
  color: white;
}

.progress {
  height: 10px;
}
</style>
