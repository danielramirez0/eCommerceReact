import { useState } from "react";
import validator from "validator";

const useForm = (callback) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        event.persist();

        // User Registration Validation
        switch (event.target.name) {
            case "password":
                setErrors((errors) => ({
                    ...errors,
                    password: 
                    // for this to work, npm install validator must be ran in the terminal first!!
                        validator.isStrongPassword(event.target.value, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}) === false
                         ? "password must be 8 characters including, one upppercase, one lowercase, one special character(!@#$%&), and one number."
                          : null  
                         
                }));
                break;
            case "verifyPassword":
                setErrors((errors) => ({
                    ...errors,
                    verifyPassword:
                        event.target.value !== values.password ? "Passwords do not match!" : null,
                }));
                break;
            default:
                break;
        }

        if (event.target.type === "checkbox") {
            if (event.target.checked) {
                setValues((values) => ({
                    ...values,
                    [event.target.name]: event.target.value,
                }));
            }
        } else {
            setValues((values) => ({
                ...values,
                [event.target.name]: event.target.value,
            }));
        }
    };

    const handleMultiSelect = (event) => {
        event.persist();

        const selections = [];
        const options = event.target.options;
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            if (option.selected) {
                selections.push(option.value);
            }
            setValues(() => ({
                ...values,
                multiSelect: selections,
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        callback();
    };

    const handleSubmitRefresh = () => {
        callback();
    };

    const clearValues = () => {
        setValues({});
    };
    return {
        errors,
        values,
        handleChange,
        handleSubmitRefresh,
        handleSubmit,
        clearValues,
        handleMultiSelect,
    };
};

export default useForm;
