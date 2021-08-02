import React from 'react';
import {IProduct} from "../../models/app.interfaces";
import styled from "@emotion/styled";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Link from "next/link";


const Product = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`

const ProductDescription = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`;

const Title = styled.a`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;

  :hover {
    cursor: pointer;
  }
`;

const TextDescription = styled.p`
  font-size: 1.6rem;
  margin: 0;
  color: #888;
`;

const Comments = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: .3rem 1rem;
    margin-right: 2rem;
  }

  img {
    width: 2rem;
    margin-right: 1.6rem;
  }

  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;

    &:last-of-type {
      margin: 0;
    }
  }
`

const Image = styled.img`
  width: 200px;
`;

const Likes = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 3rem;

  div {
    font-size: 2rem;
  }

  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`;

interface ProductDetailProps {
    product: IProduct
}

const ProductDetail = ({product}: ProductDetailProps) => {
    return (
        <Product>
            <ProductDescription>
                <Image src={product.image} alt={product.name}/>
                <div>
                    <Link href="/products/[id]" as={`/products/${product.id}`}>
                        <Title>{product.name}</Title>
                    </Link>
                    <TextDescription>{product.description}</TextDescription>
                    <Comments>
                        <div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/static/img/comentario.png" alt="comment"/>
                            <p>{product.comments.length} comments</p>
                        </div>
                    </Comments>
                    <p>Posted ago: {formatDistanceToNow(new Date(product.created))}</p>
                </div>
            </ProductDescription>
            <Likes>
                <div> &#9650; </div>
                <p>{product.likes}</p>
            </Likes>
        </Product>
    );
};

export default ProductDetail;

