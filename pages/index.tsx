import styled from "@emotion/styled";
import Layout from "../components/layout/Layout";
import {useEffect, useContext, useState} from "react";
import {FirebaseContext} from "../firebase";
import {IProduct} from "../models/app.interfaces";
import {QuerySnapshot} from "@firebase/firestore-types";
import ProductDetail from "../components/layout/ProductDetail";

const Heading = styled.h1`
  color: black;
`;

export default function Home() {

    const [products, setProducts] = useState<IProduct[]>([]);
    const {firebase} = useContext(FirebaseContext);

    useEffect(() => {
        const getProducts = () => {
            firebase.db.collection("products").orderBy('created', 'desc').onSnapshot(handleSnapshot);
        }
        getProducts();
    }, [])

    function handleSnapshot(snapshot: QuerySnapshot<IProduct>) {
        const products = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        setProducts(products);
    }

    return (
        <Layout>
            <div className={"listado-productos"}>
                <div className="contenedor">
                    <ul className="bg-white">
                        {products.map(product => (
                            <ProductDetail key={product.id} product={product}/>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
