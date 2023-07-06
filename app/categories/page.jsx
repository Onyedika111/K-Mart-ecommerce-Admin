"use client";

import Layout from "@/components/Layout";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

const Categories = () => {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState('');
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios
      .get("/api/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function saveCategory(e) {
    e.preventDefault();
      const data = {
          name,
          parentCategory,
          properties:properties.map(p => ({name:p.name, values:p.values.split(',')}))
      };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.patch("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }

      setName("");
      setParentCategory('')
      setProperties([])
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
      setParentCategory(category?.parent?._id);
      setProperties(category.properties.map(({name,values}) => ({name, values:values.join(',')})))
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((property, propertyIndex) => {
        return propertyIndex !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit ${editedCategory.name} Category`
          : "Create New Category"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value=''>No Parent Category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2"
          >
            Add new property
          </button>
        </div>
        {properties.length > 0 &&
          properties.map((property, index) => (
            <div key={index} className="flex gap-1 mb-2">
              <input
                type="text"
                placeholder="Property name (example: color)"
                value={property.name}
                className="mb-0"
                onChange={(e) =>
                  handlePropertyNameChange(index, property, e.target.value)
                }
              />
              <input
                type="text"
                className="mb-0"
                placeholder="Values, comma separated"
                value={property.values}
                onChange={(e) =>
                  handlePropertyValuesChange(index, property, e.target.value)
                }
              />
              <button
                onClick={() => removeProperty(index)}
                className="btn-default"
                type="button"
              >
                Remove
              </button>
            </div>
          ))}

        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName("");
                  setParentCategory('');
                  setProperties([])
              }}
              className="btn-default"
            >
              Cancel
            </button>
          )}

          <button type="submit" className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>

      {!editedCategory && (
        <table className="basic mt-2">
          <thead>
            <tr>
              <td>Category Name</td>
              <td>Parent Category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category.name}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <button
                      onClick={() => editCategory(category)}
                      className="btn-default mr-1"
                    >
                      Edit
                    </button>
                    <Link
                      className="btn-red"
                      href={"/categories/delete/" + category._id}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default Categories;
