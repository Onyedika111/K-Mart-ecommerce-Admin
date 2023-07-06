"use client";

import Layout from "@/components/Layout";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DeleteProductPage = () => {
  const [productInfo, setProductInfo] = useState(null);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    axios
      .get("/api/products/" + id)
      .then((res) => {
        setProductInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function goBack() {
    router.push("/products");
    }
    
   async function deleteProduct() {
       await axios.delete('/api/products/' + id);
       goBack()

    }
  return (
    <Layout>
      <h1 className="text-center">
        {" "}
        Do you really want to delete product &nbsp;'{productInfo?.title}'?
      </h1>
      <div className=" flex gap-2 justify-center">
        <button onClick={deleteProduct} className="btn-red">Yes</button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
};

export default DeleteProductPage;
