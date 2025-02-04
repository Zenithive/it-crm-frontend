import { createStore } from "redux";
import rootReducer from "./rootReducer"; // Import root reducer

// Create Redux Store
const store = createStore(rootReducer);

export default store;
