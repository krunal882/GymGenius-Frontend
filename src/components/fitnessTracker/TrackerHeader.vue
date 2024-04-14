<template>
  <div class="header">{{ title }}</div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style scoped>
.header {
  text-align: center;
  padding: 70px;
  background-color: #022a3a;
  color: white;
  font-size: 60px;
  font-family: Montserrat, sans-serif;
  letter-spacing: 0.05em;
  font-weight: bold;
  margin: 0 auto;
  width: 100%;
}
</style>
