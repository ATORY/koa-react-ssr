import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { incAction, decAction } from '../redux/actions';

const App = ({ count, inc, dec }) => (
  <div>
    {`--]-Counter ${count}`}
    <button type="button" onClick={inc}>inc</button>
    <button type="button" onClick={dec}>dec</button>
  </div>
);

App.propTypes = {
  count: PropTypes.number.isRequired,
  inc: PropTypes.func.isRequired,
  dec: PropTypes.func.isRequired,
};

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state, ownProps) => ({
  count: state.count,
});

export default connect(
  mapStateToProps,
  { inc: incAction, dec: decAction },
)(App);
