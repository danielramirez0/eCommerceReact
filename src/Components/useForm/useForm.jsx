import { useState } from "react";

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
                        event.target.value.length > 0 && event.target.value.length < 8
                            ? "Password must be at least 8 characters"
                            : null,
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
