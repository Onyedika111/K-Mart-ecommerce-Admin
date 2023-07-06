"use client";

import Layout from "@/components/Layout";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DeleteCategoryPage = () => {
  const [categoryInfo, setCategoryInfo] = useState(null);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    axios
      .get("/api/categories/" + id)
      .then((res) => {
        setCategoryInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  function goBack() {
    router.push("/categories");
  }

  async function deleteCategory() {
    await axios.delete("/api/categories/" + id);
    goBack();
  }
  return (
    <Layout>
      <h1 className="text-center">
     
        Do you really want to delete {categoryInfo?.name}?
      </h1>
      <div className=" flex gap-2 justify-center">
        <button onClick={deleteCategory} className="btn-red">
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
};

export default DeleteCategoryPage;
