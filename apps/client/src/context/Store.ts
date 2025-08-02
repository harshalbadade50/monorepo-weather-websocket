import { createContext } from 'react';
import { RootStore } from "../stores/Rootstore"

export const StoreContext = createContext<RootStore>({} as RootStore);
export const StoreProvider = StoreContext.Provider;
