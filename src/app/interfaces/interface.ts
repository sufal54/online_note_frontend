export interface LoginDataType {
    username: string;
    email: string;
    password: string;
}
export interface UserDataType {
    _id: string;
    username: string;
    email: string;

}

export interface NoteListsDataType {
    _id: string;
    title: string;
    content: string;
    createdBy: {
        username: string;
        email: string;
    };
    created_At: Date;
}

export interface ContextType {
    myDetails: UserDataType | null;
    setMyDetails: (val: UserDataType | null) => void;
    noteLists: NoteListsDataType[] | [];
    setNoteLists: (val: NoteListsDataType[] | []) => void;
}

export interface ApiResponse {
    success: boolean,
    message: string;
    data?: any;
}