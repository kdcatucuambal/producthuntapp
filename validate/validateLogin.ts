import {ILogin} from "../models/app.interfaces";

export default function validateLogin(values: ILogin) {
    const errors: Partial<ILogin> = {};

    //validate email
    if (!values.email) {
        errors.email = "Name is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Email is not valid";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 6) {
        errors.password = "The password must be at least 6 digits";
    }

    return errors;
}
