import React, {useContext, useEffect, useState} from 'react';
import {IProduct} from "../models/app.interfaces";
import {FirebaseContext} from "../firebase";
import {QuerySnapshot} from "@firebase/firestore-types";

const useProduct = (order: string) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const {firebase} = useContext(FirebaseContext);

    useEffect(() => {
        const getProducts = () => {
            firebase.db.collection("products")
                .orderBy(order, 'desc').onSnapshot(handleSnapshot);
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
    return {
        products
    };
};

export default useProduct;
