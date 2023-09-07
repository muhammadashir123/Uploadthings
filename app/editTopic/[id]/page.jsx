import { useRouter } from "next/navigation";
// import EditTopicForm from "../../../components/EditTopicForm";

import React from "react";
const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("failed to fetch topic");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export default async function EditTopic({ params }) {
  const { id } = params;
  const { topic } = await getTopicById(id);
  const { title, description, image } = topic;

  console.log("id", id);
  return (
    // <EditTopicForm
    //   id={id}
    //   title={title}
    //   description={description}
    //   image={image}
    // />
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex justify-center w-full">
        <div className=" border-slate-50 bg-blue-500 h-[140px] w-[140px] mb-6 ">
          {newImage ? (
            <Image
              src={newImage}
              alt="Uploaded"
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          ) : (
            "ashir"
          )}
        </div>
      </div>
      <div className="">
        <UploadButton
          className="ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
          endpoint="imageUploader"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
        />
      </div>

      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />
      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />
      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
  );
}
