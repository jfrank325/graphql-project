import React from 'react';
// import { Link } from 'react-router-dom';
import IssueCard from '../components/IssueCard';
import PullRequestCard from './PullRequestCard';

const Repository = ({ repository }) => (
  <div className="repository-box">
    <div className="pulls-issues-box">
      <div className="pull-requests-box">
        <ul>
          <h3>Pull Requests</h3>
          {repository.pullRequests.edges.map((pullRequest) => (
            <li key={pullRequest.node.id}>
              <PullRequestCard pullRequest={pullRequest}></PullRequestCard>
            </li>
          ))}
        </ul>
      </div>
      <div className="issues-box">
        <ul>
          <h3>Open Issues</h3>
          {repository.issues.edges.map((issue) =>
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
          {repository.issues.edges.map((issue) =>
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
    </div>
  </div>
);

export default Repository;
