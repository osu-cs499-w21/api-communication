import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Search({ query }) {
  const [ inputQuery, setInputQuery ] = useState(query || "");
  const history = useHistory();

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        history.push(`?q=${inputQuery}`);
      }}>
        <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <h2>Search query: {query}</h2>
    </div>
  );
}

export default Search;
