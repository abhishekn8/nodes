import connectDB from "@/lib/mongodb";
import Nodes from "@/lib/model/nodes";
import { NextResponse, NextRequest } from "next/server";
import { sendResponse } from "@/lib/apiMethod";
import path from "path";
import { unlink, writeFile } from 'fs/promises';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const db = await connectDB();
    const formData = await req.formData();
    const file:any = formData.get("file");

    if (!file) {
      return sendResponse(400, {
        status: false,
        message: "No files received.",
      });
    }

    // Delete existing records
    const existingNodes = await Nodes.find();
    if (existingNodes.length > 0) {
      await Promise.all(existingNodes.map(async (node) => {
        await unlink(path.join(process.cwd(), node.file));
      }));
      await Nodes.deleteMany();
    }

    const buffer = await file.arrayBuffer();
    const filename = file.name.replaceAll(" ", "_");
    const filePath = path.join(process.cwd(), "public/assets/", filename);

    await writeFile(filePath, Buffer.from(buffer));  

    await Nodes.create({ file: `public/assets/${filename}` });

    return sendResponse(201, {
      status: true,
      message: "Expense fetched successfully",
      result: `/public/assets/${filename}`,
    });
  } catch (error) {
    console.log("error", error);
    return sendResponse(500, {
      status: false,
      message: "Internal Server Error",
    });
  }
}



export async function GET() {
  const db = await connectDB();

  try {
    const expenses = await Nodes.find();
    sendResponse(201, {
      status: true,
      message: "Expense fetched successfully",
      result: expenses,
    });
  } catch (error) {
    console.log("error", error);
  }
}
