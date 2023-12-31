import connectMongoDB from "@/libs/mongoDb";
import Topic from "@/models/topic.model";

export async function POST(request) {
  const { title, description, image } = await request.json();
  try {
    await connectMongoDB();
    const topic = await new Topic({ title, description, image });

    await topic.save();

    return new Response(JSON.stringify(topic), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ message: error.toString() }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
