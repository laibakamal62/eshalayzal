import jwt from "jsonwebtoken";
import { connectMade } from "@/lib/mongodb";
import Order from "@/models/Order";
export async function GET(req) {
  try {
    console.log("Starting /api/orders");

    // Connect to MongoDB
    await connectMade();
    console.log("Connected to MongoDB via Mongoose");

    // Get and verify token
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    console.log("Token:", token);
    if (!token) {
      console.log("No token provided");
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    console.log("Verifying token...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    const userEmail = decoded.email;

    // Fetch orders
    console.log("Fetching orders for:", userEmail);
    const orders = await Order.find({ userEmail }).sort({ createdAt: -1 }).lean();
    console.log("Orders fetched:", orders.length);

    return Response.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/orders:", error);
    return Response.json({ message: `Failed to fetch orders: ${error.message}` }, { status: 500 });
  }
}
