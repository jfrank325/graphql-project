import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Organization from '../src/components/Organization';
import { getIssuesOfRepositoryQuery } from '../src/queries/RepoQuery';

const App = () => {
  const [state, setState] = useState({
    path: 'nuwave/lighthouse',
    token: '',
  });

  useEffect(() => {
    onFetchFromGitHub(state.path);
  }, []);

  //retrieving users search information
  const onChange = e => {
    setState({ ...state, path: e.target.value });
  };

  //retrieving github token from user
  const tokenChange = e => {
    setState({ ...state, token: e.target.value });
  };

  //submitting user info
  const onSubmit = e => {
    onFetchFromGitHub(state.path);
    e.preventDefault();
  };

  //submitted user info being used inside graphql query
  const onFetchFromGitHub = path => {
    const [organization, repository] = path.split('/');
    const axiosGitHubGraphQL = axios.create({
      baseURL: 'https://api.github.com/graphql',
      headers: {
        Authorization: `bearer  ${state.token ? state.token : process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN} 
        `,
      },
    });
    // process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    axiosGitHubGraphQL
      .post('', { query: getIssuesOfRepositoryQuery(organization, repository) })
      .then(response => setState(() => ({ ...state, organization: response.data.data.organization })));
  };

  const { path, organization } = state;

  return (
    <div className="App">
      <h1 style={{ fontSize: '2.8rem' }}>GitHub Search</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="url"> Show open issues for https://github.com/</label>
        <input type="text" id="url" value={path} onChange={onChange} style={{ width: '300px' }} />
        <br></br>
        <label htmlFor="token">Auth Token: </label>
        <input type="text" id="token" value={state.token} onChange={tokenChange} placeholder="Auth Token" />
        <button type="submit">Search</button>
      </form>
      <hr />
      {organization ? (
        <Organization organization={organization} />
      ) : (
        <p>Please make sure your auth token and repo query are accurate</p>
      )}
    </div>
  );
};

export default App;
