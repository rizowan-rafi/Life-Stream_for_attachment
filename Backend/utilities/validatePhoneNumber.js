const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return false;
    const cleanNumber = phoneNumber.replace(/\D/g, "");

    
    const bdPhoneRegex = /^(88)?01[3-9]\d{8}$/;

    return bdPhoneRegex.test(cleanNumber);
};

export default validatePhoneNumber;