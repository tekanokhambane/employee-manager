<template>
  <select v-model="selectedFilter">
    <option value="">Filter by</option>
    <option value="date_of_birth">Date of birth</option>
    <option value="skills">Skills</option>
  </select>
</template>

<script setup>
import { computed } from 'vue'
import { useEmployeesStore } from '@/stores/employeesStore'

const employeesStore = useEmployeesStore()

const selectedFilter = computed({
  /**
   * Get the selected filter from the employees store.
   *
   * @return {any} The selected filter
   */
  get() {
    return employeesStore.selectedFilter
  },
  /**
   * Set the value of the selected filter and fetch skills if the value is 'skills'.
   *
   * @param {type} value - The new value for the selected filter
   * @return {type} undefined
   */
  set(value) {
    employeesStore.selectedFilter = value
    if (value === 'skills') {
      employeesStore.fetchSkills()
    }
  }
})
</script>

<style scoped>
/* the select input should be transparent and the gap between the dropdown and text should be 0 */
select {
  background-color: transparent;
  border: none;
  color: white;
  gap: 0;
  max-width: 80px;
  outline: none;
}

select option {
  max-width: 80px;
  color: black;
  background-color: rgb(185, 185, 185);
  border: none;
  outline: none;
  padding: 2rem 1.5rem;
}

select option:hover {
  background-color: rgb(43, 7, 77);
  color: white;
}

select option:checked {
  background-color: rgb(43, 7, 77);
  color: white;
}

select option:checked:hover {
  background-color: rgb(43, 7, 77);
  color: white;
}
</style>
