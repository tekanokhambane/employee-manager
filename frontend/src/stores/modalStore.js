import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => ({
        isModalOpen: false,
        isUpdatingEmployee: false,
        employeeId: null,
        employeeData: localStorage.getItem('employeeData') ? JSON.parse(localStorage.getItem('employeeData')) : null, // Store employee data in local storage
    }),
    actions: {
        openModalForCreate(employeesStore) {
            this.isModalOpen = true;
            this.isUpdatingEmployee = false;
            this.employeeId = null;
            this.employeeData = null;
            employeesStore.newEmployee = {
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
                skills: [],
            }

            document.body.style.overflow = 'hidden';
        },

        openModalForUpdate(employeeData, employeesStore) {

            this.isUpdatingEmployee = true;
            const localStorageEmployeeData = JSON.parse(localStorage.getItem('employeeData'));

            if (localStorageEmployeeData && localStorageEmployeeData.id === employeeData.id) {
                // Check for differences between local storage employee data and new employee data
                const differences = Object.keys(employeeData).some(key => {
                    return JSON.stringify(employeeData[key]) !== JSON.stringify(localStorageEmployeeData[key]);
                });
                if (differences) {
                    // Use local storage employee data if no differences found
                    this.employeeData = localStorageEmployeeData;
                    employeesStore.newEmployee = localStorageEmployeeData
                    this.isModalOpen = true;
                } else {
                    // Update this.employeeData with new employee data
                    this.employeeData = employeeData;
                    this.isModalOpen = true;
                }
            } else {
                this.employeeData = employeeData;
                this.isModalOpen = true;
            }

            document.body.style.overflowY = 'hidden';
        },
        closeModal(employeesStore) {
            document.body.style.overflowY = 'auto';
            if (employeesStore) {
                employeesStore.dataChanged = false
                employeesStore.updatedData = null
                employeesStore.message = null

            }
            this.resetEmployeeData();
            this.isModalOpen = false;
        },
        closeModalWithoutRefresh(employeesStore) {
            this.isModalOpen = false;
            this.isUpdatingEmployee = false;
            this.employeeData = null;
            // this.employeeData = JSON.parse(localStorage.getItem('employeeData'));
            document.body.style.overflowY = 'auto';
            // window.location.reload();
        },

        resetEmployeeData() {
            this.employeeData = null;
            this.isUpdatingEmployee = false;
            this.employeeId = null;
            this.employeeData = null;
            localStorage.removeItem('employeeData');
            localStorage.removeItem('updatedData');
            localStorage.setItem('dataChanged', 'false');

        }
    },
});
