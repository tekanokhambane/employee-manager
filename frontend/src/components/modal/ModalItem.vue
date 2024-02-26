<template>
  <div :key="components" class="modalItem modal" :class="{ visible: modalStore.isModalOpen }">
    <div class="overlay"></div>
    <div class="modalContent">
      <div class="heading">
        <h1 class="title">{{ modalTitle }}</h1>
        <button class="closeButton" @click="closeModal">X</button>
      </div>
      <form @submit.prevent="onSubmit">
        <!-- Basic Info -->
        <div class="titleInfo">Basic Info</div>
        <div class="nameInfo">
          <div class="firstNameInfo formContent">
            <label for="firstName"> First Name</label>
            <input type="text" id="firstName" v-model="firstNameVModel" name="firstName" placeholder="First Name" />
            <span class="error" v-if="validateInput('first_name', employeesStore)">{{
              validateInput('first_name', employeesStore)
              ? employeesStore.message.first_name[0]
              : ''
            }}</span>
          </div>
          <div class="lastNameInfo formContent">
            <label for="lastName"> Last Name</label>
            <input type="text" id="lastName" v-model="lastNameVModel" name="lastName" placeholder="Last Name" />
            <span class="error" v-if="validateInput('last_name', employeesStore)">{{
              validateInput('last_name', employeesStore) ? employeesStore.message.last_name[0] : ''
            }}</span>
          </div>
        </div>
        <div class="contactInfo formContent">
          <label for="contact"> Contact</label>
          <input type="text" id="contact" v-model="contactVModel" name="contact" placeholder="Contact" />
          <span class="error" v-if="validateInput('contact_number', employeesStore)">{{
            validateInput('contact_number', employeesStore)
            ? employeesStore.message.contact_number[0]
            : ''
          }}</span>
        </div>
        <div class="emailAddress formContent">
          <label for="emailAddress"> Email Address</label>
          <input type="email" id="emailAddress" v-model="emailAddressVModel" name="emailAddress"
            placeholder="Email Address" />
          <span class="error" v-if="validateInput('email', employeesStore)">{{
            validateInput('email', employeesStore) ? employeesStore.message.email[0] : ''
          }}</span>
        </div>
        <div class="dateOfBirth formContent">
          <label for="dateOfBirth"> Date of Birth</label>
          <input type="date" id="dateOfBirth" v-model="dateOfBirthVModel" name="dateOfBirth" />
          <span class="error" v-if="validateInput('date_of_birth', employeesStore)">{{
            validateInput('date_of_birth', employeesStore)
            ? employeesStore.message.date_of_birth[0]
            : ''
          }}</span>
        </div>
        <!-- Address Info -->
        <div class="titleInfo">Address Info</div>
        <div class="addressInfo">
          <div class="streetAddress formContent">
            <label for="streetAddress"> Street Address</label>
            <input class="addressInput" type="text" id="streetAddress" v-model="streetAddressVModel" name="streetAddress"
              placeholder="Street Address" />
            <span class="error" v-if="validateInput('street_address', employeesStore)">{{
              validateInput('street_address', employeesStore)
              ? employeesStore.message.street_address[0]
              : ''
            }}</span>
          </div>
          <div class="address formContent">
            <div class="city">
              <label for="city"> City</label>
              <input class="addressInput" type="text" id="city" v-model="cityVModel" name="city" placeholder="City" />
              <span class="error" v-if="validateInput('city', employeesStore)">{{
                validateInput('city', employeesStore) ? employeesStore.message.city[0] : ''
              }}</span>
            </div>
            <div class="postcode formContent">
              <label for="postcode"> Postcode</label>
              <input class="addressInput" type="text" id="postcode" v-model="postcodeVModel" name="postcode"
                placeholder="Postcode" />
              <span class="error" v-if="validateInput('postcode', employeesStore)">{{
                validateInput('postcode', employeesStore) ? employeesStore.message.postcode[0] : ''
              }}</span>
            </div>
            <div class="country formContent">
              <label for="country"> Country</label>
              <div class="countryFilter">
                <v-select label="label" v-model="countryVModel" :reduce="(country) => country.countryShortCode"
                  :options="loadOptions"></v-select>
              </div>
              <span class="error" v-if="validateInput('country', employeesStore)">{{
                validateInput('country', employeesStore) ? employeesStore.message.country[0] : ''
              }}</span>
            </div>
          </div>
        </div>
        <!-- Skills -->
        <div class="titleInfo">Skills</div>
        <div class="skills">
          <!-- SkillComponent goes here -->
          <span class="error" v-if="validateInput('sills', employeesStore)">{{
            validateInput('skills', employeesStore) ? employeesStore.message.skills[0] : ''
          }}</span>

          <div v-if="modalStore.employeeData">
            <SkillComponent @remove-skill="removeSkill" v-for="(skill, index) in modalStore.employeeData.skills"
              :key="skill.index" :skill="skill" :index="index" />
          </div>
          <div v-if="employeesStore.newEmployee">
            <SkillComponent @remove-skill="removeSkill" v-for="(skill, index) in employeesStore.newEmployee.skills"
              :key="skill.index" :skill="skill" :index="index" />
          </div>
        </div>
        <div class="addSkill">
          <AddSkillButton @add-skill="addNewSkill" />
        </div>
        <div class="modalFooter">
          <button v-if="modalStore.employeeData &&
            employeesStore.updatedData &&
            employeesStore.updatedData.id === modalStore.employeeData.id
            " type="button" class="cancelButton" @click="cancel">
            Cancel
          </button>
          <button :class="{
            enableButton:
              firstNameVModel &&
              lastNameVModel &&
              contactVModel &&
              emailAddressVModel &&
              dateOfBirthVModel &&
              streetAddressVModel &&
              cityVModel &&
              postcodeVModel &&
              countryVModel
          }">
            {{ saveButtonText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import SkillComponent from './skills/SkillComponent.vue'
import AddSkillButton from './skills/AddSkillButton.vue'
import './style.css'
import { computed, onMounted, ref } from 'vue'
import { useModalStore } from '@/stores/modalStore'
import { useEmployeesStore } from '@/stores/employeesStore'
import { watch } from 'vue'
import { createComputedProperty } from '../../utils/dataHandler'
import { validateInput, validatePhoneNumber } from '../../utils/validation'
import { allCountries } from 'country-region-data'

const components = ref(true)

const modalStore = useModalStore()
const employeesStore = useEmployeesStore()
const skills = ref([])

const modalTitle = computed(() =>
  modalStore.isUpdatingEmployee ? 'Update Employee' : 'New Employee'
)
const saveButtonText = computed(() =>
  modalStore.isUpdatingEmployee ? 'Save changes to Employee' : 'Save and Add Employee'
)

const loadOptions = computed(() => {
  return allCountries.map((country) => ({
    label: country[0].toLowerCase(),
    countryShortCode: country[1].toString()
  }))
})

const firstNameVModel = createComputedProperty('first_name', employeesStore, modalStore)
const lastNameVModel = createComputedProperty('last_name', employeesStore, modalStore)
const contactVModel = createComputedProperty('contact_number', employeesStore, modalStore)
const emailAddressVModel = createComputedProperty('email', employeesStore, modalStore)
const dateOfBirthVModel = createComputedProperty('date_of_birth', employeesStore, modalStore)
const streetAddressVModel = createComputedProperty('street_address', employeesStore, modalStore)
const cityVModel = createComputedProperty('city', employeesStore, modalStore)
const postcodeVModel = createComputedProperty('postcode', employeesStore, modalStore)
const countryVModel = createComputedProperty('country', employeesStore, modalStore)

watch(contactVModel, (newVal) => {
  if (!validatePhoneNumber(newVal)) {
    employeesStore.message = { contact_number: ['Invalid phone number'] }
  } else {
    employeesStore.message = null
  }
})

/**
 * Function to add a new skill to the employee data.
 *
 * @param None
 * @return None
 */
const addNewSkill = () => {
  if (modalStore.isUpdatingEmployee) {
    localStorage.setItem('employeeData', JSON.stringify(modalStore.employeeData))
    localStorage.setItem('dataChanged', true)
    employeesStore.dataChanged = true
    modalStore.employeeData = JSON.parse(localStorage.getItem('employeeData'))
    employeesStore.updatedData = modalStore.employeeData
    employeesStore.updatedData.skills.push({
      index: employeesStore.newEmployee.skills.length,
      name: '',
      yrs_exp: '',
      seniority: ''
    })
    localStorage.setItem('updatedData', JSON.stringify(employeesStore.updatedData))
  } else {
    employeesStore.newEmployee.skills.push({
      index: skills.value.length,
      name: '',
      yrs_exp: '',
      seniority: ''
    })
    console.log(employeesStore.newEmployee)
  }
}

/**
 * Closes the modal and resets related data.
 *
 */
const closeModal = () => {
  modalStore.closeModalWithoutRefresh(employeesStore)
  employeesStore.message = null
  skills.value = []
}

/**
 * Check if skill exists in skills array and has an id. Then remove and delete from server.
 * If it doesn't have an id, just remove from skills array.
 *
 * @param {number} index - The index of the skill to be removed
 * @return {void}
 */
const removeSkill = (index) => {
  //check if skill exists in skills array and have an id. then remove and delete from server
  // if they dont have an id just remove from skills array
  if (skills.value[index].id) {
    skills.value.splice(index, 1)
    employeesStore.deleteSkill(skills.value[index].id)
    localStorage.removeItem('employeeData')
    employeesStore.employeeData = null
  } else {
    skills.value.splice(index, 1)
    skills.value.forEach((skill, i) => {
      skill.index = i
    })
  }
}

/**
 * Function to cancel employee data update and close modal.
 */
const cancel = () => {
  if (employeesStore.updatedData && employeesStore.updatedData.id === modalStore.employeeData.id) {
    modalStore.closeModal(employeesStore)
    skills.value = []
  } else {
    modalStore.closeModalWithoutRefresh(employeesStore)
    skills.value = []
  }
}

/**
  * Function for handling form submission. It sends a POST request to create a new employee if not updating, or a PUT request to update an existing employee if updating.
  */
const onSubmit = () => {

  if (
    firstNameVModel &&
    lastNameVModel &&
    contactVModel &&
    emailAddressVModel &&
    dateOfBirthVModel &&
    streetAddressVModel &&
    cityVModel &&
    postcodeVModel &&
    countryVModel
  ) {
    if (!modalStore.isUpdatingEmployee) {
      employeesStore.createEmployee(employeesStore, modalStore)
    } else {
      employeesStore.updateEmployee(modalStore.employeeData, modalStore)
    }
  }
}
</script>
