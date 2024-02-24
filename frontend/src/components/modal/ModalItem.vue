<template>
    <div class="modalItem modal">
        <div class="overlay"></div>
        <div class="modalContent">
            <div class="heading">
                <h1 class="title">Create employee</h1>
                <button class="closeButton">X</button>
            </div>
            <form>
                <!-- Basic Info -->
                <div class="titleInfo">Basic Info</div>
                <div class="nameInfo">
                    <div class="firstNameInfo formContent">
                        <label for="firstName"> First Name</label>
                        <input type="text" id="firstName" name="firstName" placeholder="First Name" />

                    </div>
                    <div class="lastNameInfo formContent">
                        <label for="lastName"> Last Name</label>
                        <input type="text" id="lastName" name="lastName" placeholder="Last Name" />

                    </div>
                </div>
                <div class="contactInfo formContent">
                    <label for="contact"> Contact</label>
                    <input type="text" id="contact" name="contact" placeholder="Contact" />


                </div>
                <div class="emailAddress formContent">
                    <label for="emailAddress"> Email Address</label>
                    <input type="email" id="emailAddress" name="emailAddress" placeholder="Email Address" />

                </div>
                <div class="dateOfBirth formContent">
                    <label for="dateOfBirth"> Date of Birth</label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" />

                </div>
                <!-- Address Info -->
                <div class="titleInfo">Address Info</div>
                <div class="addressInfo">
                    <div class="streetAddress formContent">
                        <label for="streetAddress"> Street Address</label>
                        <input class="addressInput" type="text" id="streetAddress" name="streetAddress"
                            placeholder="Street Address" />

                    </div>
                    <div class="address formContent">
                        <div class="city ">
                            <label for="city"> City</label>
                            <input class="addressInput" type="text" id="city" name="city" placeholder="City" />

                        </div>
                        <div class="postcode formContent">
                            <label for="postcode"> Postcode</label>
                            <input class="addressInput" type="text" id="postcode" name="postcode" placeholder="Postcode" />

                        </div>
                        <div class="country formContent">
                            <label for="country"> Country</label>
                            <input class="addressInput" type="text" id="country" name="country" placeholder="Country" />

                        </div>
                    </div>
                </div>
                <!-- Skills -->
                <div class="titleInfo">Skills</div>
                <div class="skills">
                    <!-- SkillComponent goes here -->


                    <SkillComponent />

                </div>
                <div class="addSkill">
                    <AddSkillButton />
                </div>
                <div class="modalFooter">
                    <button type="button" class="cancelButton">Cancel</button>
                    <button>
                        Save </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import './style.css'

</script>