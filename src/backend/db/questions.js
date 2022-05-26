import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * Questions can be added here.
 * You can add default Questions of your wish with different attributes
 * */

export const questions = [
  {
    _id: uuid(),
    username: "prachisahani",
    questionTitle: "Hi everyone!!",
    questionText: "I'm really excited to be here.",
    votes: {
      upvotedBy: ["zuberdunge"],
      downvotedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        username: "itsHamhere",
        firstName: "Hamza",
        lastName: "Husein",
        commentText: "Welcome to the forum, Prachi!",
      },
      {
        _id: uuid(),
        username: "hinanshi04",
        firstName: "Hinanshi",
        lastName: "Suthar",
        commentText: "Hi!",
      },
    ],
    tags: [],
    answers: [
      {
        _id: uuid(),
        username: "sohamshah",
        answerText:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        comments: [
          {
            _id: uuid(),
            username: "shubhamsoni",
            commentText: "Thanks for the answer!",
          },
        ],
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    username: "zuberdunge",
    questionTitle: "Hey, hey, hey!!",
    questionText:
      "Hello I am new here. I like fruit breads. Banana bread is my favorite.",
    votes: {
      upvotedBy: ["jerry", "itsHamhere"],
      downvotedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        username: "jerryBoleMeow",
        firstName: "Jerry",
        lastName: "Dunge",
        commentText: "I love fruit breads too.",
      },
      {
        _id: uuid(),
        username: "prachisahani",
        firstName: "Prachi",
        lastName: "Sahani",
        commentText: "Welcome Zubar!",
      },
    ],
    tags: [],
    answers: [
      {
        _id: uuid(),
        username: "sohamshah",
        answerText:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        comments: [
          {
            _id: uuid(),
            username: "shubhamsoni",
            commentText: "Thanks for the answer!",
          },
        ],
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
