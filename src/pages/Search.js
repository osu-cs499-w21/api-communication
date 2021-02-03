import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fetch from 'isomorphic-unfetch';

import Spinner from '../components/Spinner';
import ErrorContainer from '../components/ErrorContainer';

function Search({ query }) {
  const [ inputQuery, setInputQuery ] = useState(query || "");
  const [ repos, setRepos ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isError, setIsError ] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    async function fetchSearchResults() {
      let responseBody = {};
      setIsLoading(true);
      setIsError(false);
      try {
        const res = await fetch(
          `https://api.github.com/search/repositories?q=${query}`,
          { signal: controller.signal }
        );
        responseBody = await res.json();
      } catch (e) {
        if (e instanceof DOMException) {
          console.log("HTTP request aborted");
        } else {
          setIsError(true);
          console.log(e);
        }
      }

      if (!ignore) {
        setRepos(responseBody.items || []);
        setIsLoading(false);
        console.log("== repos:", responseBody.items);
      }
    }
    if (query) {
      fetchSearchResults();
    }
    return () => {
      controller.abort();
      ignore = true;
    };
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
      {isError && <ErrorContainer>Error message!</ErrorContainer>}
      {isLoading ? (
        <Spinner />
      ) : (
        <ul>
          {repos.map(repo => (
            <li key={repo.id}>
              <a href={repo.html_url}>{repo.full_name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
