import React from 'react';
import Repository from '../components/Repository';
import Issue from '../components/Issue';
import { Route } from 'react-router-dom';

const Organization = ({ organization }) => {
  return organization ? (
    <div className="organization-box">
      <p>
        <strong>Organization</strong>
        <a href={organization.url}> {organization.name}</a>
      </p>
      <Repository repository={organization.repository} />
      <Route path="/issue/:id" component={Issue} />;
    </div>
  ) : (
    <p>Sorry that query is not returning results</p>
  );
};
export default Organization;
