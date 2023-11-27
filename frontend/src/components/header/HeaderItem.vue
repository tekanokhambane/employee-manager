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
                        <input type="date" />
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
import { useModalStore } from '../../stores/modalStore.js';
import { useEmployeesStore } from '@/stores/employeesStore';
import SearchInput from './SearchInput.vue';
import SelectInput from './SelectInput.vue'
import ButtonItem from './ButtonItem.vue'


import 'vue-select/dist/vue-select.css';
import { computed } from 'vue';
import axios from 'axios';
const modalStore = useModalStore();

const employeesStore = useEmployeesStore();

// check if the selected filter is skills, if yes, show the skills dropdown and fetch the skills using the fetchSkills method in employeesStore
// else if the selected filter is date_of_birth, show the date of birth input


const selectedSkill = computed({
    get() {
        return employeesStore.selectedSkill
    },
    set(value) {
        employeesStore.selectedSkill = value
        if (value) {
            console.log(value)
            // filter employees by selected skill
            axios.get(`/api/employees/?skills=${value.name}`).then(response => {
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
    font-size: 28px
}

header p {
    color: white;
    font-size: 14px
}

.filterBySkills {
    width: 200px;
    background-color: rgb(179, 176, 176);
    margin-top: 0.5rem;
}
</style>