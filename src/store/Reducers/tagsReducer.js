import { fetchTags } from "../types";

export default function tagsReducer(state = null, action) {
  switch (action.type) {
    case fetchTags:
      return action.payload;
    default:
      return state;
  }
}
