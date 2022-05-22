export interface Discussion{
    id: number;
    title: string;
    description: string;
    postedBy: string;
    votes: number;
    tags: string[];
    time: number;
}