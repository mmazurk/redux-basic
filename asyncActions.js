const redux = require("redux");
const thunk = require("redux-thunk").thunk;
const axios = require("axios");
const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;

const intitialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchUsersRequested = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

const fetchUsersSucces = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

const asyncActionsReducer = (state = intitialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

// the middleware intercepts the return function and runs it, then passes the data to Redux
const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersRequested());
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = response.data.map((user) => user.id);
      dispatch(fetchUsersSucces(users));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};

// we apply the middleware here
const store = createStore(asyncActionsReducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers());
