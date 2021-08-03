import Layout from "../components/layout/Layout";
import {useRouter} from "next/router";
import ProductDetail from "../components/layout/ProductDetail";
import useProduct from "../hooks/useProduct";
import {useEffect, useState} from "react";
import {IProduct} from "../models/app.interfaces";

const Search = () => {
    const router = useRouter();
    const search = router.query['q'].toString();
    //All products
    const {products} = useProduct("created");
    const [result, setResult] = useState<IProduct[]>([]);

    useEffect(() => {
        const q = search.toLowerCase();
        const filter = products.filter(product =>
            (product.name.toLowerCase().includes(q)) ||
            product.description.toLowerCase().includes(q));
        setResult(filter);
    }, [search, products]);

    return (
        <Layout>
            <div className={"listado-productos"}>
                <h2>Result of search</h2>
                <div className="contenedor">
                    <ul className="bg-white">
                        {result.map(product => (
                            <ProductDetail key={product.id} product={product}/>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default Search;
