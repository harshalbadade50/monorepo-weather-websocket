import React from 'react';
import { store } from "./stores/Rootstore"
import { StoreContext } from "./context/Store"

import { MainComponent} from "./components/main/MainComponent"

import './App.css';

function App() {
  return (
    <div className="App">
      <StoreContext.Provider value={store}>
        <MainComponent />
      </StoreContext.Provider>
    </div>
  );
}

export default App;
