import React, {useEffect} from "react";
import Layout from "../components/layout/Layout";
import useProduct from "../hooks/useProduct";
import ProductDetail from "../components/layout/ProductDetail";

const Popular = () => {
    const {products} = useProduct("likes");
    return (
        <Layout>
            <h2>Popular Products</h2>
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
};

export default Popular;
