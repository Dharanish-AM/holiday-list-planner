import dbConnect from "@/lib/db";
import User from "@/models/Users";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnect();
    
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.substring(7); 

    if (!process.env.JWT_SECRET) {
      return Response.json({ error: "JWT secret not configured" }, { status: 500 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 401 });
    }

    return Response.json({ 
      message: "Token valid", 
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Token verification error:", error);
    
    if (error.name === "JsonWebTokenError") {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }
    
    if (error.name === "TokenExpiredError") {
      return Response.json({ error: "Token expired" }, { status: 401 });
    }

    return Response.json({ error: "Token verification failed" }, { status: 500 });
  }
} 