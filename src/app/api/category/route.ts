import connectDB from "@/lib/mongodb";
import Category from "@/lib/model/category";
import { NextResponse, NextRequest } from "next/server";
import { sendResponse, verifyTokenAndRole } from "@/lib/apiMethod";

export async function POST(req: NextRequest, res: NextResponse) {
  const db = await connectDB();
  try {
    const isVerifiedUser = verifyTokenAndRole();
    if (isVerifiedUser) {
      const { title, content, category, price } = await req.json();
      const expense = await Category.create({
        title,
        content,
        category,
        price,
        user: isVerifiedUser.userId,
      });
      sendResponse(201, {
        status: true,
        message: "Category added successfully",
        result: expense,
      });
    }
  } catch (error) {}
}

export async function GET() {
  const db = await connectDB();

  const expenses = await Category.find();
  sendResponse(201, {
    status: true,
    message: "Expense fetched successfully",
    result: expenses,
  });
}
