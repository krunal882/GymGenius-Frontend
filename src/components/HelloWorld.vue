<template>
  <div>
    <!-- Adjust z-index as needed -->
    <nav class="navbar my-navbar navbar-expand-lg navbar-light">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img
            class="img-200px"
            src="../assets/logo.png"
            alt=""
            style="width: 220px"
          />
        </a>
        <button
          class="navbar-toggler border-0"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <!-- <span
            class="iconify bar-icon"
            data-icon="fa-solid:bars"
            data-inline="false"
          ></span> -->
          <v-app-bar-nav-icon class="iconify bar-icon"> </v-app-bar-nav-icon>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item nav-active">
              <a class="nav-link" href="#"
                >Home <span class="sr-only"></span
              ></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">exercises</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">yoga</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">nutrition</a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/store">shop</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">blogs</a>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/fitnessTrackers"
                >Analyzer</router-link
              >
            </li>
          </ul>
        </div>
        <v-btn variant="outlined" color="white" to="/authentication"
          >Login/Register</v-btn
        >
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  mounted() {
    // const script = document.createElement("script");
    // script.src = "https://www.chatbase.co/embed.min.js";
    // script.defer = true;
    // script.setAttribute("chatbotId", "_goC7mZy5K-mr7xGihzhw");
    // script.setAttribute("domain", "www.chatbase.co");
    // document.body.appendChild(script);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");

body {
  font-family: "Poppins" !important;
}

.my-navbar {
  position: fixed;
  width: 100%;
  z-index: 3; /* Ensure navbar stays on top */
}

.navbar-brand {
  font-weight: bold;
}
.nav-link {
  margin-right: 24px;
  transition: 0.3s ease;
  padding: 5px;
  color: white;
}
.nav-link:hover {
  color: rgb(255, 0, 0);
  border-bottom: 4px solid #eb4027;
}
.nav-active a {
  color: rgb(250, 0, 0) !important;
  font-weight: 600;
  border-bottom: 4px solid #eb4027;
}

.img {
  width: 250px;
}
</style>
