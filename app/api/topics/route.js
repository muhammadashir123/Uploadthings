import connectMongoDB from "@/libs/mongoDb";
import Topic from "@/models/topic.model";

export async function GET() {
  try {
    await connectMongoDB();
    const topics = await Topic.find();
    return new Response(JSON.stringify({ topics }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.toString() }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
