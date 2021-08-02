import React, {useContext, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {FirebaseContext} from "../../firebase";
import {IProduct} from "../../models/app.interfaces";
import {DocumentSnapshot} from "@firebase/firestore-types";
import Error404 from "../../components/layout/404";
import Layout from "../../components/layout/Layout";
import {css} from '@emotion/react';
import styled from "@emotion/styled";

const ProductContainer = styled.div`
  @media (min-width: 169px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const Product = () => {
    //Routing for get current id
    const router = useRouter();
    const productId = router.query['id'];
    const [product, setProduct] = useState<IProduct>();
    const [error, setError] = useState(false);
    //context of firebase
    const {firebase} = useContext(FirebaseContext);
    useEffect(() => {
        if (productId) {
            const getProduct = async () => {
                await firebase.db.collection('products').doc(productId.toString())
                    .onSnapshot(handleSnapshot);
                //const product = await productQuery.get();

            }
            getProduct();
        }
    }, [productId]);

    function handleSnapshot(snapshot: DocumentSnapshot<IProduct>) {
        if (snapshot.exists) {
            const product = snapshot.data();
            setProduct(product);
        } else {
            setError(true);
        }
    }

    if (!product) return "Loading ...";

    return (
        <Layout>
            <>
                {error && <Error404/>}
                <div className="contenedor">
                    <h1 css={css`text-align: center;
                      margin-top: 5rem`}>From {productId}</h1>
                    <ProductContainer>
                        <div>1</div>
                        <aside>2</aside>
                    </ProductContainer>
                </div>
            </>
        </Layout>
    );
};

export default Product;
