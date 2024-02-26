<template>
  <button type="button" class="button" @click="$emit('click')">New Employee</button>
</template>

<style scoped>
.button {
  background-color: rgb(43, 7, 77);
  border: none;
  border-radius: 50px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
