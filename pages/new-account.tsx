import React, {useState} from "react";
import {css} from "@emotion/react";
import Router from "next/router";
import Layout from "../components/layout/Layout";
import {Field, Form, InputSubmit, Error} from "./../components/ui/Form";

import firebase from "../firebase";

//validates
import {useValidate} from "../hooks/useValidate";
import {INewAccount} from "../models/app.interfaces";
import validateNewAccount from "../validate/validateNewAccount";

const NewAccount = () => {
    const stateInitial: INewAccount = {
        name: "",
        email: "",
        password: "",
    };

    const [error, setError] = useState({state: false, message: ""});

    const {values, errors, handleSubmit, handleChange, handleBlur} =
        useValidate(stateInitial, validateNewAccount, createAccount);

    const {name, password, email} = values;

    async function createAccount() {
        try {
            await firebase.register({...values});
            await Router.push("/");
        } catch (error) {
            console.log("There is an error", error);
            setError({state: true, message: error.message});
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
                    {errors?.name && <Error>{errors.name}</Error>}
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
                    <InputSubmit type="submit" value="Create account"/>
                </Form>
            </>
        </Layout>
    );
};

export default NewAccount;
