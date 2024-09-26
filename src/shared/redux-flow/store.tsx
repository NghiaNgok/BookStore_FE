import { createStore, StoreEnhancer } from 'redux';
import rootReducer from './reducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistConfig } from 'redux-persist/lib/types';
export type RootState = ReturnType<typeof rootReducer>;

//persist dùng để lưu state khi refresh trang
//nếu ko có persist khi refresh trang sẽ làm mất các state trong store
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
};

const pReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers: StoreEnhancer = composeWithDevTools();

export const store = createStore(pReducer, composeEnhancers);
export const persistor = persistStore(store);
