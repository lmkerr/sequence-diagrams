// App.tsx
import { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './assets/logo.png';
import { Search } from './search/search.component';
import { routes } from './app.routes';

import './app.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <div>
        <a href="https://lorenkerr.com" target="_blank">
          <img src={logo} className="logo" alt="VIZIO logo" />
        </a>
      </div>
      <div className="d-flex flex-row justify-content-center">
        <Search onSubmit={handleSearch}></Search>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
}

export { App }
