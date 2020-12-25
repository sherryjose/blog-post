export interface IPost {
    data: IPostData[];
}

export interface IPostData {
    id: number;
    user_id: number;
    title: string;
    body: string;
}