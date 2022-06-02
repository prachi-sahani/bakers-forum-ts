import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * Questions can be added here.
 * You can add default Questions of your wish with different attributes
 * */

export const questions = [
  {
    _id: uuid(),
    username: "jerryBoleMeow",
    questionTitle: "Cupcakes For Wedding",
    questionText:
      "Hi everyone. I’m making a cupcake tower for my daughters wedding this fall. I’m thinking of baking them early abs freezing them. I was planning to take them out of the freezer and let them defrost in the fridge on the Thursday evening before the wedding. That will give me Friday to decorate them and drop them off Friday evening. I’m not sure the venue will have enough storage capacity to keep them in the fridge from Friday until Saturday and debating between Using Swiss meringue buttercream or American buttercream. Any suggestions for tips would be greatly appreciated.",
    votes: {
      upvotedBy: [
        "zuberdunge",
        "jaanuBoleBhow",
        "hinanshi04",
        "itsHamehere",
        "prachisahani",
      ],
      downvotedBy: [],
    },
    comments: [],
    tags: [],
    bookmarked: false,
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
    username: "hinanshi04",
    questionTitle:
      "New to the forum, saying hello to everyone (waving and smile)",
    questionText:
      "Hello, to all of you ! I like to bake, but grew up in a home with no stove, so I didn't learn from my mom like most of us do. I can manage some simple things, like a cake mix cake, or cookies, but definitely not a skilled cook. I am looking forward to learning, and trying some fairly simple recipe and expanding my skills.",
    votes: {
      upvotedBy: ["jerryBoleMeow", "prachisahani"],
      downvotedBy: ["sampleuser"],
    },
    comments: [
      {
        _id: uuid(),
        username: "itsHamhere",
        firstName: "Hamza",
        lastName: "Husein",
        commentText: "Great to have you here! :)",
      },
      {
        _id: uuid(),
        username: "jerryBoleMeow",
        firstName: "Jerry",
        lastName: "Dunge",
        commentText: "Hey there welcome aboard Himu! :)",
      },
    ],
    tags: ["Bakers", "Baking"],
    bookmarked: false,
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
    tags: ["Baking"],
    bookmarked: false,
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
    tags: ["Breads", "Baking"],
    bookmarked: false,
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
