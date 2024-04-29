const redux = require("redux");
const produce = require("immer").produce;

const createStore = redux.legacy_createStore;

// action type
const STREET_UPDATED = "STREET_UPDATED";

// action creator
function updateStreet(street) {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
}

// initial state
const initialState = {
  name: "Flakrus",
  address: {
    street: "7777 99th Ave SE",
    city: "Seattle",
    state: "Washington",
  },
};

// reducer using produce() from immer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      const nextState = produce(state, (draft) => {
        draft.address.street = action.payload;
      });
      return nextState;

    default:
      return state;
  }
};

const store = createStore(reducer);

// We would normally use a logger here
const unsubscribe = store.subscribe(() => {
  console.log("State is", store.getState());
});

store.dispatch(updateStreet("1111 New Lane"));
store.dispatch(updateStreet("2222 Whatever Road"));
unsubscribe();
