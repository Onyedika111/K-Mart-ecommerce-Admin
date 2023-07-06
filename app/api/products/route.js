import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export const POST = async (req) => {
  const { title, description, price, images, category,properties } = await req.json();
  try {
    await mongooseConnect();
    const productDoc = new Product({
      title,
      description,
      price,
      images,
      category,
      properties
    });
    await productDoc.save();
    return new Response(JSON.stringify(productDoc), { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const GET = async (req) => {
  try {
    await mongooseConnect();
    const productDoc = await Product.find();
    return new Response(JSON.stringify(productDoc), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { title, description, category, price, images, properties, _id } =
    await request.json();

  try {
    await mongooseConnect();

    const existingProduct = await Product.findById(_id);

    if (!existingProduct)
      return new Response("Product Not Found", { status: 404 });
    existingProduct.title = title;
    existingProduct.description = description;
    existingProduct.images = images;
    existingProduct.price = price;
    existingProduct.category = category;
    existingProduct.properties = properties;

    await existingProduct.save();

    return new Response("Successfully updated the Products", { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

// export const DELETE = async (request, { params }) => {
//   try {
//       await connectToDB();

//       // Find the prompt by ID and remove it
//       await Prompt.findByIdAndRemove(params.id);

//       return new Response("Prompt deleted successfully", { status: 200 });
//   } catch (error) {
//       return new Response("Error deleting prompt", { status: 500 });
//   }
// };

// export const GET = async (request) => {
//   try {
//       await connectToDB()

//       const prompts = await Prompt.find({}).populate('creator')

//       return new Response(JSON.stringify(prompts), { status: 200 })
//   } catch (error) {
//       return new Response("Failed to fetch all prompts", { status: 500 })
//   }
// }
