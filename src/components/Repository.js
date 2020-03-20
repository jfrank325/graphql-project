import React from 'react';
import { Link, Route } from 'react-router-dom';
import Issue from '../components/Issue';

const Repository = ({ repository }) => (
  <div>
    <p>
      <strong>In Repository:</strong>
      <a href={repository.url}> {repository.name}</a>
    </p>

    <ul>
      <h3>Open Issues</h3>
      {repository.issues.edges.map(issue =>
        issue.node.state === 'OPEN' ? (
          <li key={issue.node.id}>
            <Link to={`/issue/${issue.node.id}`}>{issue.node.id}</Link>{' '}
          </li>
        ) : (
          <>
            <h3>Closed Issues</h3>
            <li key={issue.node.id}>
              <Link to={`/issue/${issue.node.id}`}>{issue.node.title}</Link>
            </li>
          </>
        )
      )}
    </ul>
    <ul>
      <h3>Pull Requests</h3>
      {repository.pullRequests.edges.map(pullRequest => (
        <li key={pullRequest.node.id}>
          <a href={pullRequest.node.url}>{pullRequest.node.title}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default Repository;
