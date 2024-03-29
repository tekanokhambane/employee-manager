<template>
  <header>
    <div class="headerItems">
      <div class="title">
        <h1>Employees</h1>
        <p>There are {{ employeesStore.employees.length }} employees</p>
      </div>
      <SearchInput />
      <SelectInput />
      <ButtonItem @click="modalStore.openModalForCreate(employeesStore)" />
    </div>
    <div class="filterItems">
      <!-- if the employees.SelectedFilter is not null, show the selected filter template -->
      <div v-if="employeesStore.selectedFilter">
        <div class="selectedFilter">
          <div v-if="employeesStore.selectedFilter === 'date_of_birth'">
            <p>Filter by Date of Birth</p>
            <div class="dateOfBirth">
              <input type="date" v-model="selectedDate" />
            </div>
          </div>
          <div v-if="employeesStore.selectedFilter === 'skills'">
            <p>Select Skill</p>
            <div class="filterBySkills">
              <v-select v-model="selectedSkill" label="name" :options="employeesStore.skills"></v-select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useModalStore } from '../../stores/modalStore.js'
import { useEmployeesStore } from '@/stores/employeesStore'
import SearchInput from './SearchInput.vue'
import SelectInput from './SelectInput.vue'
import ButtonItem from './ButtonItem.vue'

import 'vue-select/dist/vue-select.css'
import { computed } from 'vue'
import axios from 'axios'
const modalStore = useModalStore()

const employeesStore = useEmployeesStore()

const selectedSkill = computed({
  /**
   * Retrieve the selected skill from the employees store.
   *
   * @return {type} The selected skill
   */
  get() {
    return employeesStore.selectedSkill
  },
  /**
   * Set the value of the selected skill and filter employees accordingly.
   *
   * @param {type} value - the new value for the selected skill
   * @return {type} description of return value
   */
  set(value) {
    employeesStore.selectedSkill = value
    if (value) {
      console.log(value)
      // filter employees by selected skill
      axios.get(`/api/employees/?skills=${value.name}`).then((response) => {
        employeesStore.employees = response.data
      })
    } else {
      employeesStore.fetchEmployees()
    }
  }
})

const selectedDate = computed({
  /**
   * Retrieves the selected date from the employees store.
   *
   * @return {type} the selected date
   */
  get() {
    return employeesStore.selectedDate
  },
  /**
   * Set the selected date in the employeesStore and fetches the employees based on the selected date.
   *
   * @param {type} value - The value to set as the selected date
   * @return {type} void
   */
  set(value) {
    employeesStore.selectedDate = value
    if (value) {
      // filter employees by selected date
      axios.get(`/api/employees/?date_of_birth=${value}`).then((response) => {
        employeesStore.employees = response.data
      })
    } else {
      employeesStore.fetchEmployees()
    }
  }
})
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem;
  /* margin-top: 20px; */
  background-color: rgb(27, 4, 48);
  gap: 1rem;
  width: 100%;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

header .headerItems {
  display: flex;
  align-items: center;
  gap: 1rem;
}

header .filterItems {
  display: flex;
  align-items: center;
  gap: 1rem;
}

header .title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1px;
}

header h1 {
  color: white;
  font-size: 28px;
}

header p {
  color: white;
  font-size: 14px;
}

.filterBySkills {
  width: 200px;
  background-color: rgb(179, 176, 176);
  margin-top: 0.5rem;
}

.dateOfBirth {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  width: 100%;
  padding: 1rem 2rem;
  gap: 1rem;
}

.dateOfBirth label {
  color: white;
}

.dateOfBirth input {
  width: 400px;
  height: 30px;
  padding: 10px;
  border: 1px solid rgb(25, 3, 46);
  border-radius: 5px;
  color: white;
  background-color: rgb(179, 176, 176);
  outline: none;
}

.dateOfBirth input:focus {
  border: 1px solid white;
  background-color: rgb(179, 176, 176);
  color: white;
}

.dateOfBirth input::placeholder {
  color: white;
}
</style>
