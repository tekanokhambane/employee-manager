<template>
    <button type="button" @click="$emit('add-skill')" class="addSkillButton">+ Add New Skill</button>
</template>

<style scoped>
.addSkillButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 30px;
    padding: 20px 20px;
    margin-right: 30px;
    border: 1px solid rgb(25, 3, 46);
    border-radius: 10px;
    color: white;
    background-color: rgb(179, 176, 176);
    outline: none;
    cursor: pointer;
}
</style>