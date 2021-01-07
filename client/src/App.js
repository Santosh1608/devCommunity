import './App.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import store from './store';
import EditProfile from './components/profile-forms/EditProfile';
import { connect } from 'react-redux';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
//Redux
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
class App extends Component {
  componentDidMount() {
    console.log('------------------------');
    store.dispatch(loadUser());
  }
  render() {
    // const privateRoutes = (
    //   <>
    //     <Route exact path='/dashboard' component={Dashboard} />
    //   </>
    // );
    // const publicRoutes = (
    //   <>
    //     <Route exact path='/register' component={Register} />
    //     <Route exact path='/login' component={Login} />
    //   </>
    // );
    console.log(this.props.auth);
    return (
      <Router>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/profiles' component={Profiles} />
            <Route exact path='/profile/:id' component={Profile} />
            {this.props.auth.isAuthenticated ? (
              <Route exact path='/dashboard' component={Dashboard} />
            ) : null}
            <Redirect from='/dashboard' to='/login' />
            {this.props.auth.isAuthenticated ? (
              <Route exact path='/create-profile' component={CreateProfile} />
            ) : null}
            <Redirect from='/create-profile' to='/login' />
            {this.props.auth.isAuthenticated ? (
              <Route exact path='/edit-profile' component={EditProfile} />
            ) : null}
            <Redirect from='/edit-profile' to='/login' />
            {this.props.auth.isAuthenticated ? (
              <Route exact path='/add-experience' component={AddExperience} />
            ) : null}
            <Redirect from='/add-experience' to='/login' />
            {this.props.auth.isAuthenticated ? (
              <Route exact path='/add-education' component={AddEducation} />
            ) : null}
            <Redirect from='/add-education' to='/login' />
            {this.props.auth.isAuthenticated ? (
              <Route exact path='/posts' component={Posts} />
            ) : null}
            <Redirect from='/posts' to='/login' />
            {this.props.auth.isAuthenticated ? (
              <Route exact path='/post/:id' component={Post} />
            ) : null}
            <Redirect from='/post' to='/login' />
          </Switch>
        </section>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(App);
