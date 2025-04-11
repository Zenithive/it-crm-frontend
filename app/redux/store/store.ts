import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import filterReducer from "../slice/filterSlice"; // Import the filter reducer
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage

export type RootState = ReturnType<typeof store.getState>;

const persistConfig = {
  key: "auth",
  storage, // Saves state in localStorage
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignores non-serializable actions from redux-persist
        ignoredPaths: ["register"], // (Optional) Ignore paths if needed
      },
    }),
});

export const persistor = persistStore(store);
