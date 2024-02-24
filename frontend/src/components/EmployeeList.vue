<template>
    <div class="unsaved ">
        <i class="pi pi-exclamation-triangle" style="font-size: 1.5rem"></i>
        You have unsaved changes
    </div>
    <div class="employeeList">
        <EmployeeItem />

    </div>
</template>


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
</style>