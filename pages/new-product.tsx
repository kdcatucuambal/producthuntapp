import React, { useContext, useState } from "react";
import { css } from "@emotion/react";
import Router, { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import { Field, Form, InputSubmit, Error } from "./../components/ui/Form";

import { FirebaseContext } from "../firebase";

//validates
import { useValidate } from "../hooks/useValidate";
import { INewProduct, IProduct } from "../models/app.interfaces";
import validateNewProduct from "../validate/validateNewProduct";
const stateInitial: INewProduct = {
  name: "",
  company: "",
  description: "",
  image: "",
  url: "",
};

const NewProduct = () => {
  const [error, setError] = useState({ state: false, message: "" });

  const { values, errors, handleSubmit, handleChange, handleBlur } =
    useValidate(stateInitial, validateNewProduct, createProduct);

  const { name, url, image, description, company } = values;

  //context
  const { auth, firebase } = useContext(FirebaseContext);

  //hook-routing
  const router = useRouter();

  async function createProduct() {
    //if doesn't exist user
    if (!auth) {
      return router.push("/login");
    }

    //object to new product
    const product: IProduct = {
      ...values,
      likes: 0,
      comments: [],
      created: Date.now()
    }

    //insert product
    firebase.db.collection("products").add(product);
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
          New Product
        </h1>
        <Form onSubmit={handleSubmit}>
          <fieldset>
            <legend>General Information</legend>

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
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={company}
                onChange={handleChange}
                placeholder="Put the company"
                onBlur={handleBlur}
              />
            </Field>
            {errors?.company && <Error>{errors.company}</Error>}
            {/* <Field>
              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                name="image"
                value={image}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors?.image && <Error>{errors.image}</Error>} */}
            <Field>
              <label htmlFor="url">URL</label>
              <input
                type="url"
                id="url"
                name="url"
                value={url}
                placeholder="Put the url"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors?.url && <Error>{errors.url}</Error>}
          </fieldset>

          <fieldset>
            <legend>About your product</legend>
            <Field>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleChange}
                onBlur={handleBlur}
              ></textarea>
            </Field>
            {errors?.description && <Error>{errors.description}</Error>}
          </fieldset>

          {error.state && <Error>{error.message}</Error>}
          <InputSubmit type="submit" value="Create product" />
        </Form>
      </>
    </Layout>
  );
};

export default NewProduct;
