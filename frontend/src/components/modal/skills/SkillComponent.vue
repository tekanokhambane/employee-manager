<template>
    <div class="skill">
        <!-- add skill skill name input, years of experience input and seniority dropdown -->

        <div class="skillName">
            <label for="skillName"> Skill Name</label>
            <input type="text" id="skillName" v-model="reactiveSkill.name" name="skillName" placeholder="Skill Name" />
        </div>
        <div class="yearsOfExperience">
            <label for="yearsOfExperience"> Years of Experience</label>
            <input type="text" id="yearsOfExperience" v-model="reactiveSkill.yrs_exp" name="yearsOfExperience"
                placeholder="Years of Experience" />
        </div>
        <div class="seniority">
            <label for="seniority"> Seniority</label>
            <!--create a dropdown select input -->
            <select id="seniority" v-model="reactiveSkill.seniority" name="seniority">
                <option value="junior">Junior</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
            </select>
        </div>
        <div class="removeSkill" @click="$emit('remove-skill', index)">
            <RemoveSkillButton />
        </div>
    </div>
</template>


<script setup>
import RemoveSkillButton from './RemoveSkillButton.vue';
import { toRefs } from 'vue';
const props = defineProps({
    skill: {
        type: Object,
        required: true
    },
    index: Number
});

const { skill: reactiveSkill } = toRefs(props);

// Use reactiveSkill in the template for v-model binding


</script>

<style scoped>
.skill {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
}

.skillName,
.yearsOfExperience,
.seniority {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1px;
    width: 100%;
}

.yearsOfExperience input {
    width: 50px;
}

.seniority select {
    width: 100%;
    height: 100%;
    padding: 5px;
    height: 30px;
    border-radius: 5px;
    color: white;
    background-color: rgb(179, 176, 176);
    outline: none;
    font-size: large;
}

input,
select {
    width: 100%;
    height: 30px;
    padding: 10px;
    height: 30px;
    border-radius: 5px;
    color: white;
    background-color: rgb(179, 176, 176);
    outline: none;
}


label {
    color: white;
    font-size: 14px;
}
</style>