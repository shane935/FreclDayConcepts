import {Iterable} from "immutable";

const thunk = ({dispatch, getState}) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  return next(action);
};

const isHttpErrorResponse = (res) => {
  if (Iterable.isIterable(res)) {
    return res.get('status', 0) >= 400;
  }
  return false;
};

const httpHandler = (httpErrorStatusHandler) => {
  return store => next => action => {
    const {payload} = action;
    if (action && payload && isHttpErrorResponse(payload)) {
      httpErrorStatusHandler(payload, next, store, action);
    } else {
      return next(action);
    }
  }
};

