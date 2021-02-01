import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fetch from 'isomorphic-unfetch';

function Search({ query }) {
  const [ inputQuery, setInputQuery ] = useState(query || "");
  const [ repos, setRepos ] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchSearchResults() {
      const res = await fetch(`https://api.github.com/search/repositories?q=${query}`);
      const responseBody = await res.json();
      setRepos(responseBody.items || []);
      console.log("== repos:", responseBody.items);
    }
    fetchSearchResults();
  }, [ query ]);

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
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>
            <a href={repo.html_url}>{repo.full_name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
