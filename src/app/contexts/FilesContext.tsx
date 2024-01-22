"use client"

import { ReactNode, createContext, useContext, useEffect, useState } from "react"

type FileContextProviderProps = {
    children: ReactNode
}

type File = {
    name: string;
    path: string;
    type: string;
    contentPath?: string;
}

type FileContext = {
    files: File[]
    // setFiles?: Dispatch<SetStateAction<File[] | []>>
    addFile: Function
}

const getInitialState = (): File[] | [] => {
    const files = localStorage.getItem("files");
    return files ? JSON.parse(files) : []
}

export const FileContext = createContext<FileContext | null>(null);

export default function FileContextProvider({ children }: FileContextProviderProps ) {
    const [files, setFiles] = useState<File[] | []>(getInitialState());

    useEffect(() => {
        localStorage.setItem("files", JSON.stringify(files));
    }, [files]);

    const addFile = (file: File) => {
        setFiles(_files => [..._files, file])
    }

    return (
        <FileContext.Provider
            value={{
                files,
                addFile
            }}
        >
            {children}
        </FileContext.Provider>
    );
}

export function useFileContext() {
    const context = useContext(FileContext);

    if (!context) {
        throw new Error("File context error");
    }
    return context;
}