<template>
  <HeaderItem />
  <main>
    <EmployeeList />
    <ModalItem />
  </main>
</template>

<script setup>
import HeaderItem from './components/header/HeaderItem.vue'
import EmployeeList from './components/EmployeeList.vue'
import ModalItem from './components/modal/ModalItem.vue'

import { useEmployeesStore } from './stores/employeesStore.js'
import { onMounted } from 'vue'
import 'primeicons/primeicons.css'

onMounted(() => {
  const employeesStore = useEmployeesStore()
  employeesStore.fetchEmployees()
})
</script>

<style>
main {
  margin-top: 150px;
}
</style>
