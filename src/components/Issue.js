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
            createdAt
            id
          }
        }
      }
      }
    }
  }
`;

class Issue extends React.Component {
  state = {
    title: '',
    comments: [],
  };

  componentDidUpdate() {
    this.onFetchFromGitHub();
  }

  onFetchFromGitHub = () => {
    const id = this.props.match.params.id;
    axiosGitHubGraphQL.post('', { query: getIssue(id) }).then(response =>
      // console.log(response.data, 'this is what your getting')
      this.setState(() => ({
        title: response.data.data.node.title,
        comments: response.data.data.node.comments.edges,
      }))
    );
    console.log(this.state, 'this state looks like this');
  };

  render() {
    const state = this.state;
    console.log(state, 'this is the state being rendered');
    console.log(this.state.comments, 'comments');
    return (
      <div className="issue-box">
        <h1>Issue: {state.title}</h1>
        <h3>Comments</h3>
        <ul>
          {state.comments.length > 0 ? (
            state.comments.map(comment => <li key={comment.node.id}>{comment.node.bodyText}</li>)
          ) : (
            <p>There are no comments associated with this issue</p>
          )}
        </ul>
      </div>
    );
  }
}
export default Issue;
