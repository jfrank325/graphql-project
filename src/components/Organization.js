import React from 'react';
import Repository from '../components/Repository';

const Organization = ({ organization, errors }) => {
  if (errors) {
    return (
      <p>
        <strong>Something went wrong</strong>
        {errors.map(error => error.message).join(' ')}
      </p>
    );
  }
  return (
    <div>
      <p>
        <strong>Organization</strong>
        <a href={organization.url}> {organization.name}</a>
      </p>
      <Repository repository={organization.repository} />
    </div>
  );
};
export default Organization;
