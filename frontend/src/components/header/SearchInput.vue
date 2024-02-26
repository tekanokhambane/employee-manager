<template>
  <input class="searchFilter" type="text" placeholder="Search..." @input="handleSearchInput" />
</template>

<script setup>
import { useEmployeesStore } from '@/stores/employeesStore'

const employeesStore = useEmployeesStore()

// Method to handle search input
const handleSearchInput = (event) => {
  const searchQuery = event.target.value.trim() // Get the search query from the input
  if (searchQuery.length > 0) {
    // Perform API call with the search query
    employeesStore.searchEmployees(searchQuery)
  } else {
    // If search query is empty, reset the search results
    employeesStore.fetchEmployees()
  }
}
</script>

<style scoped>
.searchFilter {
  width: 300px;
  height: 30px;
  padding: 10px;
  border: 1px solid rgb(179, 176, 176);
  border-radius: 5px;
  color: white;
  background-color: rgb(43, 7, 77);
  outline: none;
}

.searchFilter:focus {
  border: 1px solid white;
  background-color: rgb(43, 7, 77);
  color: white;
}

.searchFilter::placeholder {
  color: white;
}
</style>
