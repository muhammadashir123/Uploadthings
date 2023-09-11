"use client";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@/src/utils/uploadthing";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useState, useEffect } from "react";

export default function AddTopic() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    title: "",
    description: "",
    imageName: "",
    imageUrl: "",
  });

  const handleUploadComplete = (res) => {
    console.log("completed", res);
    setData((prev) => ({
      ...prev,
      imageName: res[0].fileKey,
      imageUrl: res[0].url,
    }));
  };

  const handleUploadError = (error) => {
    console.error("Upload error:", error);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
   

    if (!data.title || !data.description || !data.imageUrl) {
      setMessage("Title and description are required  ");
      return;
    }
    try {
      const res = await fetch("/api/topics/new", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          image: { imageUrl: data.imageUrl, imageName: data.imageName },
        }),
      });
      if (res.ok) {
        console.log(res.ok);
        router.push("/");
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
      setMessage("An error occurred while adding the topic");
    }
  };
  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage("Record is up"); // Clear the message after 5 seconds (adjust the time as needed)
      }, 5000); // 5000 milliseconds = 5 seconds

      // Clear the timeout when the component unmounts or when a new message is set
      return () => clearTimeout(timeoutId);
    }
  }, [message]);
  return (
    <div>
      {/* Pop-up message */}
      {message && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <div className="flex justify-center w-full">
          <div className=" border-slate-50 bg-blue-500 h-[140px] w-[140px] mb-6 ">
            {data.imageUrl ? (
              <Image
                src={data.imageUrl}
                alt="Uploaded"
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            ) : (
              ""
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
          onChange={(e) => {
            setData((prev) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
          value={data.title}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Topic Title"
        />
        <input
          onChange={(e) => {
            setData((prev) => ({
              ...prev,
              description: e.target.value,
            }));
          }}
          value={data.description}
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
    </div>
  );
}
