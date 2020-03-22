//single graphql query as a variable
export const getIssuesOfRepositoryQuery = (organization, repository) => `
{
  organization(login: "${organization}") {
    name
    url
    repository(name: "${repository}") {
      name
      url
      issues(last: 10) {
        edges {
          node {
            state
            id 
            title
            url
            createdAt
            author {
              login
            }
            url
            comments (last: 10) {
              edges {
                node{
                  bodyText
                  id
                  createdAt
                }
              }
            }
          }
        }
      }
      pullRequests(last: 10) {
        edges {
          node {
            id
            title
            url
            createdAt
            comments(last: 5) {
              edges {
                node {
                  bodyText
                  id
                  createdAt
                }
              }
            }
          }
        }
      }
    }
  }
}`;
