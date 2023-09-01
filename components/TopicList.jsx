import React from "react";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Image from "next/image";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    // Add code here to handle the response, e.g., return or process the data
    const data = await res.json();
    return data;
  } catch (error) {
    // Handle the error, e.g., logging or re-throwing
    console.error(error);
    console.log("Error loading Topics:", error);
    throw error; // Re-throwing the error to propagate it further if needed
  }
};

export default async function TopicList() {
  const { topics } = await getTopics();

  return (
    <>
      {topics.map((item) => (
        <div className="p-4 border border-slate-300 my-3 flex justify-between items-start gap-5">
          <div className="">
            <div className=" border-slate-50 bg-blue-500 h-[140px] w-[140px] mb-6 ">
              <Image
                src={item.image}
                alt="Uploaded"
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            </div>
            <h6 className="font-bold text-2xl">{item.title}</h6>
            <div>{item.description}</div>
          </div>
          <div className="flex gap-1">
            <RemoveBtn id={item._id} />
            <Link href={`/editTopic/${item._id}`}>
              <HiPencilAlt size={24}></HiPencilAlt>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
