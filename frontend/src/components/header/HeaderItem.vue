<template>
    <header>
        <div class="headerItems">

            <div class="title">
                <h1>Employees</h1>
                <p>There are 4 employees</p>
            </div>
            <SearchInput />
            <SelectInput />
            <ButtonItem />
        </div>


    </header>
</template>

<script setup>

import SearchInput from './SearchInput.vue';
import SelectInput from './SelectInput.vue'
import ButtonItem from './ButtonItem.vue'


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