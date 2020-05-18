import React, { useState } from 'react';

const IssueCard = (props) => {
  const [state, setState] = useState({
    info: false,
    text: '',
    comments: props.issue.node.comments.edges,
  });

  //toggle the dropdown of issue information
  const showInfo = () => {
    setState({ ...state, info: !state.info });
  };

  //retrieving user's search input
  const handleChange = (e) => {
    setState({ ...state, text: e.target.value.toLowerCase() });
  };

  //using user's input to filter the comments results
  const handleSubmit = (e) => {
    e.preventDefault();
    let filteredComments = state.comments.filter((comment) => comment.node.bodyText.toLowerCase().includes(state.text));
    setState({ ...state, comments: filteredComments });
  };

  const { issue } = props;

  return (
    <div className="issue-box">
      <button className="red" onClick={showInfo}>
        {issue.node.title}
      </button>
      {state.info ? (
        <div className="issue-card-box">
          <h3>Issue Author: {issue.node.author.login}</h3>
          <h3>Date of Issue: {issue.node.createdAt.slice(0, 10).split('-').reverse().join('/')}</h3>
          <h3>Comments</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="search"
              value={state.text}
              onChange={handleChange}
              placeholder="Search Comments"
            ></input>
            <button type="submit">Search</button>
          </form>
          <ul>
            {state.comments.length > 0 ? (
              state.comments.map((comment) => (
                <li key={comment.node.id}>
                  <h4>
                    Created on: {comment.node.createdAt.slice(0, 10).split('-').reverse().join('/')} at:{' '}
                    {comment.node.createdAt.slice(-9, -1)}
                  </h4>
                  - {comment.node.bodyText}
                </li>
              ))
            ) : (
              <p>There are no comments associated with this issue</p>
            )}
          </ul>
          <a href={issue.node.url}>
            <h3>Click here to go to Pull Request on GitHub</h3>
          </a>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

// class IssueCard extends Component {
//   state = {
// info: false,
// text: '',
// comments: this.props.issue.node.comments.edges,
//   };

export default IssueCard;
