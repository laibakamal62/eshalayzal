import jwt from "jsonwebtoken";
import { connectMade } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    console.log("Starting /api/place-order");

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
    const userEmail = decoded.email; // Adjust based on your token structure

    // Parse request body
    console.log("Parsing request body...");
    const body = await req.json();
    console.log("Order body:", body);

    // Create order
    console.log("Creating order...");
    const order = new Order({
      ...body,
      userEmail,
      createdAt: new Date(),
    });
    await order.save();
    console.log("Order saved:", order);

    return Response.json({ message: "Order placed successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/place-order:", error);
    return Response.json({ message: `Failed to place order: ${error.message}` }, { status: 500 });
  }
}