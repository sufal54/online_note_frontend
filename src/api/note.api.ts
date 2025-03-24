import { ApiResponse, NoteListsDataType } from "@/app/interfaces/interface";

const baseUrl: string = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const createNote = async ({ title, content }: { title: string; content: string }): Promise<boolean> => {
    console.log(title, " ", content);
    console.log(JSON.stringify({ title, content }));
    const fetchData: ApiResponse = await fetch(`${baseUrl}/api/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ title, content })
    }).then((data) => data.json());
    return fetchData.success;
}

export const getNotes = async ({ page, user }: { page: number, user: string }): Promise<NoteListsDataType[] | []> => {
    try {
        const fetchData: ApiResponse = await fetch(`${baseUrl}/api/notes?page=${page}&user=${user}`).then((data) => data.json());

        if (fetchData.success) {
            return fetchData.data;
        }
        return [];
    } catch (e) {
        return [];
    }
}

export const updateNote = async ({ id, title, content }: { id: string; title: string; content: string }): Promise<boolean> => {
    const fetchData: ApiResponse = await fetch(`${baseUrl}/api/notes/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, content })
    }).then((data) => data.json());

    return fetchData.success;
}

export const deleteNote = async ({ id }: { id: string }): Promise<boolean> => {
    const fetchData: ApiResponse = await fetch(`${baseUrl}/api/notes/${id}`, {
        method: "DELETE",
        credentials: "include"
    }).then((data) => data.json());

    return fetchData.success;
}