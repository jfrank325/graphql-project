import React, { Component } from 'react';
import axios from 'axios';
import Organization from '../src/components/Organization';
import { Route } from 'react-router-dom';
import Issue from '../src/components/Issue';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer  ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN} 
`,
  },
});

const TITLE = 'Github Searcher';

// const GET_ORGANIZATION = `
// {
//   organization(login: "the-road-to-learn-react") {
//     name url
//   }
// }`;

const getIssuesOfRepositoryQuery = (organization, repository) => `
{
  organization(login: "${organization}") {
    name
    url
    repository(name: "${repository}") {
      name
      url
      issues(last: 30) {
        edges {
          node {
            state
            id 
            title
            url
            comments (last: 30) {
              edges {
                node{
                  bodyText
                  id
                  updatedAt
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

const resolveIssuesQuery = queryResult => () => ({
  organization: queryResult.data.data.organization,
  errors: queryResult.data.errors,
});

class App extends Component {
  state = {
    path: 'facebook/create-react-app',
    organization: null,
    errors: null,
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
    const [organization, repository] = path.split('/');

    axiosGitHubGraphQL.post('', { query: getIssuesOfRepositoryQuery(organization, repository) }).then(response =>
      this.setState(() => ({
        organization: response.data.data.organization,
        error: response.data.errors,
      }))
    );
  };

  render() {
    const { path, organization, errors } = this.state;

    return (
      <div>
        <h1>{TITLE}</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">Show open issues for https://github.com/</label>
          <input type="text" id="url" value={path} onChange={this.onChange} style={{ width: '300px' }} />
          <button type="submit">Search</button>
        </form>
        <hr />
        {organization ? <Organization organization={organization} /> : <p>No information yet ...</p>}
        <Route path="/issue/:id" component={Issue} />
      </div>
    );
  }
}
export default App;
