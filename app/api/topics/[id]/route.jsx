import connectMongoDB from "../../../../libs/mongoDb";
import Topic from "../../../../models/topic.model";
import { utapi } from "uploadthing/server";

// getting a single topic
export async function GET(request, { params }) {
  try {
    const { id } = params;
    console.log(id);
    await connectMongoDB();
    const topic = await Topic.findById(id);
    return new Response(JSON.stringify(topic), { status: 200 });
  } catch (error) {
    return new Response({ message: error });
  }
}

// updating a topic
export async function PUT(request, { params }) {
  const { id } = params;
  const { title, description, image } = await request.json();
  try {
    await connectMongoDB();
    const topicI = await Topic.findById(id);
    // console.log(topic.image)
    await utapi.deleteFiles(topicI.image.imageName);
    const topic = await Topic.findByIdAndUpdate(id, {
      title,
      description,
      image,
    });
    return new Response(JSON.stringify(topic), { status: 200 });
  } catch (error) {
    return new Response({ message: "error" });
  }
}

// deleting a topic

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await connectMongoDB();
    const topic = await Topic.findById(id);
    // console.log(topic.image)
    await utapi.deleteFiles(topic.image.imageName);

    // console.log(res);
    await Topic.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: "delet" }), { status: 200 });
  } catch (error) {
    return new Response({ message: "error" });
  }
}
