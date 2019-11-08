
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

export const incAction = (data) => (dispatch, getState) => {
  dispatch({
    type: INCREMENT
  })
}

export const decAction = (data) => (dispatch, getState) => {
  dispatch({
    type: DECREMENT
  })
}