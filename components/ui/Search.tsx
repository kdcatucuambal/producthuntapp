import styled from "@emotion/styled";
import {css} from "@emotion/react";
import React, {useState} from "react";
import Router from "next/router";

const InputText = styled.input`
  border: 1px solid var(--gray3);
  padding: 1rem;
  min-width: 300px;
`;

const InputSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url("/static/img/buscar.png");
  background-repeat: no-repeat;
  position: absolute;
  right: 1rem;
  top: 1px;
  background-color: white;
  border: none;
  text-indent: -9999px;

  &:hover {
    cursor: pointer;
  }
`;


const Search = () => {
    const [search, setSearch] = useState('');
    const searchProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (search.trim() === "") return;
        //redirect /search
        Router.push({
            pathname: '/search',
            query: {"q": search}
        })

    }

    function searchProduct2(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log('searching', search);
        console.log(this);
    }

    return (
        <form onSubmit={searchProduct}
              css={css`
                position: relative;
              `}
        >
            <InputText type="text" placeholder="Search products ..." onChange={e => setSearch(e.target.value)}/>
            <InputSubmit type="submit">Search</InputSubmit>
        </form>
    );
};

export default Search;
