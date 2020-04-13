import { fetchArticles } from "../types";
import { fetchArticlesFunc } from "../actions";

export default function articleReducer(state = null, action) {
  switch (action.type) {
    case fetchArticles:
      return action.payload;
    default:
      return state;
  }
}
