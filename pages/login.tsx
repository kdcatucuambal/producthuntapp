import React, { useState } from "react";
import { css } from "@emotion/react";
import Router from "next/router";
import Layout from "../components/layout/Layout";
import { Field, Form, InputSubmit, Error } from "./../components/ui/Form";
import {  } from "react-firebase-file-uploader";
import firebase from "../firebase";
//validates
import { useValidate } from "../hooks/useValidate";
import { ILogin } from "../models/app.interfaces";
import validateLogin from "../validate/validateLogin";

const stateInitial: ILogin = {
  email: "",
  password: "",
};

const Login = () => {
  const [error, setError] = useState({ state: false, message: "" });

  const { values, errors, handleSubmit, handleChange, handleBlur } =
    useValidate(stateInitial, validateLogin, login);

  const { password, email } = values;

  async function login() {
    try {
      const user = await firebase.login(values);
      await Router.push('/');
    } catch (error) {
      console.log(error);
      setError({
        state: true,
        message: error.message,
      });
    }
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
          Login
        </h1>
        <Form onSubmit={handleSubmit}>
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
          {errors?.email && <Error>{errors.email}</Error>}
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
          {errors?.password && <Error>{errors.password}</Error>}
          {error.state && <Error>{error.message}</Error>}
          <InputSubmit type="submit" value="Login" />
        </Form>
      </>
    </Layout>
  );
};

export default Login;
