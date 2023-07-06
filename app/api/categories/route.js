import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/categories";
import { isAdminRequest, authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";




export const POST = async (req) => {
  const { name, parentCategory, properties } = await req.json();
  try {
    await mongooseConnect();
   
    const newCategory = new Category({
      name,
      parent: parentCategory || undefined,
      properties,
    });
    console.log(req)
    await newCategory.save();
    return new Response(JSON.stringify(newCategory), { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const GET = async (req) => {
  try {
    await mongooseConnect();

    const allcategories = await Category.find().populate("parent");
    return new Response(JSON.stringify(allcategories), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { name, parentCategory,properties,  _id } = await req.json();

  try {
    await mongooseConnect();

    const existingCategory = await Category.findById(_id);

    if (!existingCategory)
      return new Response("Category Not Found", { status: 404 });
    existingCategory.name = name;
    existingCategory.parent = parentCategory || undefined;
    existingCategory.properties = properties

    await existingCategory.save();

    return new Response("Successfully updated the Category", { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
