import React from 'react';
import { Link } from 'react-router-dom';

const Repository = ({ repository }) => (
  <div className="repository-box">
    <p>
      <strong>In Repository:</strong>
      <a href={repository.url}> {repository.name}</a>
    </p>
    <ul>
      <h3>Pull Requests</h3>
      {repository.pullRequests.edges.map(pullRequest => (
        <li key={pullRequest.node.id}>
          <a href={pullRequest.node.url}>{pullRequest.node.title}</a>
        </li>
      ))}
    </ul>
    <ul>
      <h3>Open Issues</h3>
      {console.log(repository.issues.edges, 'issue edges look like this')}
      {repository.issues.edges.map(issue =>
        issue.node.state === 'OPEN' ? (
          <li key={issue.node.id}>
            <Link to={`/issue/${issue.node.id}`}>
              {issue.node.title}
              {/* <ul>
                {issue.node.comments.edges.map(comment => (
                  <li>{comment.node.bodyText}</li>
                ))}
              </ul> */}
            </Link>{' '}
          </li>
        ) : (
          ''
        )
      )}
    </ul>
    <ul>
      <h3>Closed Issues</h3>
      {console.log(repository.issues.edges, 'issue edges look like this')}
      {repository.issues.edges.map(issue =>
        issue.node.state === 'CLOSED' ? (
          <li key={issue.node.id}>
            <Link to={`/issue/${issue.node.id}`}>{issue.node.title}</Link>{' '}
          </li>
        ) : (
          ''
        )
      )}
    </ul>
  </div>
);

export default Repository;
