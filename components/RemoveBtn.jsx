"use client";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi";

export default function RemoveBtn({ id, topics, setTopics }) {
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      try {
        const response = await fetch(`api/topics/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const newTopics = topics.filter((topic) => topic._id !== id);
          setTopics(newTopics);
        }
      } catch (error) {
        console.error("Error while calling server function:", error);
      }
    }
  };
  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
