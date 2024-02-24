<template>
    <div class="employeeItem">
        <div class="content">
            <div class="indexCount">
                9
            </div>
            <div class="employeeInfo">firstName</div>
            <div class="employeeInfo">lastName</div>
            <div class="employeeInfo">contact</div>



        </div>

        <div class="employeeInfo deleteIcon">
            <i class="pi pi-trash" style="font-size: 1.5rem"></i>
        </div>

    </div>
</template>


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
    transition: all 0.3s ease-in-out
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