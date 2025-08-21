import Order from "@/models/Order";
import { connectMade } from "@/lib/mongodb";

export async function DELETE(req) {
  try {
    // Enable CORS
    const headers = {
      "Access-Control-Allow-Origin": "*", // allow all origins (or put your admin panel URL)
      "Access-Control-Allow-Methods": "DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return new Response("Order ID is required", { status: 400, headers });

    await connectMade();
    await Order.findByIdAndDelete(id);

    return new Response(JSON.stringify({ message: "Order deleted" }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
