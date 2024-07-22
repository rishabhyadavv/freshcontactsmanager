export const validateGermanPhoneNumber = (phoneNumber: string): boolean => {
    const cleaned = phoneNumber.replace(/[^\d+()]/g, '');
    // a phone number validation librray or custom logics can be implemnted here to validate all countries phone number format
    // I am only keeping check for numbers and length here for now.

     if (cleaned.length >= 10 && cleaned.length <= 15) {
        return true;
     } 
  
    return false;
  };