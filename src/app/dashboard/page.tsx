"use client";
import { getUserData } from "@/api/auth.api";
import { createNote, deleteNote, getNotes, updateNote } from "@/api/note.api";
import UpdateNote from "@/components/UpdateNote";
import { useStore } from "@/contexts/context";
import React, { useCallback, useEffect, useState } from "react";

const page = () => {
  const [selectNoteId, setSelectNoteId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCreateNote, setIsCreateNote] = useState(false);

  const [isRender, setIsRender] = useState(false);
  const { myDetails, setMyDetails, setNoteLists, noteLists } = useStore();

  const handelDelete = async (id: string): Promise<void> => {
    if (await deleteNote({ id })) {
      setIsRender((prv) => !prv);
      if (myDetails) {
        setNoteLists(await getNotes({ page: 1, user: myDetails.username }));
      }
    }
  };

  const submitForCreate = useCallback(
    async ({
      title,
      content,
    }: {
      title: string;
      content: string;
    }): Promise<void> => {
      if (
        await createNote({
          title: title,
          content: content,
        })
      ) {
        setIsCreateNote(false);
        if (myDetails) {
          setNoteLists(await getNotes({ page: 1, user: myDetails.username }));
        }
      }
    },
    [noteLists]
  );

  const submitForUpdate = useCallback(
    async ({
      id,
      title,
      content,
    }: {
      id: string;
      title: string;
      content: string;
    }) => {
      if (
        await updateNote({
          id: id,
          title: title,
          content: content,
        })
      ) {
        if (myDetails) {
          setNoteLists(await getNotes({ page: 1, user: myDetails.username }));
        }
        setIsRender((prv) => !prv);
      }
      setIsUpdate(false);
    },
    [noteLists]
  );

  useEffect(() => {
    const setUser = async () => {
      if (!myDetails) {
        setMyDetails(await getUserData());
      }
    };
    setUser();
    return () => {};
  }, []);
  useEffect(() => {
    const setNote = async () => {
      if (myDetails) {
        console.log(myDetails);
        setNoteLists(await getNotes({ page: 1, user: myDetails.username }));
      }
    };
    setNote();
    return () => {};
  }, [myDetails]);
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-green-600 to-blue-500">
      {isCreateNote && (
        <UpdateNote
          setFalse={setIsCreateNote}
          isUpdate={false}
          selectNoteId={""}
          updateNote={submitForUpdate}
          createNote={submitForCreate}
        />
      )}
      {isUpdate && (
        <UpdateNote
          setFalse={setIsUpdate}
          isUpdate={true}
          selectNoteId={selectNoteId}
          updateNote={submitForUpdate}
          createNote={submitForCreate}
        />
      )}
      <div className="w-96 h-14 relative flex items-center justify-center text-3xl mt-20 text-black">
        TODO Notes
      </div>
      <div className="mt-10">
        <span
          onClick={() => setIsCreateNote((prv) => !prv)}
          className="underline cursor-pointer"
        >
          Create Note
        </span>
      </div>
      <div className="flex flex-wrap p-5 justify-center items-center mt-7 gap-4">
        {noteLists.map((item, idx) => (
          <div
            key={idx}
            className="p-2 min-w-48 relative flex flex-col flex-wrap items-center rounded-lg bg-gradient-to-br from-green-600 to-blue-500 border border-white"
          >
            <div className="flex gap-8">
              <span
                onClick={() => handelDelete(item._id)}
                className="cursor-pointer top-3 left-3 underline text-red-600"
              >
                Delete
              </span>
              <h1 className="text-2xl">{item.title}</h1>
              <span
                onClick={() => {
                  setSelectNoteId(item._id);
                  setIsUpdate(true);
                }}
                className="cursor-pointer top-3 right-3 underline text-red-600"
              >
                Edit
              </span>
            </div>
            <p className="flex flex-wrap">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
