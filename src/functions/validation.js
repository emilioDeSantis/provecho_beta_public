export function validateEmail(email) {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return 'Invalid email format';
    } else return null;
}
  
export function validatePassword(password) {
    if (!/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/i.test(
            password,
        )
    ) {
        return 'Password must have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long';
    } else return null;
}
  
export function validateUsername(username) {
    if (!/^[a-z0-9_-]{3,16}$/i.test(username)) {
        return 'Username must be between 3 and 16 characters long and conatain letters numbers and underscores only';
    } else return null;
}

export function validateName(name) {
    if (!/^[a-zA-Z\s]*$/.test(name)) {
        return 'name should be letters and spaces only';
    } else {
        return null;
    }
}
  
export function validateCode(code) {
    if (!code) {
        return 'Enter a valid codde';
    } else return null;
}