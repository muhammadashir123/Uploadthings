import connectMongoDB from "@/libs/mongoDb";
import Topic from "@/models/topic.model";
import { utapi } from "uploadthing/server";

// getting a single topic
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const topic = await Topic.findById(id);
    return new Response(JSON.stringify(topic), {
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

// updating a topic
export async function PUT(request, { params }) {
  const { id } = params;
  const { title, description, image } = await request.json();
  try {
    await connectMongoDB();
    const topicI = await Topic.findById(id);

    // deleting the image from uploadthing
    if(image){
      await utapi.deleteFiles(topicI.image.imageName);
    }

    // updating the topic in db
    const topic = await Topic.findByIdAndUpdate(id, {
      title,
      description,
      image,
    });
    return new Response(JSON.stringify(topic), {
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

// deleting a topic

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await connectMongoDB();
    const topic = await Topic.findById(id);
    // deleting the image from uploadthing
    await utapi.deleteFiles(topic.image.imageName);

    // deleting the topic from db
    await Topic.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: "deleted" }), {
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
