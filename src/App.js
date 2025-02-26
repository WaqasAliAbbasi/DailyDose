import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Grommet } from "grommet";

import { auth } from "./actions";
import ponyApp from "./reducers";

import AppBar from "./components/AppBar";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CurrentBox from "./components/CurrentBox";
import Order from "./components/Order";
import OrderList from "./components/OrderList";
import Questionnaire from "./components/Questionnaire";

let store = createStore(ponyApp, composeWithDevTools(applyMiddleware(thunk)));

const theme = {
  global: {
    colors: {
      brand: "#16a085"
    },
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};

class RootContainerComponent extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }

  PrivateRoute = ({ component: ChildComponent, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (this.props.auth.isLoading) {
            return <em>Loading...</em>;
          } else if (!this.props.auth.isAuthenticated) {
            return <Redirect to="/auth/login" />;
          } else {
            return <ChildComponent {...props} />;
          }
        }}
      />
    );
  };

  AppBarLayout = props => {
    const { PrivateRoute } = this;
    return (
      <AppBar>
        <Switch>
          <PrivateRoute exact path="/" component={CurrentBox} />
          <PrivateRoute exact path="/order" component={Order} />
          <PrivateRoute exact path="/orders" component={OrderList} />
          <PrivateRoute exact path="/questionnaire" component={Questionnaire} />
          <Route component={NotFound} />
        </Switch>
      </AppBar>
    );
  };

  AuthLayout = props => {
    return (
      <Switch>
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/signup" component={SignUp} />
        <Route component={NotFound} />
      </Switch>
    );
  };

  render() {
    const { AppBarLayout, AuthLayout } = this;
    return (
      <Grommet theme={theme} full>
        <BrowserRouter>
          <Switch>
            <Route path="/auth" component={AuthLayout} />
            <Route path="/" component={AppBarLayout} />
          </Switch>
        </BrowserRouter>
      </Grommet>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  };
};

let RootContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainerComponent);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}
