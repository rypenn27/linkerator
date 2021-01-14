import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import { getLinks } from '../api';
import SearchResults from './SearchResults';

const App = () => {
  const [links, setLinks] = useState('');

  useEffect(() => {
    getLinks()
      .then(response => {
        console.log(response);
        setLinks([]);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  function handleClick() {
    fetch('/potato')
      .then(res => {
        console.log('the res', res);
        return res.json();
      })
      .then(data => console.log('the data', data))
      .catch(console.error);
  }

  return (
    <div className='App'>
      <h1>Search for links</h1>
      <Searchbar setResults={setLinks}></Searchbar>
      <SearchResults results={links} />
      <button onClick={handleClick}> Server Test</button>
    </div>
  );
};

export default App;
