import { computed } from 'vue'
import axios from 'axios'
import { validatePhoneNumber } from '@/utils/validation'

export const createComputedProperty = (property, employeesStore, modalStore) => {
  /**
   * Creates a computed property based on the provided property.
   *
   * @param {string} property - The property to create a computed property for
   * @return {object} The computed property object
   */
  return computed({
    get: () =>
      modalStore.isUpdatingEmployee
        ? modalStore.employeeData[property]
        : employeesStore.newEmployee[property],
    set: (value) => {
      if (modalStore.isUpdatingEmployee) {
        if (property === 'contact_number') {
          // Check if the input is a valid phone number
          if (!validatePhoneNumber(value)) {
            // Append error message
            // employeesStore.message = { contact_number: ['Invalid phone number'] }

            return
          }
        } else if (property === 'country') {
          modalStore.employeeData[property] = value.countryShortCode
        } else {
          modalStore.employeeData[property] = value
        }
        localStorage.setItem('employeeData', JSON.stringify(modalStore.employeeData))
        localStorage.setItem('dataChanged', true)
        employeesStore.dataChanged = true
        modalStore.employeeData = JSON.parse(localStorage.getItem('employeeData'))
        employeesStore.updatedData = modalStore.employeeData
        localStorage.setItem('updatedData', JSON.stringify(employeesStore.updatedData))
      } else {
        employeesStore.newEmployee[property] = value
      }
    }
  })
}

export const checkEmailExists = (email, employeesStore) => {
  if (email.length > 3) {
    axios.post(`/api/check-email/${email}/`).then((response) => {
      console.log(response)
      if (response.data.exists) {
        // append error message
        employeesStore.message = { email: ['Email already exists'] }
      } else {
        employeesStore.message = null
      }
    })
  }
}
