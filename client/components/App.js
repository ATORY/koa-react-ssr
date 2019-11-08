import React from 'react'
import { connect } from 'react-redux'

import { incAction, decAction } from '../redux/actions';

const App = ({ count, incAction, decAction }) => {
  return (
    <div>
      {`Counter ${count}`}
      <button onClick={incAction}>inc</button>
      <button onClick={decAction}>dec</button>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
    count: state.count
})

export default connect(
    mapStateToProps,
    { incAction, decAction }
)(App)