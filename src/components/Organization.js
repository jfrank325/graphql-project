import React from 'react';
import Repository from '../components/Repository';
// import Issue from '../components/Issue';
// import { Route } from 'react-router-dom';

const Organization = ({ organization }) => {
  return organization ? (
    <div className="organization-container">
      <h1>Organization: {organization.name}</h1>
      <h1>Repository: {organization.repository.name}</h1>
      <div className="organization-box">
        <Repository repository={organization.repository} />
        {/* <Route path="/issue/:id" component={Issue} /> */}
      </div>
    </div>
  ) : (
    <p>Sorry that query is not returning results</p>
  );
};
export default Organization;
