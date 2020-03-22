import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Organization from '../src/components/Organization';
import { getIssuesOfRepositoryQuery } from '../src/queries/RepoQuery';

class App extends Component {
  state = {
    path: 'nuwave/lighthouse',
    token: '',
  };

  // componentDidMount() {
  //   this.onFetchFromGitHub(this.state.path);
  // }

  //retrieving users search information
  onChange = e => {
    this.setState({ path: e.target.value });
  };

  //retrieving github token from user
  tokenChange = e => {
    this.setState({
      token: e.target.value,
    });
  };

  //submitting user info
  onSubmit = e => {
    this.onFetchFromGitHub(this.state.path);
    e.preventDefault();
  };

  //submitted user info being used inside graphql query
  onFetchFromGitHub = path => {
    const [organization, repository] = path.split('/');
    const axiosGitHubGraphQL = axios.create({
      baseURL: 'https://api.github.com/graphql',
      headers: {
        Authorization: `bearer  ${this.state.token} 
        `,
      },
    });
    // process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    axiosGitHubGraphQL.post('', { query: getIssuesOfRepositoryQuery(organization, repository) }).then(response =>
      this.setState(() => ({
        organization: response.data.data.organization,
      }))
    );
  };

  render() {
    const { path, organization } = this.state;

    return (
      <div className="App">
        <h1 style={{ fontSize: '2.8rem' }}>GitHub Search</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="url"> Show open issues for https://github.com/</label>
          <input type="text" id="url" value={path} onChange={this.onChange} style={{ width: '300px' }} />
          <br></br>
          <label htmlFor="token">Auth Token: </label>
          <input type="text" id="token" value={this.state.token} onChange={this.tokenChange} placeholder="Auth Token" />
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
  }
}
export default App;
