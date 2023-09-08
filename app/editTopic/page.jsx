"use client";

import "@uploadthing/react/styles.css";
import { useRouter, useSearchParams } from "next/navigation";
import { UploadButton } from "@/src/utils/uploadthing";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function EditTopic() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramId = searchParams.get("id");
  console.log(paramId);
  const [data, setData] = useState({
    title: "",
    description: "",
    imageName: "",
    imageUrl: "",
  });

  useEffect(() => {
    const getTopic = async () => {
      try {
        const res = await fetch(`api/topics/${paramId}`, {
          cache: "no-store",
        });
        const apiData = await res.json();
        setData({
          title: apiData.title,
          description: apiData.description,
          imageName: apiData.image.imageName,
          imageUrl: apiData.image.imageUrl,
        });
        console.log(data?.imageUrl);
      } catch (error) {
        console.log(error);
      }
    };

    getTopic();
  }, []);

  const handleUploadComplete = (res) => {
    console.log("completed", res);
    setData((prev) => ({
      ...prev,
      imageName: res[0].fileKey,
      imageUrl: res[0].url,
    }));
  };
  const handleUploadError = (error) => {
    console.log("error$$$$$$$$$$$$", error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`api/topics/${paramId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          image: { imageUrl: data.imageUrl, imageName: data.imageName },
        }),
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
        <div className=" border-slate-50 bg-blue-500 h-[140px] w-[140px] mb-6 ">
          {data?.imageUrl && (
            <Image
              src={data.imageUrl}
              alt="Uploaded"
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
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
      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
  );
}
