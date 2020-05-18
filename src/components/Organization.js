import React from 'react';
import Repository from '../components/Repository';
// import Issue from '../components/Issue';
// import { Route } from 'react-router-dom';

const Organization = ({ organization }) => {
  return organization ? (
    <div className="organization-container">
      <h2>Organization: {organization.name}</h2>
      <h2>Repository: {organization.repository.name}</h2>
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
