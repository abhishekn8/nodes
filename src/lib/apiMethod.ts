import { NextResponse } from "next/server";

interface IResponseData {
  status: boolean;
  result?: any;
  message?: string;
}

export const sendResponse = (statusCode: number, data: IResponseData) => {
  return NextResponse.json(data, { status: statusCode });
};
