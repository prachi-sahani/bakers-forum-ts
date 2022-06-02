import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";

/**
 * This handler handles follow action.
 * send POST Request at /api/addBookmark/:questionId
 * */

export const addBookmarkQuestionHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  const { questionId } = request.params;
  const bookmarkQuestion = schema.questions.findBy({
    _id: questionId,
  }).attrs;
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const isBookmarked = bookmarkQuestion.bookmarked;
    if (isBookmarked) {
      return new Response(
        400,
        {},
        { errors: [`Question is already bookmarked`] }
      );
    }

    const updatedQuestion = {
      ...bookmarkQuestion,
      bookmarked: true,
    };
    this.db.questions.update(
      { _id: bookmarkQuestion._id },
      { ...updatedQuestion, updatedAt: formatDate() }
    );
    return new Response(200, {}, { question: updatedQuestion });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles follow action.
 * send POST Request at /api/removeBookmark/:questionId
 * */

export const removeBookmarkQuestionHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  const { questionId } = request.params;
  const bookmarkQuestion = schema.questions.findBy({
    _id: questionId,
  }).attrs;
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const isBookmarked = bookmarkQuestion.bookmarked;
    if (!isBookmarked) {
      return new Response(
        400,
        {},
        { errors: [`Question is already not bookmarked`] }
      );
    }

    const updatedQuestion = {
      ...bookmarkQuestion,
      bookmarked: false,
    };
    this.db.questions.update(
      { _id: bookmarkQuestion._id },
      { ...updatedQuestion, updatedAt: formatDate() }
    );
    return new Response(200, {}, { question: updatedQuestion });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
