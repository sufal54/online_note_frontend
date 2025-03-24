"use client";
import { updateNote } from "@/api/note.api";
import React, { useState } from "react";

const UpdateNote = ({
  setFalse,
  isUpdate,
  createNote,
  selectNoteId,
}: {
  setFalse: (bool: boolean) => void;
  isUpdate: boolean;
  createNote: (val: { title: string; content: string }) => Promise<void>;
  updateNote: (val: {
    id: string;
    title: string;
    content: string;
  }) => Promise<void>;
  selectNoteId: string;
}) => {
  const [inputData, setInputData] = useState<{
    id: string;
    title: string;
    content: string;
  }>({
    id: selectNoteId || "",
    title: "",
    content: "",
  });
  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isUpdate) {
      await updateNote({
        id: selectNoteId,
        title: inputData.title,
        content: inputData.content,
      });
    } else {
      await createNote({ title: inputData.title, content: inputData.content });
    }
    setFalse(false);
  };
  return (
    <form
      onSubmit={handelSubmit}
      className="absolute text-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col p-3 border border-white rounded-lg gap-2 bg-gradient-to-br from-green-600 to-blue-500"
    >
      <span
        className="absolute right-2 top-1 cursor-pointer underline"
        onClick={() => setFalse(false)}
      >
        Cancle
      </span>
      <div className="flex flex-col gap-1">
        <label htmlFor="titel">Title</label>
        <input
          className="pl-3 outline-none w-72 h-10 rounded-xl"
          name="title"
          type="text"
          onChange={(e) =>
            setInputData((prv) => ({ ...prv, title: e.target.value }))
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="content">Content</label>
        <textarea
          className="pl-3 outline-none w-72 h-20 rounded-xl"
          name="content"
          onChange={(e) =>
            setInputData((prv) => ({ ...prv, content: e.target.value }))
          }
        />
      </div>
      <div className="mt-4 flex items-center justify-center">
        <button type="submit" className="w-20 h-10 bg-red-500 rounded-lg">
          Submit
        </button>
      </div>
    </form>
  );
};

export default React.memo(UpdateNote);
