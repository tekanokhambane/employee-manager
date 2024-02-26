/**
 * Validates a phone number.
 *
 * This function uses a regular expression to validate the phone number format.
 * The phone number should be in the format of:
 * - Optional international code with a plus sign (+) followed by 1 to 3 digits and an optional hyphen or space
 * - 10 digits
 *
 * @param {string} phoneNumber - The phone number to validate.
 * @returns {boolean} - Returns true if the phone number is valid, otherwise returns false.
 */
export function validatePhoneNumber(phoneNumber) {
  // This is a simple phone number validation. You might want to use a more complex one depending on your needs.
  const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/
  return phoneRegex.test(phoneNumber)
}

/**
 * Validates the input against the employeesStore.
 * 
 * @param {string} input - The input to be validated.
 * @param {object} employeesStore - The employeesStore object.
 * @returns {boolean} - Returns true if the input is valid, otherwise false.
 */
export const validateInput = (input, employeesStore) => {
  if (employeesStore.message && employeesStore.message[input]) {
    return true
  } else {
    return false
  }
}
