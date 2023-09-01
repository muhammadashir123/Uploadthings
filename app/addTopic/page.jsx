"use client";
import "@uploadthing/react/styles.css";
import { UploadButton } from "../../src/utils/uploadthing";
import Image from "next/image";
// import { set } from "mongoose";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  console.log("title", title);
  const [description, setdescription] = useState("");
  console.log("description", description);
  const [image, setImageURL] = useState("");

  const handleUploadComplete = (res) => {
    console.log("completed", res);
    setImageURL(res[0].url);
  };

  const handleUploadError = (error) => {
    console.log("error$$$$$$$$$$$$", error);
    console.error("Upload error:", error);
  };

  console.log("imageURL:", image);
  console.log(`env --- ${process.env.UPLOADTHING_SECRET}`);
  const router = useRouter();

  const handleSubmit = async (e) => {
    console.log("####################", e);
    e.preventDefault();
    console.log(
      `Submitting: title = ${title}, description = ${description}, image = ${image}`
    );

    if (!title || !description || !image) {
      alert("title and description are required");
      // return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ title, description, image }),
      });
      if (res.ok) {
        console.log(res.ok);
        router.push("/");
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <div className="flex justify-center w-full">
        <div className=" border-slate-50 bg-blue-500 h-[140px] w-[140px] mb-6 ">
          {image ? (
            <Image
              src={image}
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
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />
      <input
        onChange={(e) => setdescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />
      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Topic
      </button>
    </form>
  );
}
