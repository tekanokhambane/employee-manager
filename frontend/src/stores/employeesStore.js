import { defineStore } from 'pinia'
import axios from 'axios'

export const useEmployeesStore = defineStore('employees', {
    /**
     * Initializes the state with default values for employees, skills, filterDate, selectedFilter,
     * updatedData, dataChanged, message, and newEmployee.
     * The employees array is initialized as an empty array Which is populated by the API call to get all employees
     * The skills array is initialized as an empty array Which is populated by the API call to get all skills when the skills filter is applied
     * The filterDate is initialized as an empty string that will be used when the date filter is applied
     * the selectedFilter is initialized as an empty string that will be used when the date filter is applied
     * updatedData is initialized as null and will be used to store the updated data of the employee when changes are made
     * dataChanged is initialized as false and will be used to track if changes have been made
     * message is used for displaying error and warning messages
     * newEmployee is initialized as an empty object that will be used to store the new employee data when creating a new employee
     * 
     *
     * @return {Object} The initial state object
     */
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
        /**
 * Fetches the employees from the API and updates the local employees data.
 *
 * @param None
 * @return None
 */
        fetchEmployees() {
            /**
         * Fetches the employees from the API and updates the local employees data.
         *
         * @param None
         * @return None
         */
            axios.get('/api/employees').then((response) => {
                this.employees = response.data
            })
        },
        /**
         * Perform a search for employees based on the given search term.
         *
         * @param {string} searchTerm - The search term to use for searching employees
         * @return {void} 
         */
        searchEmployees(searchTerm) {
            axios.get(`/api/employees?search=${searchTerm}`).then((response) => {
                this.employees = response.data
            })
        },
        /**
         * A function to create an employee and handle related data changes and error handling.
         *
         * @param {employeesStore} employeesStore - the store for employees data
         * @param {modalStore} modalStore - the store for modal related data
         * @return {void} no return value
         */
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
        /**
         * Update employee data and skills.
         *
         * @param {object} employeeData - the data of the employee to be updated
         * @param {array} skills - the skills to be updated
         * @param {object} modalStore - the modal store for handling modals
         */
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
        /**
         * Deletes an employee by their ID.
         *
         * @param {number} employeeId - The ID of the employee to be deleted
         * @return {void} 
         */
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
        /**
         * Create a skill for a given employee.
         *
         * @param {number} employeeId - The ID of the employee
         * @param {object} skillData - The skill data including name, years of experience, and seniority
         * @return {void} 
         */
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
        /**
         * Updates a skill with the given skillId using the provided skillData.
         *
         * @param {type} skillId - description of skillId
         * @param {type} skillData - description of skillData
         * @return {type} description of return value
         */
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
        /**
         * Deletes a skill by skillId.
         *
         * @param {type} skillId - The ID of the skill to be deleted
         * @return {type} undefined
         */
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
        /**
         * Initializes data from local storage.
         */
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
        /**
         * Resets the selected employee by setting it to an empty object.
         */
        resetSelectedEmployee() {
            this.selectedEmployee = {}
        },
        /**
         * Resets the new employee object to have empty string properties and an empty skills array.
         */
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
        /**
         * Resets the updated employees array.
         */
        resetUpdatedEmployees() {
            this.updatedEmployees = []
        },
        /**
         * Fetches skills from the API and sets the skills property.
         */
        fetchSkills() {
            axios.get('/api/skills/').then((response) => {
                this.skills = [...new Map(response.data.map((item) => [item.name, item])).values()]
            })
        }
    }
})
