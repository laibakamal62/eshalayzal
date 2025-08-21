// app/api/admin/route.js
import { connectMade } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req) {
  try {
    await connectMade();
    const orders = await Order.find().sort({ createdAt: -1 }).lean();

    return new Response(JSON.stringify({ orders }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",  // ✅ allow all origins
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: `Failed to fetch orders: ${error.message}` }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
