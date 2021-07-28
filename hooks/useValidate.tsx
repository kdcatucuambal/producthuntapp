import React, { useEffect, useState } from "react";

export const useValidate = (stateInitial: any, validate: any, fn: any) => {
  const [values, setValues] = useState(stateInitial);
  const [errors, setErrors] = useState<any>({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        fn(); //Fn = function to ejecute in the component
      }
      setSubmitForm(false);
    }
  }, [errors]);

  //Function to ejecute when the user write
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  //Function to ejecute when user do to sumbit

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorsValidate = validate(values);
    setErrors(errorsValidate);
    setSubmitForm(true);
  };

  // when realzie event blur
  const handleBlur = () => {
    const errorsValidate = validate(values);
    setErrors(errorsValidate);
  };

  return {
    values,
    errors,
    submitForm,
    handleSubmit,
    handleChange,
    handleBlur,
  };
};
