import styled from "@emotion/styled";
import Layout from "../components/layout/Layout";
import ProductDetail from "../components/layout/ProductDetail";
import useProduct from "../hooks/useProduct";


export default function Home() {

    const {products} = useProduct("created");

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
