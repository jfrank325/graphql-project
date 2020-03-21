import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Organization from '../src/components/Organization';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer  ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN} 
`,
  },
});

const TITLE = 'Github Searcher';

const getIssuesOfRepositoryQuery = (organization, repository) => `
{
  organization(login: "${organization}") {
    name
    url
    repository(name: "${repository}") {
      name
      url
      issues(last: 10) {
        edges {
          node {
            state
            id 
            title
            createdAt
            author {
              login
            }
            url
            comments (last: 10) {
              edges {
                node{
                  bodyText
                  id
                  createdAt
                }
              }
            }
          }
        }
      }
      pullRequests(last: 10) {
        edges {
          node {
            id
            title
            number
            mergeable
            url
          }
        }
      }
    }
  }
}`;

class App extends Component {
  state = {
    path: 'facebook / create-react-app',
    organization: null,
  };

  componentDidMount() {
    this.onFetchFromGitHub(this.state.path);
  }

  onChange = e => {
    this.setState({ path: e.target.value });
  };

  onSubmit = e => {
    this.onFetchFromGitHub(this.state.path);
    e.preventDefault();
  };

  onFetchFromGitHub = path => {
    const [organization, repository] = path.split(' / ');

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
        <h1>{TITLE}</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">Show open issues for https://github.com/</label>
          <input type="text" id="url" value={path} onChange={this.onChange} style={{ width: '300px' }} />
          <button type="submit">Search</button>
        </form>
        <hr />
        {organization ? <Organization organization={organization} /> : <p>No information yet ...</p>}
      </div>
    );
  }
}
export default App;
