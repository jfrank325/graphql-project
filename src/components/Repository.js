import React from 'react';
// import { Link } from 'react-router-dom';
import IssueCard from '../components/IssueCard';
import PullRequestCard from './PullRequestCard';

const Repository = ({ repository }) => (
  <div className="repository-box">
    <h2>Repository: {repository.name}</h2>
    <ul>
      <h3>Pull Requests</h3>
      {repository.pullRequests.edges.map(pullRequest => (
        <li key={pullRequest.node.id}>
          {/* <a href={pullRequest.node.url}>{pullRequest.node.title}</a> */}
          <PullRequestCard pullRequest={pullRequest}></PullRequestCard>
        </li>
      ))}
    </ul>
    <ul>
      <h2>Click on an Issue to see it's details</h2>
      <h3>Open Issues</h3>
      {console.log(repository.issues.edges, 'issue edges look like this')}
      {repository.issues.edges.map(issue =>
        issue.node.state === 'OPEN' ? (
          <li key={issue.node.id}>
            {/* <Link to={`/issue/${issue.node.id}`}>
              {issue.node.title}
            </Link>{' '} */}
            {/* <h3>{issue.node.title}</h3> */}
            <IssueCard issue={issue}></IssueCard>
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
            {/* <Link to={`/issue/${issue.node.id}`}>{issue.node.title}</Link>  */}
            {/* <h3>{issue.node.title}</h3> */}
            <IssueCard issue={issue}></IssueCard>
          </li>
        ) : (
          ''
        )
      )}
    </ul>
  </div>
);

export default Repository;
