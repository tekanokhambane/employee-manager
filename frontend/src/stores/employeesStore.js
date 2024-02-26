import { defineStore } from 'pinia'
import axios from 'axios'

export const useEmployeesStore = defineStore('employees', {
  state: () => ({
    employees: [],
    skills: [],
    filterDate: '',
    selectedFilter: '',
    updatedData: localStorage.getItem('updatedData')
      ? JSON.parse(localStorage.getItem('updatedData'))
      : null,
    dataChanged: localStorage.getItem('dataChanged')
      ? JSON.parse(localStorage.getItem('dataChanged'))
      : false,
    message: null,
    newEmployee: {
      first_name: '',
      last_name: '',
      date_of_birth: '',
      email: '',
      phone_number: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
      country: '',
      skills: []
    }
  }),
  actions: {
    fetchEmployees() {
      axios.get('/api/employees').then((response) => {
        this.employees = response.data
      })
    },
    searchEmployees(searchTerm) {
      axios.get(`/api/employees?search=${searchTerm}`).then((response) => {
        this.employees = response.data
      })
    },
    createEmployee(employeesStore, modalStore) {
      axios
        .post(`/api/employees/`, employeesStore.newEmployee)
        .then((response) => {
          employeesStore.newEmployee.skills.forEach((skill) => {
            this.createSkill(response.data.id, skill)
          })
        })
        .then(() => {
          this.dataChanged = false
          modalStore.closeModal()
          employeesStore.fetchEmployees()

          employeesStore.message = null
        })
        .catch((error) => {
          if (error) {
            this.message = error.response.data
          }
        })
    },
    updateEmployee(employeeData, skills, modalStore) {
      axios
        .put(`/api/employees/${employeeData.id}/`, employeeData)
        .then((response) => {
          employeeData.skills.forEach((skill) => {
            if (!skill.id) {
              if (skill.yrs_exp && skill.seniority && skill.name) {
                this.createSkill(response.data.id, skill)
              }
            } else {
              this.unpdateSkill(skill.id, skill)
            }
          })
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          modalStore.closeModal()
          modalStore.employeeData = null

          this.dataChanged = false
          this.updatedData = null
          this.fetchEmployees()
        })
    },
    deleteEmployee(employeeId) {
      axios
        .delete(`/api/employees/${employeeId}`)
        .then((response) => {
          console.log(response.data)
          this.employees = this.employees.filter((employee) => employee.id !== employeeId)
          this.dataChanged = false
          localStorage.setItem('dataChanged', false)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createSkill(employeeId, skillData) {
      axios
        .post(`/api/skills/`, {
          name: skillData.name,
          yrs_exp: skillData.yrs_exp,
          seniority: skillData.seniority,
          employee: employeeId
        })
        .then((response) => {
          console.log(`Skill created successfully with ID: ${response.data.id}`)
        })
    },
    unpdateSkill(skillId, skillData) {
      axios
        .put(`http://127.0.0.1:8000/api/skills/${skillId}/`, skillData)
        .then(() => {
          console.log('Skill updated successfully')
        })
        .catch((error) => {
          console.error(error)
        })
    },
    deleteSkill(skillId) {
      axios
        .delete(`http://127.0.0.1:8000/api/skills/${skillId}/`)
        .then(() => {
          console.log('Skill deleted successfully')
        })
        .catch((error) => {
          console.error(error)
        })
    },
    initializeFromLocalStorage() {
      const dataChanged = localStorage.getItem('dataChanged')
      if (dataChanged) {
        this.dataChanged = JSON.parse(dataChanged)
      }

      const updatedEmployees = localStorage.getItem('updatedEmployees')
      if (updatedEmployees) {
        this.updatedEmployees = JSON.parse(updatedEmployees)
      }
    },
    resetSelectedEmployee() {
      this.selectedEmployee = {}
    },
    resetNewEmployee() {
      this.newEmployee = {
        first_name: '',
        last_name: '',
        contact_number: '',
        email: '',
        date_of_birth: '',
        street_address: '',
        city: '',
        postcode: '',
        country: '',
        skills: []
      }
    },
    resetUpdatedEmployees() {
      this.updatedEmployees = []
    },
    fetchSkills() {
      axios.get('/api/skills/').then((response) => {
        this.skills = [...new Map(response.data.map((item) => [item.name, item])).values()]
      })
    }
  }
})
