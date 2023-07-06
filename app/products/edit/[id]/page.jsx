"use client";

import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const EditProductPage = () => {
  const [productInfo, setProductInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("/api/products/" + id)
      .then((res) => {
        setProductInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div>
      <Layout>
        <h1>Edit Product</h1>
        {productInfo && <ProductForm {...productInfo} />}
      </Layout>
    </div>
  );
};

export default EditProductPage;
