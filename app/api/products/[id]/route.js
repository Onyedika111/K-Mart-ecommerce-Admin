import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export const GET = async (req, {params}) => {
    try {
      await mongooseConnect();
        const productDoc = await Product.findById(params.id);
        if (!productDoc) return new Response("Product Not Found", { status: 404 });
      return new Response(JSON.stringify(productDoc), { status: 200 });
    } catch (error) {
      return new Response(error.message, { status: 500 });
    }
};
  
export const DELETE = async (request, { params }) => {
    try {
        await mongooseConnect();
  
        // Find the prompt by ID and remove it
        await Product.findByIdAndRemove(params.id);
  
        return new Response("Product deleted successfully", { status: 200 });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
  };


// export const GET = async (request, { params }) => {
//     try {
//         await connectToDB()

//         const prompt = await Prompt.findById(params.id).populate("creator")
//         if (!prompt) return new Response("Prompt Not Found", { status: 404 });

//         return new Response(JSON.stringify(prompt), { status: 200 })

//     } catch (error) {
//         return new Response("Internal Server Error", { status: 500 });
//     }
// }


// export const PATCH = async (request, { params }) => {
//     const { prompt, tag } = await request.json();

//     try {
//         await connectToDB();

//         // Find the existing prompt by ID
//         const existingPrompt = await Prompt.findById(params.id);

//         if (!existingPrompt) {
//             return new Response("Prompt not found", { status: 404 });
//         }

//         // Update the prompt with new data
//         existingPrompt.prompt = prompt;
//         existingPrompt.tag = tag;

//         await existingPrompt.save();

//         return new Response("Successfully updated the Prompts", { status: 200 });
//     } catch (error) {
//         return new Response("Error Updating Prompt", { status: 500 });
//     }
// };
