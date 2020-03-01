import React, {useState, Fragment} from 'react';
import {useHNApi} from '../hooks/useHNApi';

function APIHookTest() {
  const [query, setQuery] = useState('redux');
  const [
    {data, isLoading, isError},
    doFetch
  ] = useHNApi('http://hn.algolia.com/api/v1/search?query=redux', {hits: []});

  const [{localData, localIsLoading, localIsError}, localDoFetch] = useHNApi(
    '',
    {}
  );

  return (
    <Fragment>
      <form
        onSubmit={event => {
          doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);

          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <button
        onClick={() => {
          doFetch('http://localhost:8080/api/v1/author');
        }}
      >
        Fetch
      </button>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}
export default APIHookTest;
