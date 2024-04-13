<template>
  <nav
    class="navbar d-flex justify-content-center py-0 shadow"
    style="height: 42px; position: sticky"
  >
    <ul>
      <li><router-link :to="{ name: 'men' }">Men</router-link></li>
      <li><router-link :to="{ name: 'women' }">Women</router-link></li>
      <li><router-link :to="{ name: 'cardio' }">Cardio</router-link></li>
      <li><router-link :to="{ name: 'cycles' }">Cycles</router-link></li>
      <li>
        <router-link :to="{ name: 'accessories' }">Accessories</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'equipments' }">Supplements</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'supplements' }">Equipments</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
nav {
  background-color: white;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 1000;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;
  min-width: 600px;
}

nav ul li {
  float: left;
}

nav ul li a {
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

nav ul li a:hover {
  background-color: #111;
  color: white;
}
</style>
