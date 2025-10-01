// Allowed extensions
const allowedExtensions = ["jpg", "jpeg", "png"];

/**
 * Validate file extension
 * @param {File} file - The file to validate
 * @returns {string|null} - Error message or null if valid
 */
export default function validateFileExtension (file) {

  const extension = file.name.split(".").pop().toLowerCase();

 if (!allowedExtensions.includes(extension)) {
    throw new Error(JSON.stringify({
      errors: {
        imageType: ["Only JPG, JPEG, or PNG are allowed."]
      }
    }));
  }

  return null; 
};
