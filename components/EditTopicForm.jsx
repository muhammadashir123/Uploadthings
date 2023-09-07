"use client";
import "@uploadthing/react/styles.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UploadButton } from "../src/utils/uploadthing";
import Image from "next/image";

export default function EditTopicForm({ id, title, description, image }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    newTitle: title,
    newDescription: description,
    newImage: image,
  });

  const handleUploadComplete = (res) => {
    setFormData({ ...formData, newImage: res[0].url });
  };

  const handleUploadError = (error) => {
    console.error("Upload error:", error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      `Submitting: title = ${formData.newTitle}, description = ${formData.newDescription}, image = ${formData.newImage}`
    );

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update");
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex justify-center w-full">
        <div className="border-slate-50 bg-blue-500 h-[140px] w-[140px] mb-6">
          {formData.newImage ? (
            <Image
              src={formData.newImage}
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
        onChange={(e) => setFormData({ ...formData, newTitle: e.target.value })}
        value={formData.newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />
      <input
        onChange={(e) =>
          setFormData({ ...formData, newDescription: e.target.value })
        }
        value={formData.newDescription}
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
