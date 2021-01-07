import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';
class ProfileGithub extends Component {
  componentDidMount() {
    this.props.getGithubRepos(this.props.username);
  }
  render() {
    return (
      <div className='profile-github'>
        <h2 className='text-primary my-1'>Github Repos</h2>
        {this.props.repos === null ? (
          <Spinner />
        ) : (
          this.props.repos.map((repo) => {
            console.log(repo);
            return (
              <div key={repo._id} className='repo bg-white p-1 my-1'>
                <div>
                  <h4>
                    <a
                      href={repo.html_url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {repo.name}
                    </a>
                  </h4>
                  <p>{repo.description}</p>
                </div>
                <div>
                  <ul>
                    <li className='badge badge-primary'>
                      Stars: {repo.stargazers_count}
                    </li>
                    <li className='badge badge-dark'>
                      Watchers: {repo.watchers_count}
                    </li>
                    <li className='badge badge-light'>
                      Forks: {repo.forks_count}
                    </li>
                  </ul>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    repos: state.profile.repos,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getGithubRepos: (username) => dispatch(getGithubRepos(username)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileGithub);
