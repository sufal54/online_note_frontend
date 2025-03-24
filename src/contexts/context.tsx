"use client";
import {
  ContextType,
  NoteListsDataType,
  UserDataType,
} from "@/app/interfaces/interface";
import React, { createContext, useContext, useState } from "react";

const context = createContext<ContextType | undefined>(undefined);

const ContextProvider: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const [myDetails, setMyDetails] = useState<UserDataType | null>(null);
  const [noteLists, setNoteLists] = useState<NoteListsDataType[] | []>([]);
  return (
    <context.Provider
      value={{ myDetails, setMyDetails, noteLists, setNoteLists }}
    >
      {children}
    </context.Provider>
  );
};

export const useStore = () => {
  const useStoreContext = useContext(context);
  if (!useStoreContext) {
    throw new Error("context error");
  }
  return useStoreContext;
};

export default ContextProvider;
