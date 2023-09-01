import connectMongoDB from "../../../libs/mongoDb";
import Topic from "../../models/topic";
import { NextResponse } from "next/server";
export async function POST(request) {
  const { title, description, image } = await request.json();
  try {
    await connectMongoDB();
    const topic = await new Topic({ title, description, image });

    await topic.save();
    console.log(topic, "topic Created");
    return new Response(JSON.stringify(topic), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(error);
  }
}
export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic Deleted" }, { status: 200 });
}
export async function UPDATE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndUPDATE(id);
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}
