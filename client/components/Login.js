import React, { useEffect } from 'react';
import { connect } from "react-redux";

import { loginAction } from '../redux/actions';

function Login({ loginAction, user, history, location: { state } }) {
    useEffect(() => {
        if (user.username) {
            console.log('push')
            history.push(state ? state.from.pathname : '/');
        }
      }, [ user ]);
    return (
        <div>
            Login
            <button onClick={() => loginAction({})}>login</button>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { loginAction }
)(Login);