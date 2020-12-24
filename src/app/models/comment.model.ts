export interface IComment {
    data: ICommentData[];
}

export interface ICommentData {
    id: number;
    post_id: number;
    name: string;
    email: string;
    body: string;
}