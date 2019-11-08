import React, { useState } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components'

import ErrBoundary from './ErrBoundary';
import Server from "./Server";
import Login from "./Login";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    /* color: ${props => (props.whiteColor ? 'white' : 'black')}; */
  }
  #root {
    height: 100vh;
  }
`
const Container = styled.main`
  display: flex;
  height: inherit;
`;

const Nav = styled.nav`
  min-width: 300px;
  /* overflow: hidden; */
  display: flex;
  flex-direction: column;
  > a {
    text-decoration: none;
  }
`

const Article = styled.article`
  flex-grow: 1;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Title = styled.div`
  text-align: center;
  display: block;
  text-align: center;
  color: palevioletred;
  a {
    text-decoration: none;
    display: inline-block;
    h1 {
      margin-bottom: 0px;
    }
    p {
      text-align: right;
    }
  }
`;

const Filter = styled.input`
  margin-left: 40px;
  padding: 10px;
  outline: none;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  flex-grow: 1;
  overflow: scroll;
  /* padding: 0; */
  li {
    border-bottom: 1px solid gray;
    a {
      padding: 10px;
      display: block;
      font-size: 1.2rem;
      text-decoration: none;
    }
  } 
`;

function _App({ servers, AppName, AppVersion }) {
  const [filter, setFilter] = useState('')
  return (
    <Container>
      <GlobalStyle whiteColor />
      <Nav>
        <Title>
          <Link to='/'>
            <h1>{AppName.toUpperCase()}</h1>
            <p>v{AppVersion}</p>
          </Link>
        </Title>
        <Filter placeholder='filter' value={filter} onChange={(e) => setFilter(e.target.value)}/>
        <List>
          {servers.filter(item => item.startsWith(filter)).map(server => (
            <li key={server}>
              <Link to={`/${server}`}>{server}</Link>
            </li>
          ))}

          {/* <li>
            <Link to={`/components?fasfa=fadf`}>Components</Link>
          </li>
          <li>
            <Link to={`/props-v-state`}>Props v. State</Link>
          </li> */}
        </List>
      </Nav>
      <Article>
        <Switch>
          <Route exact path="/">
            <div>请选择需要部署的应用</div>
          </Route>
          <Route path={`/:server`}>
            <Server />
          </Route>
        </Switch>
      </Article>
      {/* <Counter /> */}
    </Container>
  );
}

// export default App;
const mapStateToProps = (state, ownProps) => ({
  servers: state.servers,
  AppName: state.AppName,
  AppVersion: state.AppVersion
});
const App = connect(mapStateToProps)(_App);

const PrivateRoute = connect((state, ownProps) => ({
  user: state.user,
}))(_PrivateRoute);

export default function() {
    return (
      <ErrBoundary>
        <Switch>
          <Route path='/login' component={Login} />
          <PrivateRoute path="/">
            <App />
          </PrivateRoute>
        </Switch>
          {/* </Route> */}
        {/* <App /> */}
      </ErrBoundary>
    )
};

function _PrivateRoute({ children, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.username ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
