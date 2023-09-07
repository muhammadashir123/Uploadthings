import connectMongoDB from "../../../libs/mongoDb";
import Topic from "../../../libs/models/topic";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}
// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectMongoDB();
//   await Topic.findByIdAndDelete(id);
//   return NextResponse.json({ message: "Topic Deleted" }, { status: 200 });
// }
// export async function UPDATE(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectMongoDB();
//   await Topic.findByIdAndUPDATE(id);
//   return NextResponse.json({ message: "Topic updated" }, { status: 200 });
// }
