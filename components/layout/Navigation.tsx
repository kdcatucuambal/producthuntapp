import React, { useContext } from "react";
import Link from "next/link";
import { FirebaseContext } from "../../firebase";
import styled from "@emotion/styled";

const Nav = styled.nav`
  padding-left: 2rem;
  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gray2);
    font-family: "PT Sans", sans-serif;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Navigation = () => {
  const { auth } = useContext(FirebaseContext);

  return (
    <Nav>
      <Link href="/">Home</Link>
      <Link href="/popular">Popular</Link>
      {auth && <Link href="/new-product">New Product</Link>}
    </Nav>
  );
};

export default Navigation;
