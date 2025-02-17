import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './Api/baseApi'
import authSlice from './Features/Auth/AuthSlice'
import productSlice from './Features/Product/ProductSlice'
import storage from 'redux-persist/lib/storage'
import {
    persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const AuthPersistConfig = {
    key: 'CycleAuth',
    storage,
};
const ProductPersistConfig = {
    key: 'CycleProduct',
    storage,
};

const persistedAuthReducer = persistReducer(AuthPersistConfig, authSlice);
const persistedProductReducer = persistReducer(ProductPersistConfig, productSlice);

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedAuthReducer,
        product: persistedProductReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(baseApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);