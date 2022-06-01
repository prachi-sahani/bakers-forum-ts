import { Comment } from "./Comment";
import { Vote } from "./Vote";

export interface Question {
  _id: string;
  questionTitle: string;
  questionText: string;
  username: string;
  id: string;
  comments: Comment[];
  votes: Vote;
  tags: string[];
  bookmarked:boolean;
  updatedAt: Date;
  createdAt: Date;
}
