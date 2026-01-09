
// this function will return an object which contains errors,
// if error(in returned obj) -> show on frontend -> prevent data submission to backend 
// if no error(empty returned obj) -> directly submit data to backend 

const validateForm = (data) => {
    
    // 1 creating empty errors object 
    const errors = {};

    // 2. Check name - name must be at least 2 characters
    if(data.name && data.name.trim().length < 2){
        errors.name = "Name must be at least 2 characters";
    }

    // 3 Check email - email should contain '@' and '.'
    if(data.email && (!data.email.includes('@') || !data.email.includes('.'))) {
        errors.email = "Email must contain '@' and '.'";
    }

    // 4 Check phone - remove non-digits, then checking length
    const digitsOnly = data.phone.replace(/\D/g, '');
    if(digitsOnly.length !== 10){
        errors.phone = "Phone number must be exactly 10 digits.";
    }

    // 5 Check message - message must be at least 3 characters
    if(data.message && data.message.trim().length < 3){
        errors.message = "Message must be at least 3 characters";
    }

    // 6 return the errors object 
    return errors;
}

export default validateForm;