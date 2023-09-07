import connectMongoDB from "../../../../libs/mongoDb";
import Topic from "../../../../libs/models/topic";

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
