"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Image from "next/image";

export default function TopicList() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const getTopics = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/topics");
        
        const data = await res.json();
        setTopics(data.topics);

      } catch (error) {
        console.log("Error loading Topics:", error);
      }
    };

    getTopics();
  }, []);
//   console.log(topics)
  
  return (
    <>
      {topics && topics.map((item) => (
        <div className="p-4 border border-slate-300 my-3 flex justify-between items-start gap-5" key={item._id}>
          <div className="">
            <div className=" border-slate-50 bg-blue-500 h-[140px] w-[140px] mb-6 ">
              <Image
                src={item.image.imageUrl}
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
            <RemoveBtn id={item._id} topics={topics} setTopics={setTopics} />
            <Link href={`/editTopic/${item._id}`}>
              <HiPencilAlt size={24}></HiPencilAlt>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}