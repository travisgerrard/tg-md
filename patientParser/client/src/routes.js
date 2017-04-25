/*jshint esversion: 6 */

import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import LearningPage from './containers/LearningPage.jsx'
import Auth from './modules/Auth';
import AllPatientsPage from './containers/AllPatientsPage.jsx';
import NavBarControl from './containers/NavBarControl.jsx';

const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, AllPatientsPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: 'learning',
      component: LearningPage
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      }
    }
  ]
};

export default routes;
