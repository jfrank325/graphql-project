// import React, { Component } from 'react';

// class PullRequestCard extends Component {
//   state = {
//     info: false,
//     text: '',
//     comments: this.props.pullRequest.node.comments.edges,
//   };

//toggle the dropdown of pull request information
// showInfo = () => {
//   this.setState({
//     info: !this.state.info,
//   });
// };

// //retrieving user's search input
// handleChange = e => {
//   this.setState({
//     text: e.target.value.toLowerCase(),
//   });
// };

//using user's input to filter the comments results
//   handleSubmit = e => {
//     e.preventDefault();
//     console.log('this is the result of the comments search', e.target.value);
//     let filteredComments = this.state.comments.filter(comment =>
//       comment.node.bodyText.toLowerCase().includes(this.state.text)
//     );
//     this.setState({
//       comments: filteredComments,
//     });
//   };

//   render() {
//     const { pullRequest } = this.props;
//     return (
//       <div className="pull-request-box">
//         <button className="pull-request-button" onClick={this.showInfo}>
//           {pullRequest.node.title}
//         </button>
//         {this.state.info ? (
//           <div className="pullRequest-card-box">
//             <h3>
//               Date of pullRequest:{' '}
//               {pullRequest.node.createdAt
//                 .slice(0, 10)
//                 .split('-')
//                 .reverse()
//                 .join('/')}
//             </h3>
//             <h3>Comments</h3>
//             <form onSubmit={this.handleSubmit}>
//               <input
//                 type="text"
//                 name="search"
//                 value={this.state.text}
//                 onChange={this.handleChange}
//                 placeholder="Search Comments"
//               ></input>
//               <button type="submit">Search</button>
//             </form>
//             <ul>
//               {this.state.comments.length > 0 ? (
//                 this.state.comments.map(comment => (
//                   <li key={comment.node.id}>
//                     <h4>
//                       Created on:{' '}
//                       {comment.node.createdAt
//                         .slice(0, 10)
//                         .split('-')
//                         .reverse()
//                         .join('/')}{' '}
//                       at: {comment.node.createdAt.slice(-9, -1)}
//                     </h4>
//                     - {comment.node.bodyText}
//                   </li>
//                 ))
//               ) : (
//                 <p>There are no comments associated with this pullRequest</p>
//               )}
//             </ul>
//             <a href={pullRequest.node.url}>
//               <h3>Click here to go to Pull Request on GitHub</h3>
//             </a>
//           </div>
//         ) : (
//           ''
//         )}
//       </div>
//     );
//   }
// }

// export default PullRequestCard;

import React, { useState } from 'react';

const PullRequestCard = props => {
  const [state, setState] = useState({
    info: false,
    text: '',
    comments: props.pullRequest.node.comments.edges,
  });

  //toggle the dropdown of pull request information
  const showInfo = () => {
    setState({ ...state, info: !state.info });
  };

  //retrieving user's search input
  const handleChange = e => {
    setState({ ...state, text: e.target.value.toLowerCase() });
  };

  //using user's input to filter the comments results
  const handleSubmit = e => {
    e.preventDefault();
    let filteredComments = state.comments.filter(comment => comment.node.bodyText.toLowerCase().includes(state.text));
    setState({ ...state, comments: filteredComments });
  };

  const { pullRequest } = props;

  return (
    <div className="pull-request-box">
      <button className="pull-request-button" onClick={showInfo}>
        {pullRequest.node.title}
      </button>
      {state.info ? (
        <div className="pullRequest-card-box">
          <h3>
            Date of pullRequest:{' '}
            {pullRequest.node.createdAt
              .slice(0, 10)
              .split('-')
              .reverse()
              .join('/')}
          </h3>
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
              state.comments.map(comment => (
                <li key={comment.node.id}>
                  <h4>
                    Created on:{' '}
                    {comment.node.createdAt
                      .slice(0, 10)
                      .split('-')
                      .reverse()
                      .join('/')}{' '}
                    at: {comment.node.createdAt.slice(-9, -1)}
                  </h4>
                  - {comment.node.bodyText}
                </li>
              ))
            ) : (
              <p>There are no comments associated with this pullRequest</p>
            )}
          </ul>
          <a href={pullRequest.node.url}>
            <h3>Click here to go to Pull Request on GitHub</h3>
          </a>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default PullRequestCard;
