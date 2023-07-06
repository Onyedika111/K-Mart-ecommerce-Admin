import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "@uploadthing/react/styles.css";
import { ReactSortable } from "react-sortablejs";
import { UploadButton } from "@uploadthing/react";

import { ourFileRouter } from "@/app/api/uploadthing/core";

import Link from "next/link";

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImage,
  category: existingCategory,
  properties: existingProperties
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [category, setCategory] = useState(existingCategory || "");
  const [productProperties, setProductProperties] = useState(existingProperties || {})
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [images, setImages] = useState(existingImage || []);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  async function saveProduct(e) {
    e.preventDefault();

    const data = { title, description, price, images, category, properties:productProperties };

    if (_id) {
      //update

      await axios.patch("/api/products", { ...data, _id });
    } else {
      //create

      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    return router.push("/products");
  }

  function updateImagesOrder(images) {
    setImages(images);
  }


  function setProductProp(propName, value) {
    setProductProperties(prev => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    })

  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }



  return (
    <form>
      <label> Product name</label>
      <input
        type="text"
        placeholder="Product Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>

      {propertiesToFill.length > 0 &&
        propertiesToFill.map((p) => (
          <div className="" key={p.name}>
            <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
            <div>
            <select value={productProperties[p.name]} onChange={(e) => setProductProp(p.name, e.target.value)}>
              {p.values.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
           </div>
          </div>
        ))}

      <label>Photos</label>
      <div className="mb- flex flex-wrap gap-2">
        <ReactSortable
          className="flex flex-wrap gap-1"
          list={images}
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((link) => (
              <div key={link} className="inline-block h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                <img src={link} alt="products" className="rounded-lg" />
              </div>
            ))}
        </ReactSortable>
        <UploadButton
        
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            let newArr = [];
            if (res) {
              res.map((resone) => {
                newArr.push(resone.fileUrl);
              });

              setImages((prev) => {
                return [...prev, ...newArr];
              });

              console.log(images);
            }
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label> Price (in USD)</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button className="btn-primary" onClick={saveProduct}>
        Save
      </button>
    </form>
  );
};

export default ProductForm;
