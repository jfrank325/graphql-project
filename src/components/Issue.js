import React from 'react';
import axios from 'axios';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer  ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN} 
`,
  },
});

const getIssue = id => `
  {
    node(id: "${id}") {
     ... on Issue {
      title
       comments(last: 100){
        edges{
          node{
            bodyText
          }
        }
      }
      }
    }
  }
`;

class Issue extends React.Component {
  state = {
    issue: '',
    title: '',
    comments: null,
    updated_at: '',
    state: '',
  };

  componentDidMount() {
    this.onFetchFromGitHub();
  }

  onFetchFromGitHub = () => {
    const id = this.props.match.params.id;
    axiosGitHubGraphQL.post('', { query: getIssue(id) }).then(response =>
      // console.log(response.data, 'this is what your getting')
      this.setState(() => ({
        title: response.data.data.node.title,
        updated_at: response.data.data.node.updatedAt,
        comments: response.data.data.node.comments,
        state: response.data.data.node.state,
      }))
    );
    console.log(this.state, 'this state looks like this');
  };

  render() {
    return (
      <div>
        <p>{this.state.title}</p>
        <p>{this.state.updated_at}</p>
        <p>{this.state.state}</p>
      </div>
    );
  }
}
export default Issue;
