import { Category } from "@/models/categories";
import { mongooseConnect } from "@/lib/mongoose";

export const DELETE = async (request, { params }) => {
    try {
        await mongooseConnect();
  
        // Find the prompt by ID and remove it
        await Category.findByIdAndRemove(params.id);
  
        return new Response("Category deleted successfully", { status: 200 });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};
  

export const GET = async (req, {params}) => {
    try {
      await mongooseConnect();
        const categoryDoc = await Category.findById(params.id);
        if (!categoryDoc) return new Response("Category Not Found", { status: 404 });
      return new Response(JSON.stringify(categoryDoc), { status: 200 });
    } catch (error) {
      return new Response(error.message, { status: 500 });
    }
};
