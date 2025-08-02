import dbConnect from "@/lib/db";
import User from "@/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function GET() {
  return Response.json({ message: "Auth route active" });
}

export async function POST(req) {
  await dbConnect();
  const { type, name, email, password } = await req.json();

  if (!type || !email || !password) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (type === "signup") {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return Response.json(
      { message: "Signup successful", token, user: newUser },
      { status: 201 }
    );
  }

  if (type === "login") {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return Response.json(
      { message: "Login successful", token, user },
      { status: 200 }
    );
  }

  return Response.json({ error: "Invalid request type" }, { status: 400 });
}
