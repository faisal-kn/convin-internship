import { createStore } from "redux";

const counterReducer = (
  state = { data: { data: { data: [] } }, length: 0 },
  action
) => {
  if (action.type === "dataLoaded") {
    return {
      data: action.payload,
      length: action.payload.data.data.length,
    };
  }
  
  return state;
};

const store = createStore(counterReducer);

export default store;
