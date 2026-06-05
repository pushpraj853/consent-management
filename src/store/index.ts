import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userCredentialReducer } from "./slices/userCredentialSlice";
import { loaderDataReducer } from "./slices/loaderDataSlice";

const rootReducer = combineReducers({
  userCredential: userCredentialReducer,
  loaderData: loaderDataReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["loaderData"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
