import { useContext } from 'react';
import { StoreContext } from "../context/Store"
import { RootStore } from "../stores/Rootstore"

export const useStore = (): RootStore => useContext(StoreContext);