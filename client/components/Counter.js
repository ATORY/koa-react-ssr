import React from 'react'
import { connect } from 'react-redux'

const Counter = ({ count, inc, dec }) => {

  return (
    <div>
      {`Counter ${count}`}
      <button onClick={inc}>inc</button>
      <button onClick={dec}>dec</button>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
    count: state.count
})
const mapDispatchToProps = (dispatch, ownProps) => ({
    inc: () => dispatch({type: 'INCREMENT'}),
    dec: () => dispatch({type: 'DECREMENT'})
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)