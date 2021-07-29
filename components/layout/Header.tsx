import Search from "../ui/Search";
import Navigation from "./Navigation";
import Link from "next/link";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Button from "./../ui/Button";
import { Fragment, useContext } from "react";
import { FirebaseContext } from "../../firebase";

declare module "react" {
  interface Attributes {
    css?: any;
    bgColor?: any;
  }
}

const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--orange);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab", serif;
  margin-right: 2rem;
`;

const Header = () => {
  const { auth, firebase } = useContext(FirebaseContext);

  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gray3);
        padding: 1rem 0;
      `}
    >
      <HeaderContainer>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/">
            <Logo>P</Logo>
          </Link>
          <Search />
          <Navigation />
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {auth ? (
            <Fragment>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                Hola {auth.displayName}
              </p>
              <Button
                type="button"
                bgColor={true}
                onClick={() => {
                  firebase.logout()
                }}
              >
                Logout
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Link href="/login">
                <Button bgColor={true}>Login</Button>
              </Link>
              <Link href="/new-account">
                <Button> Create account</Button>
              </Link>
            </Fragment>
          )}
        </div>
      </HeaderContainer>
    </header>
  );
};

export default Header;
