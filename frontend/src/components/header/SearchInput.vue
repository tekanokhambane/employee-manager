<template>
    <input class="searchFilter" type="text" placeholder="Search..." />
</template>



<style scoped>
.searchFilter {
    width: 300px;
    height: 30px;
    padding: 10px;
    border: 1px solid rgb(179, 176, 176);
    border-radius: 5px;
    color: white;
    background-color: rgb(43, 7, 77);
    outline: none;
}

.searchFilter:focus {
    border: 1px solid white;
    background-color: rgb(43, 7, 77);
    color: white;
}

.searchFilter::placeholder {
    color: white;
}
</style>
