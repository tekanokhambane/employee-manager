<template>
    <div class="unsaved" v-if="employeesStore.dataChanged">
        <i class="pi pi-exclamation-triangle" style="font-size: 1.5rem"></i>
        You have unsaved changes
    </div>
    <div class="employeeList">
        <EmployeeItem v-for="(employee, index) in employeesStore.employees" :key="employee.id" :employee="employee"
            :index="index" />

        <div class="noItems" v-if="employeesStore.employees.length === 0">
            <img :src="image" alt="No Items" />
            <h2>There is nothing here</h2>
            <p>Create a new employee by clicking the <span>New Employee</span> button to get started</p>
        </div>
    </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modalStore'
import EmployeeItem from './EmployeeItem.vue'
import { useEmployeesStore } from '@/stores/employeesStore'
import { onMounted } from 'vue'
import image from "../assets/Icon.JPG"

const modalStore = useModalStore()
const employeesStore = useEmployeesStore()
let employeeChanged = false

onMounted(() => {
    employeesStore.initializeFromLocalStorage()
    employeeChanged = employeesStore.dataChanged
})
// const employeeData = JSON.parse(localStorage.getItem('employeeData'));
</script>

<style scoped>
.employeeList {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    min-width: 600px;
    max-width: fit-content;
    max-height: 600px;
    overflow: auto;
    overflow-x: hidden;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    margin-top: 20px;
}

.unsaved {
    /* position: absolute; */
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 600px;
    max-width: fit-content;
    max-height: 600px;
    overflow: auto;
    overflow-x: hidden;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    margin-top: 20px;
    color: white;
}

.noItems {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1px;
    width: 100%;
    min-height: 500px;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    margin-top: 20px;
    color: white;
}

.noItems img {
    width: 200px;
}

.noItems h2 {
    font-size: 28px;
}

.noItems p {
    font-size: 18px;
}

.noItems span {
    font-weight: 600;
    font-size: 18px;
}
</style>
