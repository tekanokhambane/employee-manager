

export function validatePhoneNumber(phoneNumber) {
    // This is a simple phone number validation. You might want to use a more complex one depending on your needs.
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return phoneRegex.test(phoneNumber);
}

export const validateInput = (input, employeesStore) => {
    if (employeesStore.message && employeesStore.message[input]) {
        return true
    } else {
        return false
    }
};