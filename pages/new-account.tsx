import React from "react";
import { css } from "@emotion/react";
import Layout from "../components/layout/Layout";
import { Field, Form, InputSubmit } from "./../components/ui/Form";

const NewAccount = () => {
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
        <Form action="">
          <Field>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Put your name"
            />
          </Field>
          <Field>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Put your email"
            />
          </Field>
          <Field>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Put a password"
            />
          </Field>
          <InputSubmit type="submit" value="Create account" />
        </Form>
      </>
    </Layout>
  );
};

export default NewAccount;
