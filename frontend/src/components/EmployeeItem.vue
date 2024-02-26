<template>
  <div class="employeeItem">
    <div class="content" @click="modalStore.openModalForUpdate(employee, employeesStore)">
      <div class="indexCount">
        {{ index + 1 }}
      </div>
      <div class="employeeInfo">{{ employee.first_name }}</div>
      <div class="employeeInfo">{{ employee.last_name }}</div>
      <div class="employeeInfo">{{ employee.contact_number }}</div>
      <!-- display an icon if the employee has been changed -->
      <div
        class="employeeInfo"
        v-tooltip.top="'You have not saved changes to this employee'"
        v-if="employeesStore.updatedData && employeesStore.updatedData.id === employee.id"
        :class="{ changedIcon: employeesStore.updatedData.id === employee.id }"
      >
        <i class="pi pi-exclamation-triangle" style="font-size: 1.5rem"></i>
      </div>
    </div>

    <div class="employeeInfo deleteIcon" @click="deleteItem(employee)">
      <i class="pi pi-trash" style="font-size: 1.5rem"></i>
    </div>
  </div>
</template>

<script setup>
import { useEmployeesStore } from '@/stores/employeesStore'
import { useModalStore } from '@/stores/modalStore'
const modalStore = useModalStore()
const employeesStore = useEmployeesStore()
employeesStore.employeeData = JSON.parse(localStorage.getItem('employeeData'))
let localStorageEmployeeData = JSON.parse(localStorage.getItem('employeeData'))

const props = defineProps({
  employee: {
    type: Object,
    required: true
  },
  index: Number
})

const deleteItem = (employee) => {
  employeesStore.deleteEmployee(employee.id)
  localStorage.removeItem('employeeData')
  employeesStore.employeeData = null
}
</script>

<style scoped>
.employeeItem {
  display: flex;
  align-items: center;
  position: relative;
  gap: 1rem;
  min-width: 600px;

  background-color: gray;
  border-radius: 50px;
  z-index: 1;
}

.employeeItem:hover {
  background-color: rgb(43, 7, 77);
  cursor: pointer;
}

.employeeItem:hover .employeeInfo,
.employeeItem:hover .indexCount {
  color: white;
  border-color: white;
}

.content {
  display: flex;
  align-items: center;
  position: relative;
  padding: 1.5rem 1rem 1.5rem 1rem;
  gap: 1rem;
  width: 80%;
  height: 100%;
  z-index: 100;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.indexCount {
  color: rgb(43, 7, 77);
  font-size: 18px;
  font-weight: bold;
  border: 1px solid rgb(43, 7, 77);
  border-radius: 50px;
  padding: 5px 10px 5px 10px;
}

.employeeInfo {
  color: white;
  font-size: 18px;
  font-weight: bold;
}

/* display an icon if the employee has been changed */
.changedIcon {
  color: rgb(7, 72, 77);
  font-size: 1.5rem;
  position: absolute;
  right: 95px;
  top: 50%;
  transform: translateY(-50%);
  animation: pulse 1s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1);
    }
  }
}

.icon {
  display: none;
}

/* display an icon if the employee has been deleted */
.deleteIcon {
  color: red;
  font-size: 1.5rem;
  /* position: absolute; */
  padding: 1.5rem 1rem 1.5rem 1rem;
  display: none;
  width: 20%;
  z-index: 100;
}

.employeeItem:hover .deleteIcon {
  display: block;
}
</style>
