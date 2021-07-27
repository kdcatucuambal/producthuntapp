import React, { useEffect, useState } from "react";

const useValidate = (stateInitial: any, validate: any, fn: any) => {
  const [values, setValues] = useState(stateInitial);
  const [errors, setErrors] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        fn(); //Fn = function to ejecute in the component
      }
      setSubmitForm(false);
    }
  }, []);

  //FUnction to ejecute when the user write
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
    setSubmitForm(false);
  };
  return {
    values,
    errors,
    submitForm,
    handleSubmit,
    handleChange,
  };
};

export default useValidate;
