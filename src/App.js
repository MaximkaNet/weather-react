import { createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './Components/AppRouter';
import Topbar from './Components/Topbar/Topbar';

export const Context = createContext(null);

function App() {
  const [search, setSearch] = useState('Find city ...');
  const [found, setFound] = useState({});
  return (
    <>
      <Context.Provider value={{
        search: {
          searchValue: search,
          setSearchValue: setSearch,
          found,
          setFound
        }
      }}>
        <BrowserRouter>
          <Topbar />
          <AppRouter />
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
