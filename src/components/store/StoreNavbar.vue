<template>
  <nav
    class="navbar d-flex justify-content-center py-0 shadow"
    style="height: 42px"
  >
    <ul>
      <li><a href="#men">Men</a></li>
      <li><a href="#women">Women</a></li>
      <li><a href="#cardio">Cardio</a></li>
      <li><a href="#cycles">Cycles</a></li>
      <li><a href="#accessories">Accessories</a></li>
      <li><a href="#supplements">Supplements</a></li>
      <li><a href="#equipments">Equipments</a></li>
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
