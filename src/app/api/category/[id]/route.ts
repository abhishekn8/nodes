import connectDB from "@/lib/mongodb";
import Category from "@/lib/model/category";
import { NextRequest, NextResponse } from "next/server";

// Reuse the MongoDB connection

export async function PUT(
  req: NextRequest,
  res: NextResponse,
  { params }: any
) {
  const db = await connectDB();

  const { id } = params;
  const updateExpensesData = await req.json();

  const updates = Object.keys(updateExpensesData);

  const post = await Category.findOne({
    _id: id,
    author: updateExpensesData.author,
  });

  if (!post) {
    throw new Error(`post not found`);
  }

  updates.forEach((update) => (post[update] = updateExpensesData[update]));
  const updateExpenses = await post.save();

  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(
  req: NextRequest,
  res: NextResponse,
  { params }: any
) {
  const db = await connectDB();

  const { id } = params;

  const topic = await Category.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  res: NextResponse,
  { params }: any
) {
  const { id } = params;
  const db = await connectDB();

  await Category.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
