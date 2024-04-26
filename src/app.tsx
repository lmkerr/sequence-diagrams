import logo from './assets/logo.png';
import { Search } from './search/search.component';

import './app.css';
import { useState } from 'react';


const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
      <div>
        <a href="https://lorenkerr.com" target="_blank">
          <img src={logo} className="logo" alt="VIZIO logo" />
        </a>
      </div>
      <div className="d-flex flex-row justify-content-center">
        <Search onSubmit={handleSearch}></Search>
      </div>
    </>
  )
}

export { App }