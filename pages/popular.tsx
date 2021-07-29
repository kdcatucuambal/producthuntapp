import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";

const Popular = () => {
  useEffect(() => {
    console.log("Use effect from popular");
    return () => {
      console.log("Usse effect desmonado");
    };
  }, []);
  return (
    <Layout>
      <h1>Popular</h1>
    </Layout>
  );
};

export default Popular;
