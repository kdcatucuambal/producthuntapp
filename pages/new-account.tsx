import React from "react";
import { css } from "@emotion/react";
import Layout from "../components/layout/Layout";
import { Field, Form, InputSubmit, Error } from "./../components/ui/Form";

//validates
import { useValidate } from "../hooks/useValidate";
import { INewAccount } from "../models/app.interfaces";
import validateNewAccount from "../validate/validateNewAccount";
const NewAccount = () => {
  const stateInitial: INewAccount = {
    name: "",
    email: "",
    password: "",
  };

  const { values, errors, handleSubmit, handleChange, handleBlur } =
    useValidate(stateInitial, validateNewAccount, createAccount);

  const { name, email, password } = values;

  function createAccount() {
    console.log("Creating account");
  }

  return (
    <Layout>
      <>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          Create account
        </h1>
        <Form onSubmit={handleSubmit}>
          <Field>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Put your name"
              onBlur={handleBlur}
            />
          </Field>
          {errors.name && <Error>{errors.name}</Error>}
          <Field>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Put your email"
              onBlur={handleBlur}
            />
          </Field>
          {errors.email && <Error>{errors.email}</Error>}
          <Field>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Put a password"
              onBlur={handleBlur}
            />
          </Field>
          {errors.password && <Error>{errors.password}</Error>}
          <InputSubmit type="submit" value="Create account" />
        </Form>
      </>
    </Layout>
  );
};

export default NewAccount;
