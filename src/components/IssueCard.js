import React, { Component } from 'react';

class IssueCard extends Component {
  state = {
    info: false,
    text: '',
    comments: this.props.issue.node.comments.edges,
  };

  showInfo = () => {
    this.setState({
      info: !this.state.info,
    });
  };

  handleChange = e => {
    this.setState({
      text: e.target.value.toLowerCase(),
    });
    console.log('search text', this.state.text);
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('this is the result of the comments search', e.target.value);
    let filteredComments = this.state.comments.filter(comment =>
      comment.node.bodyText.toLowerCase().includes(this.state.text)
    );
    this.setState({
      comments: filteredComments,
    });
    console.log('comments after setState', filteredComments);
  };

  render() {
    const { issue } = this.props;
    return (
      <div className="issue-box">
        <button className="red" onClick={this.showInfo}>
          {issue.node.title}
        </button>
        {this.state.info ? (
          <div className="issue-card-box">
            <h3>Issue Author: {issue.node.author.login}</h3>
            <h3>
              Date of Issue:{' '}
              {issue.node.createdAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('/')}
            </h3>
            <h3>Comments</h3>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="search"
                value={this.state.text}
                onChange={this.handleChange}
                placeholder="Search Comments"
              ></input>
              <button type="submit">Search</button>
            </form>
            <ul>
              {this.state.comments.length > 0 ? (
                this.state.comments.map(comment => (
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
                <p>There are no comments associated with this issue</p>
              )}
            </ul>
            <a href={issue.node.url}>
              <h3>Click here to go to Pull Request on GitHub</h3>
            </a>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default IssueCard;
