import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userCredentialReducer, loaderDataReducer } from "./slices";

const userCredentialPersistConfig = {
  key: "userCredential",
  storage,
};

const persistedUserCredentialReducer = persistReducer(
  userCredentialPersistConfig,
  userCredentialReducer,
);

const rootReducer = combineReducers({
  userCredential: persistedUserCredentialReducer,
  loaderData: loaderDataReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
