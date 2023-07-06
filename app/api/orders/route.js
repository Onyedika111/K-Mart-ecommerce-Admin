import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export const GET = async (req) => {
    try {
      await mongooseConnect();
      const ordersDoc = await Order.find().sort({createdAt: -1});
      return new Response(JSON.stringify(ordersDoc), { status: 200 });
    } catch (error) {
      return new Response(error.message, { status: 500 });
    }
  };